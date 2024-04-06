import {printError, round} from "../helpers"
import {saveJobRunTime} from "../jobsHistory";
import {binanceClient} from "../clients/binanceClient";
import {db} from "../../db";
import {RestMarketTypes} from "@binance/connector-typescript";
import getSymbols from "../symbols";
import {Symbol} from "../models";

const cleanHistoryMinutes = 10;

const getPrices = async (symbols: Symbol[]): Promise<Price[]> => {
  const response = await binanceClient.symbolPriceTicker();

  return (response as RestMarketTypes.symbolPriceTickerResponse[])
    .filter((t) => symbols.some(s => s.Code === t.symbol))
    .map((t) => {
      const symbol = symbols.find(s => s.Code === t.symbol) as Symbol;
      return ({Symbol: symbol.Id, Price: round(t.price)});
    });
};

const savePrices = async (prices: Price[]): Promise<void> => {
  const now = new Date();
  const tasks = prices.map(x =>
    db.assetPrices.upsert({
      where: {id: x.Symbol},
      update: {price: x.Price, timestamp: now},
      create: {id: x.Symbol, price: x.Price, timestamp: now}
    }));

  await Promise.all(tasks);

  await db.assetPrices.deleteMany({
    where: {
      timestamp: {lt: new Date(Date.now() - 1000 * 60 * cleanHistoryMinutes)}
    }
  });
}

export type Price = {
  Symbol: string;
  Price: number;
};

async function bot(): Promise<void> {
  const symbols = await getSymbols();
  const prices = await getPrices(symbols);

  await savePrices(prices);

  await saveJobRunTime("PricesBot");
}

bot().catch(async (e) => {
  await printError("Prices Bot Exception", e);
});

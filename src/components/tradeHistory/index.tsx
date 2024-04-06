import React from "react";
import {db} from "@/src/db";
import TradeHistoryTable from "./table/TradeHistoryTable";

//export const dynamic = "force-dynamic";

export default async function TradeHistory() {

  const tradesData = await db.tradesAggr.findMany();
  const prices = await db.assetPrices.findMany();

  const data = tradesData
    .map((trade) => {
      const currentPrice = prices.find((price: any) => price.id === trade.symbol)?.price.toNumber() || 0;
      const currentTotalAmount = currentPrice * trade.qty.toNumber();
      const totalDifference = trade.quoteQty.toNumber() !== 0
        ? ((currentTotalAmount - trade.quoteQty.toNumber()) / trade.quoteQty.toNumber()) * 100
        : 0;
      const totalEarnings = currentTotalAmount - trade.quoteQty.toNumber();
      return {
        Symbol: trade.symbol,
        Qty: trade.qty.toNumber(),
        QuoteQty: trade.quoteQty.toNumber(),
        AvgPrice: trade.avgPrice.toNumber(),
        CurrentPrice: currentPrice,
        CurrentTotalAmount: currentTotalAmount,
        TotalDifference: totalDifference,
        TotalEarnings: totalEarnings,
      };
    })
    .sort((a, b) => b.QuoteQty - a.QuoteQty);

  return (<TradeHistoryTable data={data}/>);
}

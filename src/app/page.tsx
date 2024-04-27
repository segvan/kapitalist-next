import React from "react";
import {db} from "@/src/db";
import TradesSummary from "@/src/components/trades/TradesSummary";
import TradesDetails from "@/src/components/trades/details/TradesDetails";

export const dynamic = "force-dynamic";

async function Index() {

  const data = await LoadData();

  let invested = 0;
  let currentVal = 0;
  for (const item of data) {
    invested += item.QuoteQty;
    currentVal += item.CurrentTotalAmount;
  }

  return (
    <section className="section px-2 pb-6">
      <div className="container">
        <div className="columns is-desktop is-multiline">
          <div className="column is-10 is-offset-1 block">
            <p className="subtitle">Summary</p>
            <TradesSummary invested={invested} currentVal={currentVal}/>
          </div>
          <div className="column is-10 is-offset-1 block">
            <p className="subtitle">Details</p>
            <TradesDetails invested={invested} data={data}/>
          </div>
        </div>
      </div>
    </section>
  );
}

async function LoadData() {
  const tradesData = await db.tradesAggr.findMany();
  const prices = await db.assetPrices.findMany();

  return tradesData
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
}

export default Index;

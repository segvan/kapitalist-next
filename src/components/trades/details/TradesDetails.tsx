"use client";

import "./TradesDetails.css";
import React from "react";
import {useState} from "react";
import TradeModel from "../TradeModel";

export default function TradesDetails({data, invested}: TradeHistoryTableProps) {
  const [visible, setVisible] = useState(false);

  const columnToggle = visible ? "column-visible" : "column-hidden";

  const tableClick = () => {
    setVisible((prevState) => !prevState);
  };

  if (!data) {
    return <div className="trade-history"></div>;
  }

  return (

    <div className="is-overflow-y-hidden">
      <table
        className="table is-narrow is-hoverable is-striped"
        onClick={tableClick}
      >
        <thead>
        <tr>
          <th scope="col">Currency</th>
          <th className={columnToggle} scope="col">
            %
          </th>
          <th className={columnToggle} scope="col">
            Invested
          </th>
          <th className={columnToggle} scope="col">
            Current Price
          </th>
          <th className={columnToggle} scope="col">
            Average Price
          </th>
          <th className={columnToggle} scope="col">
            Amount
          </th>
          <th scope="col">Current Value</th>
          <th scope="col">Earnings</th>
          <th scope="col">Difference</th>
        </tr>
        </thead>
        <tbody>
        {data.map((trade) => (
          <tr key={trade.Symbol}>
            <td>{trade.Symbol}</td>
            <td className={columnToggle}>
              {((trade.QuoteQty / invested) * 100).toFixed(2)}
            </td>
            <td className={columnToggle}>
              {trade.QuoteQty.toFixed(2)}
            </td>
            <td className={columnToggle}>
              {trade.CurrentPrice.toFixed(2)}
            </td>
            <td className={columnToggle}>
              {trade.AvgPrice.toFixed(2)}
            </td>
            <td className={columnToggle}>{trade.Qty}</td>
            <td
              className={
                "has-text-white " +
                (trade.CurrentTotalAmount >= trade.QuoteQty
                  ? "has-background-success"
                  : "has-background-danger")
              }
            >
              {trade.CurrentTotalAmount.toFixed(2)}
            </td>
            <td
              className={
                "has-text-white " +
                (trade.TotalEarnings >= 0
                  ? "has-background-success"
                  : "has-background-danger")
              }
            >
              {trade.TotalEarnings.toFixed(2)}
            </td>
            <td
              className={
                "has-text-white " +
                (trade.TotalDifference >= 0
                  ? "has-background-success"
                  : "has-background-danger")
              }
            >
              {trade.TotalDifference.toFixed(2)} %
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export type TradeHistoryTableProps = {
  invested: number;
  data: TradeModel[];
};
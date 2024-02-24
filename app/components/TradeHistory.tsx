"use client";

import "./TradeHistory.css";
import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function TradeHistory() {
  const [tradesData, setTradesData] = useState<any>({});
  const [visible, setVisible] = useState(false);

  const columnToggle = visible ? "column-visible" : "column-hidden";

  const tableClick = () => {
    setVisible((prevState) => !prevState);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/trade-history", {
        next: { revalidate: 0 },
      });
      const data = await response.json();
      setTradesData(data);
    }
    fetchData();
  }, []);

  if (!tradesData) {
    return <Loading />;
  }

  const props = Object.keys(tradesData);

  if (props.length === 0) {
    return <Loading />;
  }

  let invested = 0;
  let current_val = 0;

  for (var prop in tradesData) {
    invested += tradesData[prop].quoteQty;
    current_val += tradesData[prop].current_total_amount;
  }

  const earnings = current_val - invested;
  const difference =
    invested > 0 ? ((current_val - invested) / invested) * 100 : 0;

  return (
    <div className="trade-history">
      <h4 className="subtitle">Summary</h4>
      <table className="table is-narrow">
        <thead>
          <tr>
            <th scope="col">Invested</th>
            <th scope="col">Current Value</th>
            <th scope="col">Earnings</th>
            <th scope="col">Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="has-background-success has-text-white">
              {invested.toFixed(2)}
            </td>
            <td
              className={
                "has-text-white " +
                (current_val >= invested
                  ? "has-background-success"
                  : "has-background-danger")
              }
            >
              {current_val.toFixed(2)}
            </td>
            <td
              className={
                "has-text-white " +
                (earnings >= 0
                  ? "has-background-success"
                  : "has-background-danger")
              }
            >
              {earnings.toFixed(2)}
            </td>
            <td
              className={
                "has-text-white " +
                (difference >= 0
                  ? "has-background-success"
                  : "has-background-danger")
              }
            >
              {difference.toFixed(2)} %
            </td>
          </tr>
        </tbody>
      </table>

      <h4 className="subtitle">Details</h4>

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
          {props.map((prop) => (
            <tr key={prop}>
              <td>{prop}</td>
              <td className={columnToggle}>
                {((tradesData[prop].quoteQty / invested) * 100).toFixed(2)}
              </td>
              <td className={columnToggle}>
                {tradesData[prop].quoteQty.toFixed(2)}
              </td>
              <td className={columnToggle}>
                {tradesData[prop].current_price.toFixed(2)}
              </td>
              <td className={columnToggle}>
                {tradesData[prop].avg_price.toFixed(2)}
              </td>
              <td className={columnToggle}>{tradesData[prop].qty}</td>
              <td
                className={
                  "has-text-white " +
                  (tradesData[prop].current_total_amount >=
                  tradesData[prop].quoteQty
                    ? "has-background-success"
                    : "has-background-danger")
                }
              >
                {tradesData[prop].current_total_amount.toFixed(2)}
              </td>
              <td
                className={
                  "has-text-white " +
                  (tradesData[prop].total_earnings >= 0
                    ? "has-background-success"
                    : "has-background-danger")
                }
              >
                {tradesData[prop].total_earnings.toFixed(2)}
              </td>
              <td
                className={
                  "has-text-white " +
                  (tradesData[prop].total_difference >= 0
                    ? "has-background-success"
                    : "has-background-danger")
                }
              >
                {tradesData[prop].total_difference.toFixed(2)} %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

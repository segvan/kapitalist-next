import React from "react";

export default async function TradesSummary({invested, currentVal}: SummaryTableProps) {

  const earnings = currentVal - invested;
  const difference =
    invested > 0 ? ((currentVal - invested) / invested) * 100 : 0;

  return (
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
            (currentVal >= invested
              ? "has-background-success"
              : "has-background-danger")
          }
        >
          {currentVal.toFixed(2)}
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
  );
}

export type SummaryTableProps = {
  invested: number,
  currentVal: number,
};
"use client";

import React from "react";
import {useState, useEffect} from "react";

export default function JobsHistory() {
  const [jobsData, setJobsData] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/jobs-history", {
        next: {revalidate: 0},
      });
      const data = await response.json();
      setJobsData(data);
    }

    fetchData();
  }, []);

  if (!jobsData || jobsData.TradeHistoryBot === undefined) {
    return <div className="jobs-history"></div>;
  }

  return (
    <div className="jobs-history">
      <h4 className="subtitle">Sync Jobs Execution Time</h4>

      <table className="table is-narrow is-hoverable">
        <tbody>
        <tr>
          <td>Trade History Bot:</td>
          <td>{parseDate(jobsData.TradeHistoryBot)}</td>
        </tr>
        <tr>
          <td>Price Change Bot:</td>
          <td>{parseDate(jobsData.PriceChangeBot)}</td>
        </tr>
        <tr>
          <td>Prices Bot:</td>
          <td>{parseDate(jobsData.PricesBot)}</td>
        </tr>
        <tr>
          <td>DCA Bot:</td>
          <td>{parseDate(jobsData.DcaBot)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

function parseDate(sDate: string): string {
  if (!sDate) return "";

  var dateInt = Date.parse(sDate);
  var date = new Date(dateInt);

  var curr_sec = addTrailingZero(date.getSeconds());
  var curr_min = addTrailingZero(date.getMinutes());
  var curr_hour = addTrailingZero(date.getHours());
  var curr_date = addTrailingZero(date.getDate());
  var curr_month = addTrailingZero(date.getMonth() + 1);
  var curr_year = addTrailingZero(date.getFullYear());

  return `${curr_hour}:${curr_min}:${curr_sec} ${curr_date}.${curr_month}.${curr_year}`;
}

function addTrailingZero(num: number): string | number {
  return num < 10 ? "0" + num : num;
}

import React from "react";
import {db} from "@/src/db";

export default async function JobsHistory() {

  const jobsData = await db.jobsHistory.findMany();

  if (!jobsData) {
    return <div className="jobs-history"></div>;
  }

  const renderedJobs = jobsData.map((job) => {
    return (
      <tr key={job.id}>
        <td>{job.name}:</td>
        <td>{parseDate(job.timestamp)}</td>
      </tr>);
  });

  return (
    <div className="jobs-history">
      <h4 className="subtitle">Sync Jobs Execution Time</h4>
      <table className="table is-narrow is-hoverable">
        <tbody>
        {renderedJobs}
        </tbody>
      </table>
    </div>
  );
}

function parseDate(date: Date): string {
  let curr_sec = addTrailingZero(date.getSeconds());
  let curr_min = addTrailingZero(date.getMinutes());
  let curr_hour = addTrailingZero(date.getHours());
  let curr_date = addTrailingZero(date.getDate());
  let curr_month = addTrailingZero(date.getMonth() + 1);
  let curr_year = addTrailingZero(date.getFullYear());

  return `${curr_hour}:${curr_min}:${curr_sec} ${curr_date}.${curr_month}.${curr_year}`;
}

function addTrailingZero(num: number): string | number {
  return num < 10 ? "0" + num : num;
}

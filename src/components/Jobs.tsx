import React from "react";
import JobsModel from "@/src/app/jobs/JobsModel";

export default async function Jobs({data}: JobsProps) {

  if (!data) {
    return <div/>;
  }

  const renderedJobs = data.map((job) => {
    return (
      <tr key={job.Id}>
        <td>{job.Name}:</td>
        <td>{parseDate(job.Timestamp)}</td>
      </tr>);
  });

  return (
    <table className="table is-narrow is-hoverable">
      <tbody>
      {renderedJobs}
      </tbody>
    </table>
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

export type JobsProps = {
  data: JobsModel[];
};
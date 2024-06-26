import Jobs from "@/src/components/Jobs";
import React from "react";
import {db} from "@/src/db";

export const dynamic = "force-dynamic";

async function JobsHistory() {
  const jobsData = await db.jobsHistory.findMany();
  const data = jobsData.map(x => ({
    Id: x.id,
    Name: x.name,
    Timestamp: x.timestamp
  }));

  return (
    <section className="section is-fullheight-100vh">
      <div className="container is-max-desktop">
        <p className="subtitle">Sync Jobs Execution Time</p>
        <Jobs data={data}/>
      </div>
    </section>
  );
}

export default JobsHistory;

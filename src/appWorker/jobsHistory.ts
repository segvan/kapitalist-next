import {db} from "../db";

const saveJobRunTime = async (jobId: string): Promise<void> => {
  const now = new Date();
  await db.jobsHistory.update(
    {
      where: {id: jobId},
      data: {timestamp: now}
    });
};

const getJobRunTime = async (jobId: string): Promise<Date | undefined> => {
  const job = await db.jobsHistory.findFirst({
    where: {id: jobId}
  });

  return job?.timestamp;
}

export {saveJobRunTime, getJobRunTime};

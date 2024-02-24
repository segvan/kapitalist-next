import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const fileContents = await fs.readFile(
    process.env.DB_PATH + "/jobs_sync_time_aggr.json",
    "utf8"
  );

  const objectData = JSON.parse(fileContents);

  return NextResponse.json(objectData);
}

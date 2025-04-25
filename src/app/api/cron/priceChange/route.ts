import { NextResponse } from 'next/server';
import {run} from "@/src/appWorker/bots/priceChangeBot";

export async function GET(req: Request, res: Response) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await run();
  return NextResponse.json({ ok: true });
}
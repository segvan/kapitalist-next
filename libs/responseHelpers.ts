import {NextResponse} from "next/server";

export const ErrorResponse = (
  message: string,
  status: number
): NextResponse => {
  return new NextResponse(
    JSON.stringify({success: false, message: message}),
    {status: status}
  );
};

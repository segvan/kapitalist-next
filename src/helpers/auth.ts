import {jwtVerify} from "jose";

export const SESSION_COOKIE_NAME = "session";
export const USERID_HEADER_NAME = "x-authenticated-userid";
export const LOGIN_REDIRECT_QS_NAME = "next";

export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string): Promise<any | null> {
  try {
    const {payload} = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

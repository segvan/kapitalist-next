import {NextResponse} from "next/server";
import {LoginData, User} from "@/app/models";
import {createHash} from "crypto";
import {SignJWT} from "jose";
import {SESSION_COOKIE_NAME, getJwtSecretKey} from "@/libs/auth";
import {ErrorResponse} from "@/libs/responseHelpers";

export async function POST(request: Request) {
  let loginData: LoginData;
  let user: User;

  try {
    loginData = await getLoginData(request);
  } catch (e: any) {
    return ErrorResponse(e.message, 400);
  }

  try {
    user = getUser(loginData);
  } catch (e: any) {
    return ErrorResponse(e.message, 401);
  }

  const response = NextResponse.json({
    username: user.username,
    email: user.email,
  });

  const exp = parseInt(process.env.TOKEN_EXP as string);
  const token = await new SignJWT({
    sub: user.email,
  })
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime(`${exp}s`)
    .sign(getJwtSecretKey());

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + exp * 1000),
  });

  return response;
}

const getUser = (loginData: LoginData): User => {
  const user = {
    hashedPassword: process.env.USER_PASSWORD as string,
    email: process.env.USER_NAME as string,
  };

  const hash = createHash("sha1").update(loginData.password).digest("hex");

  if (loginData.username == user.email && hash == user.hashedPassword) {
    return user;
  }

  throw new Error("Incorrect username or password");
};

const getLoginData = async (request: Request): Promise<LoginData> => {
  const loginData = (await request.json()) as LoginData;
  if (!loginData.username) {
    throw new Error("Username is required");
  }

  if (!loginData.password) {
    throw new Error("Password is required");
  }

  return loginData;
};

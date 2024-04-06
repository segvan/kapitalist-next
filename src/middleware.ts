import {NextRequest, NextResponse} from "next/server";
import {LOGIN_REDIRECT_QS_NAME, SESSION_COOKIE_NAME, USERID_HEADER_NAME, verifyJwtToken,} from "@/src/helpers/auth";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/test|login|api/login|_next/static|_next/image|favicon.ico|manifest.json|logo512.png|logo192.png).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await isAuthenticated(request);
  if (!token) {
    const {nextUrl, url} = request;
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set(LOGIN_REDIRECT_QS_NAME, nextUrl.pathname);
    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  request.headers.set(USERID_HEADER_NAME, token.sub ?? "");
  return NextResponse.next();
}

const isAuthenticated = async (request: NextRequest): Promise<any | null> => {
  if (!request.cookies.has(SESSION_COOKIE_NAME)) {
    return null;
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  return await verifyJwtToken(token);
};

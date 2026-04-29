import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the sign-in page through without auth
  if (pathname.startsWith("/portal/sign-in")) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

  if (!token) {
    const signInUrl = new URL("/portal/sign-in/", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/portal/:path*",
};

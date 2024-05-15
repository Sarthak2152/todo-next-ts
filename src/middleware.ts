import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("🚀 ~ middleware ~ token:", token);
  const path = request.nextUrl.pathname;
  console.log("🚀 ~ middleware ~ path:", path);

  const isPublicPath = path === "/login" || path === "/signup";
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  } else return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup"],
};

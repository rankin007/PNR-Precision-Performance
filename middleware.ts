import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isProtectedPath } from "@/lib/auth/access";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const { response, session, envReady } = await updateSupabaseSession(request);

  if (!envReady) {
    const setupUrl = new URL("/sign-in", request.url);
    setupUrl.searchParams.set("setup", "supabase");
    setupUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(setupUrl);
  }

  if (!session) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("login", "required");
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/data-entry/:path*"],
};

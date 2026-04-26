import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isProtectedPath } from "@/lib/auth/access";
import {
  isAccessControlPath,
  isAdminBypassActiveForRequest,
  isPreviewAccessActiveForRequest,
  isSiteLockEnabled,
} from "@/lib/auth/bypass";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminBypassActive = isAdminBypassActiveForRequest(request);
  const previewAccessActive = isPreviewAccessActiveForRequest(request);

  if (isSiteLockEnabled() && !previewAccessActive && !isAccessControlPath(pathname)) {
    const previewUrl = new URL("/preview-access", request.url);
    previewUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(previewUrl);
  }

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (adminBypassActive) {
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

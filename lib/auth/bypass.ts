import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const ADMIN_BYPASS_COOKIE = "pp_admin_bypass";
export const PREVIEW_ACCESS_COOKIE = "pp_preview_access";

const ACCESS_GRANTED = "granted";
const FORCE_OPEN_APP_PREVIEW = true;

function isTruthy(value: string | undefined) {
  return value === "1" || value?.toLowerCase() === "true";
}

export function isOpenPreviewMode() {
  return FORCE_OPEN_APP_PREVIEW || isTruthy(process.env.OPEN_APP_PREVIEW);
}

export function isSiteLockEnabled() {
  return !isOpenPreviewMode() && isTruthy(process.env.SITE_LOCK_ENABLED);
}

export function hasAdminBypassConfigured() {
  return Boolean(process.env.ADMIN_BYPASS_TOKEN?.trim());
}

export function hasPreviewAccessConfigured() {
  return Boolean(process.env.SITE_PREVIEW_TOKEN?.trim());
}

export function matchesAdminBypassToken(token: string) {
  return hasAdminBypassConfigured() && token === process.env.ADMIN_BYPASS_TOKEN?.trim();
}

export function matchesPreviewAccessToken(token: string) {
  return hasPreviewAccessConfigured() && token === process.env.SITE_PREVIEW_TOKEN?.trim();
}

export function isAdminBypassActiveForRequest(request: NextRequest) {
  return (
    isOpenPreviewMode() ||
    (hasAdminBypassConfigured() &&
      request.cookies.get(ADMIN_BYPASS_COOKIE)?.value === ACCESS_GRANTED)
  );
}

export function isPreviewAccessActiveForRequest(request: NextRequest) {
  return (
    isAdminBypassActiveForRequest(request) ||
    (hasPreviewAccessConfigured() &&
      request.cookies.get(PREVIEW_ACCESS_COOKIE)?.value === ACCESS_GRANTED)
  );
}

export async function isAdminBypassActive() {
  if (isOpenPreviewMode()) {
    return true;
  }

  const cookieStore = await cookies();

  return (
    hasAdminBypassConfigured() &&
    cookieStore.get(ADMIN_BYPASS_COOKIE)?.value === ACCESS_GRANTED
  );
}

export async function isPreviewAccessActive() {
  if (await isAdminBypassActive()) {
    return true;
  }

  const cookieStore = await cookies();

  return (
    hasPreviewAccessConfigured() &&
    cookieStore.get(PREVIEW_ACCESS_COOKIE)?.value === ACCESS_GRANTED
  );
}

export function isAccessControlPath(pathname: string) {
  return (
    pathname.startsWith("/preview-access") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/auth/callback")
  );
}

export function grantedCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

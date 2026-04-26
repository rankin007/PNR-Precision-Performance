"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_BYPASS_COOKIE,
  PREVIEW_ACCESS_COOKIE,
  grantedCookieOptions,
  matchesAdminBypassToken,
  matchesPreviewAccessToken,
} from "@/lib/auth/bypass";
import { normalizeNextPath } from "@/lib/auth/next-path";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function grantPreviewAccessAction(formData: FormData) {
  const token = readString(formData, "token");
  const next = normalizeNextPath(readString(formData, "next"), "/");

  if (!matchesPreviewAccessToken(token)) {
    redirect(`/preview-access?error=preview-token&next=${encodeURIComponent(next)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(PREVIEW_ACCESS_COOKIE, "granted", grantedCookieOptions());

  redirect(next);
}

export async function grantAdminBypassAction(formData: FormData) {
  const token = readString(formData, "token");
  const next = normalizeNextPath(readString(formData, "next"), "/admin");

  if (!matchesAdminBypassToken(token)) {
    redirect(`/preview-access?error=admin-token&next=${encodeURIComponent(next)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_BYPASS_COOKIE, "granted", grantedCookieOptions());
  cookieStore.set(PREVIEW_ACCESS_COOKIE, "granted", grantedCookieOptions());

  redirect(next);
}

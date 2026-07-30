"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { normalizeAppRedirectPath } from "@/lib/auth/access";
import { buildPasswordlessCallbackUrl, resolvePasswordlessRedirectOrigin } from "@/lib/auth/redirect-origin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type OtpActionResult =
  | { ok: true }
  | { ok: false; reason: "configuration" | "invalid" | "unavailable" };

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signInWithOtpAction(formData: FormData) {
  const email = readString(formData, "email");
  const next = normalizeAppRedirectPath(readString(formData, "next"));

  if (!hasSupabaseEnv()) {
    redirect(`/sign-in?setup=supabase&next=${encodeURIComponent(next)}`);
  }

  if (!email) {
    redirect(`/sign-in?error=email&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createSupabaseServerClient();
  const requestHeaders = await headers();
  const origin = resolvePasswordlessRedirectOrigin({
    requestOrigin: requestHeaders.get("origin"),
    forwardedHost: requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"),
    forwardedProto: requestHeaders.get("x-forwarded-proto"),
    configuredOrigin: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  });

  if (!origin) {
    redirect(`/sign-in?error=origin&next=${encodeURIComponent(next)}`);
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: buildPasswordlessCallbackUrl(origin, next),
    },
  });

  if (error) {
    redirect(`/sign-in?error=otp&next=${encodeURIComponent(next)}`);
  }

  redirect(`/sign-in?sent=true&next=${encodeURIComponent(next)}`);
}

export async function requestEmailOtpAction(emailInput: string, nextInput: string): Promise<OtpActionResult> {
  const email = emailInput.trim();
  const next = normalizeAppRedirectPath(nextInput);

  if (!hasSupabaseEnv()) return { ok: false, reason: "configuration" };
  if (!email) return { ok: false, reason: "invalid" };

  const requestHeaders = await headers();
  const origin = resolvePasswordlessRedirectOrigin({
    requestOrigin: requestHeaders.get("origin"),
    forwardedHost: requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"),
    forwardedProto: requestHeaders.get("x-forwarded-proto"),
    configuredOrigin: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  });
  if (!origin) return { ok: false, reason: "unavailable" };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: buildPasswordlessCallbackUrl(origin, next),
    },
  });

  // The response is intentionally generic so account existence is not disclosed.
  if (error) return { ok: true };
  return { ok: true };
}

export async function verifyEmailOtpAction(emailInput: string, tokenInput: string): Promise<OtpActionResult> {
  const email = emailInput.trim();
  const token = tokenInput.trim();
  if (!hasSupabaseEnv()) return { ok: false, reason: "configuration" };
  if (!email || !/^\d{6}$/.test(token)) return { ok: false, reason: "invalid" };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error || !data.session || !data.user) return { ok: false, reason: "invalid" };
  return { ok: true };
}

export async function signOutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/");
}

"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { normalizeAppRedirectPath } from "@/lib/auth/access";
import { classifyOtpRequestError } from "@/lib/auth/otp-request";
import {
  buildOtpVerificationPayload,
  classifyOtpVerification,
  classifyOtpVerificationError,
  classifyOtpVerificationInput,
  type OtpVerificationDiagnostic,
} from "@/lib/auth/otp-verification";
import { buildPasswordlessCallbackUrl, resolvePasswordlessRedirectOrigin } from "@/lib/auth/redirect-origin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type OtpActionResult =
  | { ok: true; outcome?: "indeterminate" }
  | { ok: false; reason: "configuration" | "invalid" | "retry-later" | "unavailable"; diagnostic?: OtpVerificationDiagnostic };

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

  // Missing identities and accepted requests intentionally share one response.
  // Operational rejection is also generic and never exposes provider detail.
  if (classifyOtpRequestError(error) === "retry-later") return { ok: false, reason: "retry-later" };
  return { ok: true, outcome: "indeterminate" };
}

export async function verifyEmailOtpAction(emailInput: string, tokenInput: string): Promise<OtpActionResult> {
  const { email, token } = buildOtpVerificationPayload(emailInput, tokenInput);
  if (!hasSupabaseEnv()) return { ok: false, reason: "configuration" };
  if (classifyOtpVerificationInput({ email, token }) === "invalid") {
    return { ok: false, reason: "invalid", diagnostic: "malformed" };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error || !data.session || !data.user) {
    return { ok: false, reason: "invalid", diagnostic: classifyOtpVerificationError(error) };
  }
  if (classifyOtpVerification({ email, token, hasError: Boolean(error), hasSession: Boolean(data.session), hasUser: Boolean(data.user) }) === "invalid") {
    return { ok: false, reason: "invalid" };
  }
  return { ok: true };
}

export async function signOutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/");
}

"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { normalizeAppRedirectPath } from "@/lib/auth/access";
import { buildPasswordlessCallbackUrl, resolvePasswordlessRedirectOrigin } from "@/lib/auth/redirect-origin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

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
      emailRedirectTo: buildPasswordlessCallbackUrl(origin, next),
    },
  });

  if (error) {
    redirect(`/sign-in?error=otp&next=${encodeURIComponent(next)}`);
  }

  redirect(`/sign-in?sent=true&next=${encodeURIComponent(next)}`);
}

export async function signOutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/");
}

"use server";

import { redirect } from "next/navigation";
import { normalizeAppRedirectPath } from "@/lib/auth/access";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { buildPasswordlessCallbackUrl } from "@/lib/domain/trainer-journey";

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
  const emailRedirectTo = buildPasswordlessCallbackUrl(
    {
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },
    next,
  );

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo,
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

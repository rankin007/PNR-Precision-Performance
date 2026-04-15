"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signInWithOtpAction(formData: FormData) {
  const email = readString(formData, "email");
  const next = readString(formData, "next") || "/portal";

  if (!hasSupabaseEnv()) {
    redirect(`/sign-in?setup=supabase&next=${encodeURIComponent(next)}`);
  }

  if (!email) {
    redirect(`/sign-in?error=email&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createSupabaseServerClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
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

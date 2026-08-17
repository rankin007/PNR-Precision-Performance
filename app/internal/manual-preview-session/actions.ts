"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function installManualPreviewSessionAction(formData: FormData) {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  if (process.env.VERCEL_ENV !== "preview" || !/^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/.test(host)) {
    redirect("/sign-in");
  }

  const accessToken = formData.get("access_token");
  const refreshToken = formData.get("refresh_token");
  if (typeof accessToken !== "string" || typeof refreshToken !== "string" || !accessToken || !refreshToken) {
    redirect("/sign-in");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  if (error) redirect("/sign-in");
  redirect("/portal");
}

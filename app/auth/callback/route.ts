import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { bootstrapAuthenticatedUser } from "@/lib/auth/bootstrap";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/portal";

  if (!hasSupabaseEnv()) {
    return NextResponse.redirect(
      new URL(`/sign-in?setup=supabase&next=${encodeURIComponent(next)}`, request.url),
    );
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await bootstrapAuthenticatedUser({
        authUserId: user.id,
        email: user.email ?? null,
        displayName:
          typeof user.user_metadata?.display_name === "string"
            ? user.user_metadata.display_name
            : typeof user.user_metadata?.full_name === "string"
              ? user.user_metadata.full_name
              : null,
        firstName:
          typeof user.user_metadata?.first_name === "string"
            ? user.user_metadata.first_name
            : null,
        lastName:
          typeof user.user_metadata?.last_name === "string" ? user.user_metadata.last_name : null,
      });
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}

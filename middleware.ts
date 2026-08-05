import type { NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { response } = await updateSupabaseSession(request);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

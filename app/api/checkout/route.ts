import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

export async function POST(request: NextRequest) {
  return NextResponse.redirect(
    new URL(`/shop?checkout=${commercialAuthority.reasonCode}`, request.url),
    { status: 303 },
  );
}

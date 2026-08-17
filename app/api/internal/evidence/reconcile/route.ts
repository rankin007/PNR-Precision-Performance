import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { reconcileBatch } from "@/lib/evidence/server/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorised(header: string | null, secret: string | undefined) {
  if (!header || !secret || !header.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(header.slice(7));
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function GET(request: Request) {
  if (!authorised(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const result = await reconcileBatch(25);
  return NextResponse.json({ ok: result.ok, processed: result.processed }, { status: result.ok ? 200 : 503 });
}

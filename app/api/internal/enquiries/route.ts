import { NextResponse } from "next/server";
import { readEnquiryEnvironment } from "@/lib/enquiries/env";
import { deleteFixture, internalRequestIsAuthorized, proveRateLimit, readFixtureStatus, readSchemaStatus, runEnquiryMaintenance } from "@/lib/enquiries/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const environment = readEnquiryEnvironment();
  return environment && internalRequestIsAuthorized(request.headers.get("authorization"), environment.cronSecret);
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ result: "unavailable" }, { status: 404 });
  const result = await runEnquiryMaintenance();
  return NextResponse.json(result, { status: result.result === "maintained" ? 200 : 503 });
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ result: "unavailable" }, { status: 404 });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ result: "unavailable" }, { status: 415 });
  let body: { action?: unknown; reference?: unknown };
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 1024) throw new Error("invalid");
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ result: "unavailable" }, { status: 400 });
  }
  const reference = typeof body.reference === "string" ? body.reference : "";
  const result = body.action === "status"
    ? await readFixtureStatus(reference)
    : body.action === "purge-fixture"
      ? await deleteFixture(reference)
      : body.action === "schema-status"
        ? await readSchemaStatus()
        : body.action === "rate-limit-proof"
          ? await proveRateLimit()
        : body.action === "maintain"
          ? await runEnquiryMaintenance()
            : { result: "unavailable" as const };
  return NextResponse.json(result, { status: result.result === "unavailable" ? 400 : 200 });
}

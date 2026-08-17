import { NextResponse } from "next/server";
import { readEnquiryEnvironment } from "@/lib/enquiries/env";
import { authorizeInternalEnquiryPost, runDedicatedSmtpPreflight } from "@/lib/enquiries/preflight-auth";
import { deleteFixture, internalRequestIsAuthorized, proveRateLimit, proveRetention, readFixtureStatus, readSchemaStatus, runEnquiryMaintenance, runSmtpPreflight } from "@/lib/enquiries/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const environment = readEnquiryEnvironment();
  return environment && internalRequestIsAuthorized(request.headers.get("authorization"), environment.cronSecret);
}

function sharedAuthorized(request: Request) {
  if (!authorized(request)) return false;
  return true;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ result: "unavailable" }, { status: 404 });
  const result = await runEnquiryMaintenance();
  return NextResponse.json(result, { status: result.result === "maintained" ? 200 : 503 });
}

export async function POST(request: Request) {
  const admission = await authorizeInternalEnquiryPost(request, () => sharedAuthorized(request));
  if (admission.kind === "dedicated") {
    const result = await runDedicatedSmtpPreflight();
    return NextResponse.json(result, { status: result.status === "ready" ? 200 : 503 });
  }
  if (admission.kind === "denied") return NextResponse.json({ result: "unavailable" }, { status: 404 });
  if (admission.kind === "shared-error") return NextResponse.json({ result: "unavailable" }, { status: admission.status });

  const body = { action: admission.action, reference: admission.reference };
  const reference = typeof body.reference === "string" ? body.reference : "";
  const result = body.action === "status"
    ? await readFixtureStatus(reference)
    : body.action === "purge-fixture"
      ? await deleteFixture(reference)
      : body.action === "schema-status"
        ? await readSchemaStatus()
        : body.action === "rate-limit-proof"
          ? await proveRateLimit()
          : body.action === "retention-proof"
            ? await proveRetention()
            : body.action === "smtp-preflight"
              ? await runSmtpPreflight()
              : body.action === "maintain"
                ? await runEnquiryMaintenance()
                : { result: "unavailable" as const };
  const status = result.result === "unavailable"
    ? 400
    : result.result === "smtp-preflight" && result.status !== "ready"
      ? 503
      : 200;
  return NextResponse.json(result, { status });
}

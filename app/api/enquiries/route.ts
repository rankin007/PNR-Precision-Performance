import { NextResponse } from "next/server";
import { ENQUIRY_BODY_LIMIT_BYTES, parseEnquiryPayload, requestOriginIsSameHost } from "@/lib/enquiries/contract";
import { submitEnquiry } from "@/lib/enquiries/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const genericInvalid = { result: "invalid", message: "Review the enquiry details and try again." };

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json(genericInvalid, { status: 415 });
  }
  if (!requestOriginIsSameHost(request.url, request.headers.get("origin"), request.headers.get("x-forwarded-host") ?? request.headers.get("host"))) {
    return NextResponse.json(genericInvalid, { status: 403 });
  }
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(declaredLength) || declaredLength > ENQUIRY_BODY_LIMIT_BYTES) {
    return NextResponse.json(genericInvalid, { status: 413 });
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json(genericInvalid, { status: 400 });
  }
  if (Buffer.byteLength(raw, "utf8") > ENQUIRY_BODY_LIMIT_BYTES) return NextResponse.json(genericInvalid, { status: 413 });

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return NextResponse.json(genericInvalid, { status: 400 });
  }
  const parsed = parseEnquiryPayload(parsedJson);
  if (!parsed.ok) {
    return NextResponse.json({ ...genericInvalid, fields: parsed.kind === "invalid" ? parsed.fields : {} }, { status: 400 });
  }

  const networkIdentifier = (request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "").split(",", 1)[0].trim();
  const outcome = await submitEnquiry(parsed.value, networkIdentifier);
  if (outcome.result === "limited") return NextResponse.json({ result: "limited", message: "Please wait before trying again." }, { status: 429 });
  if (outcome.result !== "received") return NextResponse.json({ result: "unavailable", message: "Online enquiries are temporarily unavailable. Please try again later." }, { status: 503 });
  return NextResponse.json({ result: "received", message: "Enquiry received", reference: outcome.reference });
}

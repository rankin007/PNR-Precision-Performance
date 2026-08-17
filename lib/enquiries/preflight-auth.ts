import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import {
  classifySmtpProvider,
  verifySmtpTransport,
  type SmtpPreflightOutcome,
  type SmtpTransportConfiguration,
} from "@/lib/enquiries/provider";

export const PREFLIGHT_AUTH_ENVIRONMENT_NAMES = Object.freeze([
  "PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256",
  "PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE",
  "PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT",
] as const);

export type DedicatedSmtpPreflightDecision = "authorized" | "dedicated-denied" | "not-dedicated";
export type InternalEnquiryPostAdmission =
  | { kind: "dedicated" }
  | { kind: "denied" }
  | { kind: "shared-error"; status: 400 | 415 }
  | { kind: "shared"; action: unknown; reference: unknown };

const MAXIMUM_WINDOW_MS = 15 * 60 * 1000;
const verifierPattern = /^[0-9a-f]{64}$/;

function canonicalUtcMilliseconds(value: string | undefined) {
  if (!value) return null;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) && new Date(milliseconds).toISOString() === value
    ? milliseconds
    : null;
}

function suppliedBearer(authorization: string | null) {
  if (!authorization?.startsWith("Bearer ")) return null;
  const bearer = authorization.slice(7);
  return bearer && !/[\u0000-\u001f\u007f]/.test(bearer) ? bearer : null;
}

export function decideDedicatedSmtpPreflight(
  authorization: string | null,
  action: unknown,
  source: NodeJS.ProcessEnv = process.env,
  now: Date = new Date(),
): DedicatedSmtpPreflightDecision {
  const bearer = suppliedBearer(authorization);
  const verifier = source.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256;
  if (!bearer || !verifierPattern.test(verifier ?? "")) return "not-dedicated";

  const suppliedHash = createHash("sha256").update(bearer, "utf8").digest();
  const expectedHash = Buffer.from(verifier!, "hex");
  const matches = suppliedHash.length === expectedHash.length && timingSafeEqual(suppliedHash, expectedHash);
  suppliedHash.fill(0);
  expectedHash.fill(0);
  if (!matches) return "not-dedicated";

  const notBefore = canonicalUtcMilliseconds(source.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE);
  const expiresAt = canonicalUtcMilliseconds(source.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT);
  const current = now.getTime();
  if (
    bearer.length < 32 || notBefore === null || expiresAt === null || !Number.isFinite(current) ||
    expiresAt <= notBefore || expiresAt - notBefore > MAXIMUM_WINDOW_MS ||
    current < notBefore || current >= expiresAt || action !== "smtp-preflight"
  ) return "dedicated-denied";
  return "authorized";
}

type ParsedPost =
  | { kind: "non-json" }
  | { kind: "invalid" }
  | { kind: "valid"; action: unknown; reference: unknown };

async function parsePost(request: Request): Promise<ParsedPost> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return { kind: "non-json" };
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 1024) return { kind: "invalid" };
    const body = JSON.parse(raw) as unknown;
    if (!body || typeof body !== "object" || Array.isArray(body)) return { kind: "invalid" };
    const record = body as Record<string, unknown>;
    return { kind: "valid", action: record.action, reference: record.reference };
  } catch {
    return { kind: "invalid" };
  }
}

export async function authorizeInternalEnquiryPost(
  request: Request,
  sharedAuthorized: () => boolean,
  decideDedicated: typeof decideDedicatedSmtpPreflight = decideDedicatedSmtpPreflight,
): Promise<InternalEnquiryPostAdmission> {
  const parsed = await parsePost(request);
  const action = parsed.kind === "valid" ? parsed.action : undefined;
  const dedicated = decideDedicated(request.headers.get("authorization"), action);
  if (dedicated === "authorized") return { kind: "dedicated" };
  if (dedicated === "dedicated-denied") return { kind: "denied" };
  if (!sharedAuthorized()) return { kind: "denied" };
  if (parsed.kind === "non-json") return { kind: "shared-error", status: 415 };
  if (parsed.kind === "invalid") return { kind: "shared-error", status: 400 };
  return { kind: "shared", action: parsed.action, reference: parsed.reference };
}

function readDedicatedSmtpConfiguration(source: NodeJS.ProcessEnv) {
  const smtpHost = source.PUBLIC_ENQUIRY_SMTP_HOST?.trim() ?? "";
  const smtpPort = Number(source.PUBLIC_ENQUIRY_SMTP_PORT);
  const smtpUser = source.PUBLIC_ENQUIRY_SMTP_USER?.trim() ?? "";
  const smtpPass = source.PUBLIC_ENQUIRY_SMTP_PASS ?? "";
  const provider = classifySmtpProvider(smtpHost);
  if (!provider || !Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535 || !smtpUser || !smtpPass) return null;
  return { configuration: { smtpHost, smtpPort, smtpUser, smtpPass } satisfies SmtpTransportConfiguration, provider };
}

export async function runDedicatedSmtpPreflight(
  source: NodeJS.ProcessEnv = process.env,
  verify: (configuration: SmtpTransportConfiguration) => Promise<SmtpPreflightOutcome> = verifySmtpTransport,
) {
  const dedicated = readDedicatedSmtpConfiguration(source);
  if (!dedicated) {
    return { result: "smtp-preflight" as const, status: "unavailable" as const, providerClass: null, errorClass: "unexpected" as const };
  }
  const outcome = await verify(dedicated.configuration);
  return {
    result: "smtp-preflight" as const,
    status: outcome.status,
    providerClass: dedicated.provider.providerClass,
    errorClass: outcome.errorClass,
  };
}

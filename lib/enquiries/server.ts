import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { ENQUIRY_NOTICE_VERSION, type EnquiryPayload } from "@/lib/enquiries/contract";
import { readEnquiryEnvironment, type EnquiryEnvironment } from "@/lib/enquiries/env";
import { deliverNotification, verifySmtpTransport, type DeliveryOutcome } from "@/lib/enquiries/provider";

const RETIRED_ENQUIRY_REFERENCE = "PP-3B4BDEE2D55CB313";

type RpcResult<T> = { data: T | null; error: { code?: string; message?: string } | null };
type EnquiryAdmin = { rpc<T = unknown>(name: string, parameters?: Record<string, unknown>): PromiseLike<RpcResult<T>> };

type AcceptedRow = { public_reference: string; created_new: boolean; notification_status: string };
type ClaimedRow = {
  public_reference: string;
  claim_token: string;
  trainer_name: string;
  stable_name: string;
  stable_address: string | null;
  phone: string;
  email: string;
  horse_volume: number;
  referred_by: string | null;
  created_at: string;
  provider_class: string;
  notification_attempts: number;
};
type EnquirySchemaStatusRow = {
  enquiry_table_count: number;
  bucket_table_count: number;
  rls_table_count: number;
  browser_policy_count: number;
  browser_grant_count: number;
  service_function_count: number;
  enquiry_row_count: number;
};
type EnquiryRetentionStatusRow = {
  nullable_link_count: number;
  set_null_fk_count: number;
  two_hour_expiry_count: number;
  bucket_row_count: number;
  linked_enquiry_count: number;
  unlinked_enquiry_count: number;
  cleanup_job_count: number;
  cleanup_job_active_count: number;
};

export type EnquiryDependencies = {
  admin: EnquiryAdmin;
  environment: EnquiryEnvironment;
  now: () => Date;
  randomReference: () => string;
  deliver: typeof deliverNotification;
  verify: typeof verifySmtpTransport;
};

export type EnquirySubmissionResult =
  | { result: "received"; reference: string; notification: "sent" | "retryable" | "delivery_unknown" | "pending" }
  | { result: "limited" | "unavailable" };

function firstRow<T>(value: T[] | T | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

function isSafeCount(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function hmac(secret: string, purpose: string, value: string) {
  return createHmac("sha256", secret).update(`${purpose}\0${value}`, "utf8").digest("hex");
}

function utcHour(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours())).toISOString();
}

export async function defaultEnquiryDependencies(): Promise<EnquiryDependencies | null> {
  const environment = readEnquiryEnvironment();
  if (!environment) return null;
  const { createSupabaseAdminClient } = await import("../supabase/admin");
  return {
    admin: createSupabaseAdminClient() as unknown as EnquiryAdmin,
    environment,
    now: () => new Date(),
    randomReference: () => `PP-${randomBytes(8).toString("hex").toUpperCase()}`,
    deliver: deliverNotification,
    verify: verifySmtpTransport,
  };
}

function payloadFromClaim(row: ClaimedRow): EnquiryPayload {
  return {
    trainerName: row.trainer_name,
    stableName: row.stable_name,
    stableAddress: row.stable_address ?? "",
    phone: row.phone,
    email: row.email,
    horseVolume: row.horse_volume,
    referredBy: row.referred_by ?? "",
    acknowledgement: true,
    website: "",
    requestId: "00000000-0000-4000-8000-000000000000",
  };
}

async function completeNotification(admin: EnquiryAdmin, row: ClaimedRow, outcome: DeliveryOutcome) {
  const completion = await admin.rpc<boolean>("complete_trainer_enquiry_notification", {
    p_public_reference: row.public_reference,
    p_claim_token: row.claim_token,
    p_outcome: outcome.state,
    p_error_class: outcome.errorClass,
  });
  return !completion.error && completion.data === true;
}

async function notifyClaim(row: ClaimedRow, dependencies: EnquiryDependencies) {
  if (row.public_reference === RETIRED_ENQUIRY_REFERENCE) {
    const outcome = { state: "delivery_unknown", errorClass: "unexpected" } as const;
    await completeNotification(dependencies.admin, row, outcome);
    return outcome.state;
  }
  const outcome = await dependencies.deliver(
    dependencies.environment,
    payloadFromClaim(row),
    row.public_reference,
    row.created_at,
  );
  const completed = await completeNotification(dependencies.admin, row, outcome);
  return completed ? outcome.state : "delivery_unknown";
}

export async function submitEnquiry(payload: EnquiryPayload, networkIdentifier: string, suppliedDependencies: EnquiryDependencies | null = null): Promise<EnquirySubmissionResult> {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies || !networkIdentifier) return { result: "unavailable" };
  const current = dependencies.now();
  const windowStartedAt = utcHour(current);
  const idempotencyHash = hmac(dependencies.environment.abuseSecret, "idempotency", payload.requestId);
  const abuseBucketHash = hmac(dependencies.environment.abuseSecret, "network-hour", `${windowStartedAt}\0${networkIdentifier}`);
  networkIdentifier = "";
  const publicReference = dependencies.randomReference();
  if (publicReference === RETIRED_ENQUIRY_REFERENCE) return { result: "unavailable" };
  const accepted = await dependencies.admin.rpc<AcceptedRow[]>("accept_trainer_enquiry", {
    p_public_reference: publicReference,
    p_idempotency_hash: idempotencyHash,
    p_abuse_bucket_hash: abuseBucketHash,
    p_window_started_at: windowStartedAt,
    p_trainer_name: payload.trainerName,
    p_stable_name: payload.stableName,
    p_stable_address: payload.stableAddress,
    p_phone: payload.phone,
    p_email: payload.email,
    p_horse_volume: payload.horseVolume,
    p_referred_by: payload.referredBy,
    p_notice_version: ENQUIRY_NOTICE_VERSION,
    p_provider_class: dependencies.environment.provider.providerClass,
  });
  if (accepted.error) {
    return accepted.error.message === "enquiry_limit" || accepted.error.code === "P0001"
      ? { result: "limited" }
      : { result: "unavailable" };
  }
  const row = firstRow(accepted.data);
  if (!row) return { result: "unavailable" };
  if (!row.created_new) {
    const notification = ["sent", "retryable", "delivery_unknown"].includes(row.notification_status)
      ? row.notification_status as "sent" | "retryable" | "delivery_unknown"
      : "pending";
    return { result: "received", reference: row.public_reference, notification };
  }

  const claim = await dependencies.admin.rpc<ClaimedRow[]>("claim_trainer_enquiry_notification", { p_public_reference: row.public_reference });
  const claimed = claim.error ? null : firstRow(claim.data);
  const notification = claimed ? await notifyClaim(claimed, dependencies) : "pending";
  return { result: "received", reference: row.public_reference, notification };
}

export function internalRequestIsAuthorized(authorization: string | null, secret: string) {
  if (!authorization?.startsWith("Bearer ") || secret.length < 32) return false;
  const supplied = authorization.slice(7);
  const suppliedBytes = Buffer.from(supplied, "utf8");
  const expectedBytes = Buffer.from(secret, "utf8");
  return suppliedBytes.length === expectedBytes.length && timingSafeEqual(suppliedBytes, expectedBytes);
}

export async function runEnquiryMaintenance(suppliedDependencies: EnquiryDependencies | null = null) {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies) return { result: "unavailable" as const };
  const maintained = await dependencies.admin.rpc<Array<{ stale_unknown: number; enquiries_deleted: number; buckets_deleted: number }>>("maintain_trainer_enquiries", { p_limit: 100 });
  if (maintained.error) return { result: "unavailable" as const };
  const claims = await dependencies.admin.rpc<ClaimedRow[]>("claim_trainer_enquiry_retry_batch", { p_limit: 10 });
  if (claims.error) return { result: "unavailable" as const };
  const notification = { sent: 0, retryable: 0, delivery_unknown: 0 };
  for (const row of claims.data ?? []) {
    const state = await notifyClaim(row, dependencies);
    notification[state] += 1;
  }
  const counts = firstRow(maintained.data) ?? { stale_unknown: 0, enquiries_deleted: 0, buckets_deleted: 0 };
  return { result: "maintained" as const, counts, notification };
}

export async function readFixtureStatus(reference: string, suppliedDependencies: EnquiryDependencies | null = null) {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies || !/^PP-[A-F0-9]{16}$/.test(reference)) return { result: "unavailable" as const };
  const response = await dependencies.admin.rpc<Array<{ row_count: number; bucket_count: number; notification_status: string | null; notification_attempts: number }>>("trainer_enquiry_fixture_status", { p_public_reference: reference });
  const row = response.error ? null : firstRow(response.data);
  return row ? { result: "status" as const, ...row } : { result: "unavailable" as const };
}

export async function deleteFixture(reference: string, suppliedDependencies: EnquiryDependencies | null = null) {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies || !/^PP-[A-F0-9]{16}$/.test(reference)) return { result: "unavailable" as const };
  const response = await dependencies.admin.rpc<Array<{ rows_deleted: number; buckets_deleted: number }>>("delete_trainer_enquiry_fixture", { p_public_reference: reference });
  const row = response.error ? null : firstRow(response.data);
  return row ? { result: "deleted" as const, ...row } : { result: "unavailable" as const };
}

export async function proveRateLimit(suppliedDependencies: EnquiryDependencies | null = null) {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies) return { result: "unavailable" as const };
  const now = dependencies.now();
  const seed = randomBytes(32).toString("hex");
  const response = await dependencies.admin.rpc<boolean>("prove_trainer_enquiry_rate_limit", {
    p_bucket_hash: hmac(dependencies.environment.abuseSecret, "rate-proof-bucket", seed),
    p_idempotency_hash: hmac(dependencies.environment.abuseSecret, "rate-proof-idempotency", seed),
    p_public_reference: dependencies.randomReference(),
    p_window_started_at: utcHour(now),
    p_provider_class: dependencies.environment.provider.providerClass,
  });
  return !response.error && response.data === true
    ? { result: "rate-limit-proven" as const, limited: true, rowsCreated: 0, notificationsAttempted: 0, fixtureResidue: 0 }
    : { result: "unavailable" as const };
}

export async function runSmtpPreflight(suppliedDependencies: EnquiryDependencies | null = null) {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies) {
    return { result: "smtp-preflight" as const, status: "unavailable" as const, providerClass: null, errorClass: "unexpected" as const };
  }
  const outcome = await dependencies.verify(dependencies.environment);
  return {
    result: "smtp-preflight" as const,
    status: outcome.status,
    providerClass: dependencies.environment.provider.providerClass,
    errorClass: outcome.errorClass,
  };
}

export async function proveRetention(suppliedDependencies: EnquiryDependencies | null = null) {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies) return { result: "unavailable" as const };
  const response = await dependencies.admin.rpc<Array<{
    enquiry_retained: number;
    bucket_deleted: number;
    link_nulled: number;
    fixture_residue: number;
  }>>("prove_trainer_enquiry_retention");
  const row = response.error ? null : firstRow(response.data);
  if (
    !row || row.enquiry_retained !== 1 || row.bucket_deleted !== 1 ||
    row.link_nulled !== 1 || row.fixture_residue !== 0
  ) return { result: "unavailable" as const };
  return {
    result: "retention-proven" as const,
    enquiryRetained: 1 as const,
    bucketDeleted: 1 as const,
    linkNulled: 1 as const,
    fixtureResidue: 0 as const,
  };
}

export async function readSchemaStatus(suppliedDependencies: EnquiryDependencies | null = null) {
  const dependencies = suppliedDependencies ?? await defaultEnquiryDependencies();
  if (!dependencies) return { result: "unavailable" as const };
  try {
    const [schemaResponse, retentionResponse] = await Promise.all([
      dependencies.admin.rpc<EnquirySchemaStatusRow[]>("trainer_enquiry_schema_status"),
      dependencies.admin.rpc<EnquiryRetentionStatusRow[]>("trainer_enquiry_retention_status"),
    ]);
    const schema = schemaResponse.error ? null : firstRow(schemaResponse.data);
    const retention = retentionResponse.error ? null : firstRow(retentionResponse.data);
    if (
      !schema || !retention || ![
        schema.enquiry_table_count, schema.bucket_table_count, schema.rls_table_count,
        schema.browser_policy_count, schema.browser_grant_count, schema.service_function_count,
        schema.enquiry_row_count, retention.nullable_link_count, retention.set_null_fk_count,
        retention.two_hour_expiry_count, retention.bucket_row_count, retention.linked_enquiry_count,
        retention.unlinked_enquiry_count, retention.cleanup_job_count, retention.cleanup_job_active_count,
      ].every(isSafeCount)
    ) return { result: "unavailable" as const };
    return {
      result: "schema-status" as const,
      enquiry_table_count: schema.enquiry_table_count,
      bucket_table_count: schema.bucket_table_count,
      rls_table_count: schema.rls_table_count,
      browser_policy_count: schema.browser_policy_count,
      browser_grant_count: schema.browser_grant_count,
      service_function_count: schema.service_function_count,
      enquiry_row_count: schema.enquiry_row_count,
      nullable_link_count: retention.nullable_link_count,
      set_null_fk_count: retention.set_null_fk_count,
      two_hour_expiry_count: retention.two_hour_expiry_count,
      bucket_row_count: retention.bucket_row_count,
      linked_enquiry_count: retention.linked_enquiry_count,
      unlinked_enquiry_count: retention.unlinked_enquiry_count,
      cleanup_job_count: retention.cleanup_job_count,
      cleanup_job_active_count: retention.cleanup_job_active_count,
    };
  } catch {
    return { result: "unavailable" as const };
  }
}

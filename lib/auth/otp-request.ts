type SafeAuthError = {
  code?: unknown;
  status?: unknown;
} | null;

export type OtpRequestDisposition = "indeterminate" | "retry-later";

const RETRY_LATER_CODES = new Set([
  "email_address_not_authorized",
  "email_provider_disabled",
  "hook_timeout",
  "hook_timeout_after_retry",
  "otp_disabled",
  "over_email_send_rate_limit",
  "over_request_rate_limit",
  "request_timeout",
  "unexpected_failure",
]);

export function classifyOtpRequestError(error: SafeAuthError): OtpRequestDisposition {
  if (!error) return "indeterminate";

  const code = typeof error.code === "string" ? error.code : "";
  const status = typeof error.status === "number" ? error.status : 0;
  if (RETRY_LATER_CODES.has(code) || status === 429 || status >= 500) return "retry-later";

  // Missing identities and non-operational provider responses intentionally share
  // the accepted request state so callers cannot enumerate prepared accounts.
  return "indeterminate";
}

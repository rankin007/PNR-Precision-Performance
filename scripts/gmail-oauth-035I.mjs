import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const GMAIL_READONLY = "https://www.googleapis.com/auth/gmail.readonly";
export const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
export const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

const b64url = (value) => Buffer.from(value).toString("base64url");
export function createPkce(random = randomBytes) {
  const verifier = b64url(random(48));
  const challenge = b64url(createHash("sha256").update(verifier, "ascii").digest());
  const state = b64url(random(32));
  if (verifier.length < 43 || state.length < 32) throw new Error("OAUTH_ENTROPY_REFUSED");
  return { verifier, challenge, state };
}

export function buildAuthorizationUrl({ clientId, redirectUri, challenge, state }) {
  const redirect = new URL(redirectUri);
  if (redirect.protocol !== "http:" || redirect.hostname !== "127.0.0.1" || !redirect.port || redirect.pathname !== "/oauth/callback") throw new Error("OAUTH_REDIRECT_REFUSED");
  const url = new URL(AUTH_ENDPOINT);
  for (const [key, value] of Object.entries({ client_id: clientId, redirect_uri: redirect.href, response_type: "code", scope: GMAIL_READONLY, access_type: "offline", prompt: "consent", code_challenge: challenge, code_challenge_method: "S256", state })) url.searchParams.set(key, value);
  return url;
}

export function validateCallback({ callbackUrl, expectedState, redirectUri }) {
  const actual = new URL(callbackUrl); const expected = new URL(redirectUri);
  if (actual.protocol !== "http:" || actual.hostname !== "127.0.0.1" || actual.port !== expected.port || actual.pathname !== "/oauth/callback") throw new Error("OAUTH_CALLBACK_TARGET_REFUSED");
  if (actual.searchParams.has("error")) throw new Error("OAUTH_CONSENT_REFUSED");
  const state = actual.searchParams.get("state") || "";
  const a = Buffer.from(state); const b = Buffer.from(expectedState);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("OAUTH_STATE_REFUSED");
  const code = actual.searchParams.get("code");
  if (!code) throw new Error("OAUTH_CODE_REFUSED");
  return code;
}

export function validateTokenResponse(value, { requireRefresh = false } = {}) {
  if (!value || typeof value !== "object" || typeof value.access_token !== "string" || value.token_type?.toLowerCase() !== "bearer" || !Number.isFinite(value.expires_in)) throw new Error("OAUTH_TOKEN_RESPONSE_REFUSED");
  const scopes = new Set(String(value.scope || "").split(/\s+/).filter(Boolean));
  if (scopes.size !== 1 || !scopes.has(GMAIL_READONLY)) throw new Error("OAUTH_SCOPE_REFUSED");
  if (requireRefresh && typeof value.refresh_token !== "string") throw new Error("OAUTH_REFRESH_REFUSED");
  return { accessToken: value.access_token, refreshToken: value.refresh_token || null, expiresIn: value.expires_in, scope: GMAIL_READONLY };
}

export function classifyTokenFailure(value, afterSendReserved) {
  const invalid = value?.error === "invalid_grant";
  if (afterSendReserved) return "cleanup-only";
  return invalid ? "reauthorization-required" : "oauth-unavailable";
}

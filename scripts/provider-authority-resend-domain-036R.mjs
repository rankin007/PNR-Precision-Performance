import dns from "node:dns/promises";

export const EXPECTED_DOMAIN = "precisionperformance.com.au";
export const MAX_DNS_READS = 5;

export class Domain036RError extends Error {
  constructor(code, context = null) {
    super(code);
    this.name = "Domain036RError";
    this.code = code;
    this.context = context;
  }
}

const fail = (code, context) => { throw new Domain036RError(code, context); };
const object = (value, code) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(code);
  return value;
};
const exactKeys = (value, allowed, code) => {
  object(value, code);
  if (Object.keys(value).some((key) => !allowed.includes(key))) fail(code);
  return value;
};
const text = (value, code, maximum = 4096) => {
  if (typeof value !== "string" || value.length === 0 || value.length > maximum || /[\u0000-\u001f\u007f]/.test(value)) fail(code);
  return value;
};
const freezeRows = (rows) => Object.freeze(rows.map((row) => Object.freeze(row)));

export function normalizeDnsName(value, apex = null) {
  const input = text(value, "DNS_NAME_REFUSED", 253).trim().toLowerCase();
  const explicitFqdn = input.endsWith(".");
  const raw = input.replace(/\.$/, "");
  if (!raw || raw.length > 253 || raw.split(".").some((label) => !label || label.length > 63 || !/^(?!-)[a-z0-9_-]+(?<!-)$/.test(label))) fail("DNS_NAME_REFUSED");
  if (apex === null) return raw;
  const root = normalizeDnsName(apex);
  const fqdn = raw === root || raw.endsWith(`.${root}`) ? raw : explicitFqdn ? raw : `${raw}.${root}`;
  if (fqdn !== root && !fqdn.endsWith(`.${root}`)) fail("DNS_NAME_OUTSIDE_APEX");
  return fqdn;
}

export function normalizeTxt(value) {
  const raw = Array.isArray(value) ? value.map((chunk) => text(chunk, "DNS_TXT_REFUSED", 65536)).join("") : text(value, "DNS_TXT_REFUSED", 65536);
  const normalized = raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
  if (!normalized || /[\u0000-\u001f\u007f]/.test(normalized)) fail("DNS_TXT_REFUSED");
  return normalized;
}

const decodeCapabilities = (value, code) => {
  exactKeys(value, ["sending", "receiving"], code);
  return Object.freeze({ sending: text(value.sending, code), receiving: text(value.receiving, code) });
};

export function decodeDomainPage(raw) {
  exactKeys(raw, ["object", "has_more", "data"], "RESEND_DOMAIN_PAGE_REFUSED");
  if (raw.object !== "list" || typeof raw.has_more !== "boolean" || !Array.isArray(raw.data) || raw.data.length > 100) fail("RESEND_DOMAIN_PAGE_REFUSED");
  const rows = raw.data.map((row) => {
    exactKeys(row, ["id", "name", "status", "created_at", "region", "open_tracking", "click_tracking", "capabilities"], "RESEND_DOMAIN_PAGE_REFUSED");
    const capabilities = decodeCapabilities(row.capabilities, "RESEND_DOMAIN_PAGE_REFUSED");
    return {
      id: text(row.id, "RESEND_DOMAIN_PAGE_REFUSED"),
      name: normalizeDnsName(row.name),
      status: text(row.status, "RESEND_DOMAIN_PAGE_REFUSED"),
      sending: capabilities.sending,
      receiving: capabilities.receiving,
      region: text(row.region, "RESEND_DOMAIN_PAGE_REFUSED"),
      createdAt: text(row.created_at, "RESEND_DOMAIN_PAGE_REFUSED"),
    };
  });
  if (new Set(rows.map((row) => row.id)).size !== rows.length) fail("RESEND_DOMAIN_PAGE_REFUSED");
  if (raw.has_more && rows.length === 0) fail("RESEND_DOMAIN_CURSOR_REFUSED");
  return Object.freeze({ rows: freezeRows(rows), next: raw.has_more ? rows.at(-1).id : null });
}

export function selectExpectedDomain(rows) {
  if (!Array.isArray(rows) || rows.length === 0) fail("RESEND_EXPECTED_DOMAIN_REFUSED");
  if (new Set(rows.map((row) => row.id)).size !== rows.length) fail("RESEND_EXPECTED_DOMAIN_REFUSED");
  const matches = rows.filter((row) => row.name === EXPECTED_DOMAIN);
  if (matches.length !== 1 || matches[0].status !== "verified" || matches[0].sending !== "enabled") fail("RESEND_EXPECTED_DOMAIN_REFUSED");
  return Object.freeze({ ...matches[0] });
}

export function decodeDomainDetail(raw, expectedRow) {
  object(expectedRow, "RESEND_DOMAIN_DETAIL_AUTHORITY_REFUSED");
  exactKeys(raw, ["object", "id", "name", "status", "created_at", "region", "open_tracking", "click_tracking", "tracking_subdomain", "capabilities", "records"], "RESEND_DOMAIN_DETAIL_AUTHORITY_REFUSED");
  if (raw.object !== undefined && raw.object !== "domain") fail("RESEND_DOMAIN_DETAIL_AUTHORITY_REFUSED");
  const capabilities = decodeCapabilities(raw.capabilities, "RESEND_DOMAIN_DETAIL_AUTHORITY_REFUSED");
  if (raw.id !== expectedRow.id || normalizeDnsName(raw.name) !== EXPECTED_DOMAIN || raw.status !== "verified" || capabilities.sending !== "enabled") fail("RESEND_DOMAIN_DETAIL_AUTHORITY_REFUSED");
  if (!Array.isArray(raw.records) || raw.records.length === 0 || raw.records.length > 100) fail("RESEND_DNS_RECORD_REFUSED");
  const records = raw.records.flatMap((row) => {
    exactKeys(row, ["record", "name", "type", "ttl", "status", "value", "priority"], "RESEND_DNS_RECORD_REFUSED");
    const purpose = text(row.record, "RESEND_DNS_RECORD_REFUSED");
    const type = text(row.type, "RESEND_DNS_RECORD_REFUSED").toUpperCase();
    const status = text(row.status, "RESEND_DNS_RECORD_REFUSED");
    if (row.ttl !== "Auto") fail("RESEND_DNS_RECORD_REFUSED");
    if (purpose === "Tracking") {
      if (type !== "CNAME" || row.priority !== undefined) fail("RESEND_DNS_RECORD_REFUSED");
      normalizeDnsName(row.name, EXPECTED_DOMAIN);
      normalizeDnsName(row.value);
      return [];
    }
    const allowed = (purpose === "SPF" && ["TXT", "MX"].includes(type)) || (purpose === "DKIM" && ["TXT", "CNAME"].includes(type));
    if (!allowed || status !== "verified") fail("RESEND_DNS_RECORD_REFUSED");
    const fqdn = normalizeDnsName(row.name, EXPECTED_DOMAIN);
    const value = type === "TXT" ? normalizeTxt(row.value) : normalizeDnsName(row.value);
    const priority = type === "MX" ? row.priority : null;
    if (type === "MX" && (!Number.isInteger(priority) || priority < 0 || priority > 65535)) fail("RESEND_DNS_RECORD_REFUSED");
    if (type !== "MX" && row.priority !== undefined) fail("RESEND_DNS_RECORD_REFUSED");
    return [{ purpose, fqdn, type, value, priority }];
  });
  if (records.length === 0 || records.length > MAX_DNS_READS) fail("RESEND_DNS_CEILING_REFUSED");
  return Object.freeze({ id: raw.id, name: EXPECTED_DOMAIN, status: "verified", sending: "enabled", receiving: capabilities.receiving, region: raw.region ?? expectedRow.region ?? null, records: freezeRows(records) });
}

export function buildProviderDnsTuples(records) {
  if (!Array.isArray(records) || records.length === 0) fail("RESEND_DNS_RECORD_REFUSED");
  if (records.length > MAX_DNS_READS) fail("RESEND_DNS_CEILING_REFUSED");
  const tuples = records.map((row) => {
    object(row, "RESEND_DNS_RECORD_REFUSED");
    const fqdn = normalizeDnsName(row.fqdn);
    if (fqdn !== EXPECTED_DOMAIN && !fqdn.endsWith(`.${EXPECTED_DOMAIN}`)) fail("DNS_NAME_OUTSIDE_APEX");
    const type = text(row.type, "RESEND_DNS_RECORD_REFUSED").toUpperCase();
    if (![["SPF", "TXT"], ["SPF", "MX"], ["DKIM", "TXT"], ["DKIM", "CNAME"]].some(([purpose, allowedType]) => row.purpose === purpose && type === allowedType)) fail("RESEND_DNS_RECORD_REFUSED");
    const value = type === "TXT" ? normalizeTxt(row.value) : normalizeDnsName(row.value);
    const priority = type === "MX" ? row.priority : null;
    if (type === "MX" && !Number.isInteger(priority)) fail("RESEND_DNS_RECORD_REFUSED");
    return { fqdn, type, value, priority };
  });
  const logical = tuples.map((row) => `${row.fqdn}\u0000${row.type}`);
  if (new Set(logical).size !== logical.length) fail("RESEND_DNS_DUPLICATE_REFUSED");
  return freezeRows(tuples);
}

async function defaultResolver(tuple) {
  if (tuple.type === "TXT") return dns.resolveTxt(tuple.fqdn);
  if (tuple.type === "MX") return dns.resolveMx(tuple.fqdn);
  if (tuple.type === "CNAME") return dns.resolveCname(tuple.fqdn);
  fail("RESEND_DNS_RECORD_REFUSED");
}

export async function reconcilePublicDns(tuples, resolver = defaultResolver, onRead = () => {}) {
  if (!Array.isArray(tuples) || tuples.length === 0 || tuples.length > MAX_DNS_READS || typeof resolver !== "function" || typeof onRead !== "function") fail("RESEND_DNS_CEILING_REFUSED");
  let reads = 0;
  try {
    for (const tuple of tuples) {
      reads += 1;
      onRead(tuple, reads);
      const answer = await resolver(tuple);
      if (!Array.isArray(answer)) fail("RESEND_DNS_SET_REFUSED");
      let actual;
      if (tuple.type === "TXT") actual = answer.map((chunks) => normalizeTxt(chunks));
      else if (tuple.type === "MX") actual = answer.map((row) => `${normalizeDnsName(row.exchange)}\u0000${row.priority}`);
      else actual = answer.map((value) => normalizeDnsName(value));
      const expected = tuple.type === "MX" ? `${tuple.value}\u0000${tuple.priority}` : tuple.value;
      if (actual.length !== 1 || new Set(actual).size !== 1 || actual[0] !== expected) fail("RESEND_DNS_SET_REFUSED");
    }
  } catch (error) {
    if (error instanceof Domain036RError) throw error;
    fail("RESEND_DNS_READ_REFUSED");
  }
  return Object.freeze({ reads, tuples: tuples.length, matched: true });
}

export function decodeKeyPage(raw) {
  exactKeys(raw, ["object", "has_more", "data"], "RESEND_KEY_PAGE_REFUSED");
  if (raw.object !== "list" || typeof raw.has_more !== "boolean" || !Array.isArray(raw.data) || raw.data.length > 100) fail("RESEND_KEY_PAGE_REFUSED");
  const rows = raw.data.map((row) => {
    exactKeys(row, ["id", "name", "created_at", "last_used_at"], "RESEND_KEY_PAGE_REFUSED");
    if (row.last_used_at !== null && typeof row.last_used_at !== "string") fail("RESEND_KEY_PAGE_REFUSED");
    return { id: text(row.id, "RESEND_KEY_PAGE_REFUSED"), name: text(row.name, "RESEND_KEY_PAGE_REFUSED"), createdAt: text(row.created_at, "RESEND_KEY_PAGE_REFUSED"), lastUsedAt: row.last_used_at };
  });
  if (new Set(rows.map((row) => row.id)).size !== rows.length) fail("RESEND_KEY_PAGE_REFUSED");
  if (raw.has_more && rows.length === 0) fail("RESEND_KEY_CURSOR_REFUSED");
  return Object.freeze({ rows: freezeRows(rows), next: raw.has_more ? rows.at(-1).id : null });
}

export function validateResendFrame(frame) {
  exactKeys(frame, [], "RESEND_CALLER_AUTHORITY_REFUSED");
  return true;
}
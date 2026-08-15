import assert from "node:assert/strict";
import {
  EXPECTED_DOMAIN, MAX_DNS_READS, Domain036RError, normalizeDnsName, normalizeTxt,
  decodeDomainPage, selectExpectedDomain, decodeDomainDetail, decodeKeyPage,
  buildProviderDnsTuples, reconcilePublicDns, validateResendFrame,
} from "./provider-authority-resend-domain-036R.mjs";

let count = 0;
const ok = (value, label) => { assert.ok(value, label); count += 1; };
const equal = (actual, expected, label) => { assert.deepEqual(actual, expected, label); count += 1; };
const refuses = (fn, code) => { assert.throws(fn, (error) => error instanceof Domain036RError && error.code === code); count += 1; };

equal(EXPECTED_DOMAIN, "precisionperformance.com.au", "expected domain is fixed");
equal(MAX_DNS_READS, 5, "five logical DNS reads");
equal(normalizeDnsName("WWW.Example.COM."), "www.example.com", "DNS names normalize");
equal(normalizeDnsName("send", EXPECTED_DOMAIN), "send.precisionperformance.com.au", "relative name expands");
equal(normalizeDnsName("resend._domainkey", EXPECTED_DOMAIN), "resend._domainkey.precisionperformance.com.au", "relative DKIM expands");
equal(normalizeDnsName(EXPECTED_DOMAIN, EXPECTED_DOMAIN), EXPECTED_DOMAIN, "apex remains apex");
refuses(() => normalizeDnsName("evil.example.", EXPECTED_DOMAIN), "DNS_NAME_OUTSIDE_APEX");
refuses(() => normalizeDnsName("bad name", EXPECTED_DOMAIN), "DNS_NAME_REFUSED");
equal(normalizeTxt('"v=spf1 include:amazonses.com ~all"'), "v=spf1 include:amazonses.com ~all", "outer TXT quotes removed");
equal(normalizeTxt(["v=spf1 ", "include:amazonses.com ", "~all"]), "v=spf1 include:amazonses.com ~all", "TXT chunks join");

const firstPage = decodeDomainPage({ object: "list", has_more: true, data: [{ id: "d_other", name: "other.example", status: "verified", created_at: "now", region: "us-east-1", capabilities: { sending: "enabled", receiving: "disabled" } }] });
equal(firstPage.next, "d_other", "domain cursor is final row ID");
equal(firstPage.rows.length, 1, "domain row retained");
equal(firstPage.rows[0].id, "d_other", "domain ID projected");
equal(firstPage.rows[0].sending, "enabled", "sending capability projected");
refuses(() => decodeDomainPage({ object: "list", has_more: true, data: [] }), "RESEND_DOMAIN_CURSOR_REFUSED");
refuses(() => decodeDomainPage({ object: "list", has_more: false, data: [{ id: "d", name: EXPECTED_DOMAIN, status: "verified", created_at: "now", region: "us-east-1", capabilities: { sending: "enabled", receiving: "disabled" }, value: "secret" }] }), "RESEND_DOMAIN_PAGE_REFUSED");
refuses(() => decodeDomainPage({ object: "wrong", has_more: false, data: [] }), "RESEND_DOMAIN_PAGE_REFUSED");

const domainRow = { id: "d_exact", name: EXPECTED_DOMAIN, status: "verified", sending: "enabled", receiving: "disabled", region: "us-east-1", createdAt: "now" };
equal(selectExpectedDomain([domainRow]).id, "d_exact", "one exact domain selected");
refuses(() => selectExpectedDomain([]), "RESEND_EXPECTED_DOMAIN_REFUSED");
refuses(() => selectExpectedDomain([{ ...domainRow, status: "pending" }]), "RESEND_EXPECTED_DOMAIN_REFUSED");
refuses(() => selectExpectedDomain([{ ...domainRow, sending: "disabled" }]), "RESEND_EXPECTED_DOMAIN_REFUSED");
refuses(() => selectExpectedDomain([domainRow, { ...domainRow, id: "d_dup" }]), "RESEND_EXPECTED_DOMAIN_REFUSED");
refuses(() => selectExpectedDomain([domainRow, { ...domainRow }]), "RESEND_EXPECTED_DOMAIN_REFUSED");

const oneTxtDetail = decodeDomainDetail({ id: "d_exact", name: EXPECTED_DOMAIN, status: "verified", region: "us-east-1", capabilities: { sending: "enabled", receiving: "disabled" }, records: [
  { record: "SPF", name: "send", type: "TXT", value: "v=spf1 include:amazonses.com ~all", ttl: "Auto", status: "verified" },
  { record: "SPF", name: "send", type: "MX", value: "feedback-smtp.us-east-1.amazonses.com", priority: 10, ttl: "Auto", status: "verified" },
  { record: "DKIM", name: "resend._domainkey", type: "TXT", value: "p=public-material", ttl: "Auto", status: "verified" },
  { record: "Tracking", name: "links", type: "CNAME", value: "tracking.resend.com", ttl: "Auto", status: "pending" },
] }, domainRow);
equal(oneTxtDetail.id, "d_exact", "detail ID matches list");
equal(oneTxtDetail.records.length, 3, "one-TXT shape retains three tuples");
equal(oneTxtDetail.records[1].priority, 10, "MX priority projected");
refuses(() => decodeDomainDetail({ id: "wrong", name: EXPECTED_DOMAIN, status: "verified", capabilities: { sending: "enabled", receiving: "disabled" }, records: [] }, domainRow), "RESEND_DOMAIN_DETAIL_AUTHORITY_REFUSED");
refuses(() => decodeDomainDetail({ id: "d_exact", name: EXPECTED_DOMAIN, status: "pending", capabilities: { sending: "enabled", receiving: "disabled" }, records: [] }, domainRow), "RESEND_DOMAIN_DETAIL_AUTHORITY_REFUSED");
refuses(() => decodeDomainDetail({ id: "d_exact", name: EXPECTED_DOMAIN, status: "verified", capabilities: { sending: "enabled", receiving: "disabled" }, records: [{ record: "Tracking", name: "links", type: "TXT", value: "x.example", ttl: "Auto", status: "verified" }] }, domainRow), "RESEND_DNS_RECORD_REFUSED");
refuses(() => decodeDomainDetail({ id: "d_exact", name: EXPECTED_DOMAIN, status: "verified", capabilities: { sending: "enabled", receiving: "disabled" }, records: [{ record: "SPF", name: "send", type: "CNAME", value: "x.example", ttl: "Auto", status: "verified" }] }, domainRow), "RESEND_DNS_RECORD_REFUSED");
refuses(() => decodeDomainDetail({ id: "d_exact", name: EXPECTED_DOMAIN, status: "verified", capabilities: { sending: "enabled", receiving: "disabled" }, records: [{ record: "DKIM", name: "resend._domainkey", type: "CNAME", value: "x.example", ttl: "Auto", status: "pending" }] }, domainRow), "RESEND_DNS_RECORD_REFUSED");
refuses(() => decodeDomainDetail({ id: "d_exact", name: EXPECTED_DOMAIN, status: "verified", capabilities: { sending: "enabled", receiving: "disabled" }, records: [{ record: "DKIM", name: "resend._domainkey", type: "TXT", value: "p=public-material", ttl: "Manual", status: "verified" }] }, domainRow), "RESEND_DNS_RECORD_REFUSED");

const oneTxtTuples = buildProviderDnsTuples(oneTxtDetail.records);
equal(oneTxtTuples.length, 3, "one-TXT shape builds three reads");
equal(oneTxtTuples.map((row) => row.type), ["TXT", "MX", "TXT"], "one-TXT tuple order is stable");
refuses(() => buildProviderDnsTuples([...oneTxtDetail.records, oneTxtDetail.records[0]]), "RESEND_DNS_DUPLICATE_REFUSED");
refuses(() => buildProviderDnsTuples([...oneTxtDetail.records, ...oneTxtDetail.records, ...oneTxtDetail.records]), "RESEND_DNS_CEILING_REFUSED");

const cnameDetail = decodeDomainDetail({ id: "d_exact", name: EXPECTED_DOMAIN, status: "verified", region: "us-east-1", capabilities: { sending: "enabled", receiving: "disabled" }, records: [
  { record: "SPF", name: "send", type: "TXT", value: "v=spf1 include:amazonses.com ~all", ttl: "Auto", status: "verified" },
  { record: "SPF", name: "send", type: "MX", value: "feedback-smtp.us-east-1.amazonses.com.", priority: 10, ttl: "Auto", status: "verified" },
  { record: "DKIM", name: "a._domainkey", type: "CNAME", value: "A.dkim.amazonses.com.", ttl: "Auto", status: "verified" },
  { record: "DKIM", name: "b._domainkey", type: "CNAME", value: "b.dkim.amazonses.com", ttl: "Auto", status: "verified" },
  { record: "DKIM", name: "c._domainkey", type: "CNAME", value: "c.dkim.amazonses.com", ttl: "Auto", status: "verified" },
  { record: "Tracking", name: "links", type: "CNAME", value: "tracking.resend.com", ttl: "Auto", status: "verified" },
] }, domainRow);
equal(cnameDetail.records.length, 5, "three-CNAME shape retains five tuples");
equal(buildProviderDnsTuples(cnameDetail.records).length, 5, "three-CNAME shape reaches ceiling");

const resolverOne = async (tuple) => tuple.type === "TXT" ? [[tuple.value]] : [{ exchange: `${tuple.value}.`, priority: tuple.priority }];
const reconciledOne = await reconcilePublicDns(oneTxtTuples, resolverOne);
equal(reconciledOne.reads, 3, "one-TXT shape uses three reads");
equal(reconciledOne.matched, true, "one-TXT shape matches");
equal(reconciledOne.tuples, 3, "one-TXT evidence count");

const resolverCname = async (tuple) => {
  if (tuple.type === "TXT") return [[`"${tuple.value}"`]];
  if (tuple.type === "MX") return [{ exchange: tuple.value.toUpperCase() + ".", priority: tuple.priority }];
  return [tuple.value.toUpperCase() + "."];
};
const reconciledCname = await reconcilePublicDns(buildProviderDnsTuples(cnameDetail.records), resolverCname);
equal(reconciledCname.reads, 5, "three-CNAME shape uses five reads");
equal(reconciledCname.matched, true, "case/trailing-dot normalization passes");
refuses(() => buildProviderDnsTuples([{ ...oneTxtDetail.records[0], fqdn: "evil.example" }]), "DNS_NAME_OUTSIDE_APEX");
await assert.rejects(() => reconcilePublicDns(oneTxtTuples, async () => []), (error) => error.code === "RESEND_DNS_SET_REFUSED"); count += 1;
await assert.rejects(() => reconcilePublicDns(oneTxtTuples, async (tuple) => tuple.type === "MX" ? [{ exchange: tuple.value, priority: 20 }] : [[tuple.value]]), (error) => error.code === "RESEND_DNS_SET_REFUSED"); count += 1;
await assert.rejects(() => reconcilePublicDns(oneTxtTuples, async (tuple) => tuple.type === "MX" ? [{ exchange: tuple.value, priority: tuple.priority }] : [[tuple.value], ["extra"]]), (error) => error.code === "RESEND_DNS_SET_REFUSED"); count += 1;
await assert.rejects(() => reconcilePublicDns(oneTxtTuples, async (tuple) => tuple.type === "MX" ? [{ exchange: tuple.value, priority: tuple.priority }] : [[tuple.value], [tuple.value]]), (error) => error.code === "RESEND_DNS_SET_REFUSED"); count += 1;
await assert.rejects(() => reconcilePublicDns(oneTxtTuples, async () => { throw new Error("dns"); }), (error) => error.code === "RESEND_DNS_READ_REFUSED"); count += 1;

const keyPage = decodeKeyPage({ object: "list", has_more: false, data: [{ id: "key_1", name: "smtp", created_at: "now", last_used_at: null }] });
equal(keyPage.rows.length, 1, "key row projected");
equal(keyPage.next, null, "key pagination exhausted");
equal(Object.hasOwn(keyPage.rows[0], "permission"), false, "permission not invented");
equal(keyPage.rows[0].lastUsedAt, null, "null last-used metadata projected");
refuses(() => decodeKeyPage({ object: "list", has_more: false, data: [{ id: "key_1", name: "smtp", created_at: "now", last_used_at: null, permission: "full" }] }), "RESEND_KEY_PAGE_REFUSED");
refuses(() => decodeKeyPage({ object: "list", has_more: true, data: [] }), "RESEND_KEY_CURSOR_REFUSED");
equal(validateResendFrame({}), true, "Resend frame accepts no caller identity");
refuses(() => validateResendFrame({ teamId: "caller" }), "RESEND_CALLER_AUTHORITY_REFUSED");
refuses(() => validateResendFrame({ domain: EXPECTED_DOMAIN }), "RESEND_CALLER_AUTHORITY_REFUSED");

equal([Object.isFrozen(oneTxtDetail), Object.isFrozen(oneTxtDetail.records), Object.isFrozen(oneTxtTuples)], [true, true, true], "detail, record set and tuples immutable");
equal(Object.hasOwn(oneTxtDetail.records[0], "ttl"), false, "TTL is not projected");
assert.equal(count, 60, "exact domain assertion arithmetic");
console.log(`provider-authority-resend-domain-036R ${count}/60 PASS`);
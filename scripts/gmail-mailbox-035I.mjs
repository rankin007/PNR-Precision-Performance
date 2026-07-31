import { classifyMailbox } from "./protected-single-run-035H-core.mjs";

const API = "https://gmail.googleapis.com/gmail/v1/users/me";
export function derivePlusAddress(profileEmail, runTag) {
  const email = String(profileEmail).trim().toLowerCase();
  const match = /^([^\s@+]+)@([^\s@]+\.[^\s@]+)$/.exec(email);
  if (!match || !/^035i-[a-z0-9-]{6,40}$/.test(runTag)) throw new Error("GMAIL_PROFILE_REFUSED");
  return `${match[1]}+${runTag}@${match[2]}`;
}

export function buildListRequest({ sender, afterEpochSeconds, maxResults = 5 }) {
  if (!sender || /\s/.test(sender) || !Number.isInteger(afterEpochSeconds) || maxResults < 1 || maxResults > 10) throw new Error("GMAIL_QUERY_REFUSED");
  const url = new URL(`${API}/messages`);
  url.searchParams.set("q", `from:${sender} after:${afterEpochSeconds}`);
  url.searchParams.set("includeSpamTrash", "false");
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("fields", "messages/id,resultSizeEstimate");
  return { method: "GET", url: url.href };
}

export function buildGetRequest(messageId) {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(messageId || "")) throw new Error("GMAIL_MESSAGE_ID_REFUSED");
  const url = new URL(`${API}/messages/${messageId}`);
  url.searchParams.set("format", "full");
  url.searchParams.set("fields", "id,internalDate,payload(mimeType,headers(name,value),body(data),parts(mimeType,headers(name,value),body(data),parts))");
  return { method: "GET", url: url.href };
}

const decode = (data) => Buffer.from(String(data || ""), "base64url").toString("utf8");
function bodies(part, output = []) {
  if (!part || typeof part !== "object") throw new Error("GMAIL_MIME_REFUSED");
  if (["text/plain", "text/html"].includes(part.mimeType) && part.body?.data) output.push(decode(part.body.data));
  for (const child of part.parts || []) bodies(child, output);
  return output;
}
const header = (payload, name) => (payload.headers || []).filter((item) => String(item.name).toLowerCase() === name).map((item) => String(item.value));
export function parseMessage(message) {
  if (!message?.payload || !/^\d+$/.test(String(message.internalDate || ""))) throw new Error("GMAIL_MESSAGE_REFUSED");
  const recipients = [...header(message.payload, "to"), ...header(message.payload, "delivered-to")];
  const senders = header(message.payload, "from");
  if (recipients.length !== 1 || senders.length !== 1) throw new Error("GMAIL_HEADER_AMBIGUOUS");
  const recipient = recipients[0].match(/<([^>]+)>/)?.[1] || recipients[0].trim();
  const sender = senders[0].match(/<([^>]+)>/)?.[1] || senders[0].trim();
  return { recipient: recipient.toLowerCase(), sender: sender.toLowerCase(), branch: /invite|confirm/i.test(header(message.payload, "subject").join(" ")) ? "invitation" : "otp", receivedAt: Number(message.internalDate), body: bodies(message.payload).join("\n"), links: [] };
}

export function classifyGmailMessages(messages, expected) {
  try { return classifyMailbox(messages.map(parseMessage), expected); } catch { return { classification: "provider-error" }; }
}

export async function gmailFetch(fetchFn, accessToken, request) {
  if (!request?.url?.startsWith(`${API}/`) || request.method !== "GET") throw new Error("GMAIL_ENDPOINT_REFUSED");
  const response = await fetchFn(request.url, { method: "GET", headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" }, redirect: "error" });
  if (!response.ok) throw new Error(response.status === 401 ? "GMAIL_AUTH_REFUSED" : "GMAIL_API_REFUSED");
  return response.json();
}

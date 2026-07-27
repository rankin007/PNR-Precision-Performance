import { readFileSync } from "node:fs";

const surfaces = [
  "app/page.tsx",
  "app/pricing/page.tsx",
  "components/forms/trainer-enquiry-form.tsx",
];

const text = surfaces.map((file) => readFileSync(file, "utf8")).join("\n");
const prohibited = [
  ["optimize", /\boptimiz(?:e|ed|es|ing|ation)\b/gi],
  ["individualize", /\bindividualiz(?:e|ed|es|ing|ation)\b/gi],
  ["anonymize", /\banonymiz(?:e|ed|es|ing|ation)\b/gi],
  ["personalize", /\bpersonaliz(?:e|ed|es|ing|ation)\b/gi],
  ["behavior", /\bbehaviors?\b/gi],
  ["license noun", /\blicense\b/gi],
];

const allowlist = new Map([
  // No public-copy exceptions are currently required. Add narrow, documented
  // exceptions here only for immutable proper names or technical identifiers.
]);

const failures = [];
for (const [label, pattern] of prohibited) {
  const matches = text.match(pattern) ?? [];
  const allowed = allowlist.get(label) ?? [];
  const unexpected = matches.filter((match) => !allowed.includes(match));
  if (unexpected.length) failures.push(`${label}: ${unexpected.join(", ")}`);
}

const required = [
  "Precision Performance",
  "Request Trainer Consultation",
  "The Phil-osophy",
  "AUD $5,500",
  "Including GST",
  "Postage additional",
];
for (const phrase of required) {
  if (!text.includes(phrase)) failures.push(`missing required phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Sprint 029M Australian-English validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sprint 029M Australian-English validation passed across ${surfaces.length} public-copy surfaces.`);

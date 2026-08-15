import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const [inputPath, fixturePath, migrationPath] = process.argv.slice(2);
if (!inputPath || !fixturePath || !migrationPath) {
  throw new Error("Usage: extract-biochemistry-loss-tables-025C.mjs <workbook.xlsx> <fixture.json> <migration.sql>");
}

const SOURCE_DOCUMENT = "HORSE Energy Loss Version 3 no urea or age.xlsx";
const SOURCE_VERSION = "v3";
const EFFECTIVE_DATE = "2026-08-07";
const WORKBOOK_SHA256 = "838d935f20b864a4f5ed5c0ca5d017322a1608d1ca1a68ec9b02f6afb4bc5f30";
const TABLE_SPECS = [
  { lookupType: "carbs", range: "B14:C164", count: 151, min: 0, max: 15, step: 0.1, digest: "2dd0e1da2ad8950090b0401189cdfa9553a756b2116755d6a9037711f6ce5c16" },
  { lookupType: "ph_urine", range: "F14:G445", count: 432, min: 4.8, max: 9.11, step: 0.01, digest: "be8fc0483d0f2f2239782398a0ec207f5e121289d692567d66221e87c95c85a6" },
  { lookupType: "ph_saliva", range: "J14:K445", count: 432, min: 4.8, max: 9.11, step: 0.01, digest: "ad62ed9e8bfe35fe72fa11a4c60aa49bc71e6ba1a64d4c3489846f671d3b5888" },
  { lookupType: "salts", range: "N14:O814", count: 801, min: 0, max: 80, step: 0.1, digest: "92352813a40cb5be1a22c5aeb56a5484e0b3703fafed256527a4ac10dbab2f5a" },
];

const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const normalize = (value) => Number(Number(value).toFixed(6));
const NEWLINE = String.fromCharCode(10);
const workbookBytes = await fs.readFile(inputPath);
const workbookHash = hash(workbookBytes);
let passed = 0;
function check(condition, label) {
  assert.ok(condition, label);
  passed += 1;
}

check(workbookHash === WORKBOOK_SHA256, "SRC-01 workbook SHA-256");
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
const sheetInspection = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 8000 });
const sheetNames = sheetInspection.ndjson.split(String.fromCharCode(10)).filter(Boolean).map((line) => JSON.parse(line).name);
const sheet = workbook.worksheets.getItem("Loss Data");
const usedRange = sheet.getRange("A1:O814").values;
check(sheetNames.includes("Loss Data") && usedRange.length === 814 && usedRange[0]?.length === 15, "SRC-02 worksheet and used range");

const rows = [];
const tables = {};
for (const spec of TABLE_SPECS) {
  const rawRows = sheet.getRange(spec.range).values.filter((row) => row.some((value) => value !== null && value !== ""));
  const readings = rawRows.map((row) => row[0]);
  const losses = rawRows.map((row) => row[1]);
  const finite = rawRows.every((row) => typeof row[0] === "number" && Number.isFinite(row[0]) && typeof row[1] === "number" && Number.isFinite(row[1]));
  const steps = readings.slice(1).map((value, index) => Number((value - readings[index]).toFixed(12)));
  check(
    finite
      && rawRows.length === spec.count
      && Math.abs(readings[0] - spec.min) < 1e-9
      && Math.abs(readings.at(-1) - spec.max) < 1e-9
      && steps.every((step) => Math.abs(step - spec.step) < 1e-9),
    "SRC-" + String(3 + TABLE_SPECS.indexOf(spec)).padStart(2, "0") + " " + spec.lookupType + " range/count/bounds/step",
  );
  const tableDigest = hash(JSON.stringify(rawRows));
  check(tableDigest === spec.digest, "SRC-" + String(7 + TABLE_SPECS.indexOf(spec)).padStart(2, "0") + " " + spec.lookupType + " digest");
  const startRow = Number(spec.range.match(/[0-9]+/)?.[0] ?? 0);
  tables[spec.lookupType] = {
    range: spec.range,
    count: spec.count,
    min: spec.min,
    max: spec.max,
    step: spec.step,
    tableValueSha256: tableDigest,
  };
  rawRows.forEach((row, index) => {
    const exactReading = normalize(row[0]);
    const lossFraction = normalize(row[1]);
    rows.push({
      lookupType: spec.lookupType,
      exactReading,
      exactReadingText: String(exactReading),
      lossFraction,
      lossPercentText: (lossFraction * 100).toFixed(6) + "%",
      sourceDocument: SOURCE_DOCUMENT,
      sourceVersion: SOURCE_VERSION,
      sourceWorksheet: "Loss Data",
      sourceRange: spec.range,
      sourceRowNumber: startRow + index,
    });
  });
}

check(
  rows.length === 1816
    && rows.every((row) => ["carbs", "ph_urine", "ph_saliva", "salts"].includes(row.lookupType)),
  "SRC-11 emitted row count and lookup types",
);

const fixture = {
  source: {
    document: SOURCE_DOCUMENT,
    version: SOURCE_VERSION,
    effectiveDate: EFFECTIVE_DATE,
    workbookSha256: workbookHash,
    worksheet: "Loss Data",
    usedRange: "A1:O814",
  },
  tables,
  rows,
};
const fixtureText = JSON.stringify(fixture, null, 2) + NEWLINE;
const fixtureRepeat = JSON.stringify(fixture, null, 2) + NEWLINE;
check(
  fixtureText === fixtureRepeat
    && rows.every((row) => Number.isFinite(row.exactReading) && Number.isFinite(row.lossFraction) && row.sourceDocument === SOURCE_DOCUMENT),
  "SRC-12 deterministic finite source-attributed fixture",
);
assert.equal(passed, 12, "source assertion arithmetic");

function sqlQuote(value) {
  return "'" + String(value).replaceAll("'", "''") + "'";
}

const seedRows = rows.map((row) => "  ("
  + [
    sqlQuote(row.lookupType),
    row.exactReading.toFixed(4),
    sqlQuote(row.exactReadingText),
    row.lossFraction.toFixed(6),
    sqlQuote(row.lossPercentText),
    "null",
    "null",
    sqlQuote(row.sourceDocument),
    sqlQuote(row.sourceVersion),
    String(row.sourceRowNumber),
  ].join(", ")
  + ")").join("," + NEWLINE);

const migration = [
  "-- Sprint 025C - versioned four-loss biochemistry scoring.",
  "-- Generated deterministically from the accepted workbook; do not edit seed values by hand.",
  "",
  "alter table public.biochemistry_lookup_values",
  "  drop constraint if exists biochemistry_lookup_values_lookup_type_check;",
  "alter table public.biochemistry_lookup_values",
  "  add constraint biochemistry_lookup_values_lookup_type_check",
  "  check (lookup_type in ('carbs', 'ph_average', 'ph_urine', 'ph_saliva', 'salts', 'urea'));",
  "",
  "alter table public.biochemistry_tests",
  "  drop constraint if exists biochemistry_tests_ph_average_check,",
  "  drop constraint if exists biochemistry_tests_conductivity_converted_c_value_check,",
  "  drop constraint if exists biochemistry_tests_versioned_reading_shape_check,",
  "  drop constraint if exists biochemistry_tests_versioned_scored_snapshot_check;",
  "",
  "alter table public.biochemistry_tests",
  "  alter column ph_average drop not null,",
  "  alter column urea_reading drop not null,",
  "  add column if not exists carbs_lookup_reading numeric(12,4),",
  "  add column if not exists ph_urine_lookup_value_id uuid references public.biochemistry_lookup_values(id) on delete restrict,",
  "  add column if not exists ph_urine_lookup_reading numeric(12,4),",
  "  add column if not exists ph_urine_loss_fraction numeric(10,6),",
  "  add column if not exists ph_saliva_lookup_value_id uuid references public.biochemistry_lookup_values(id) on delete restrict,",
  "  add column if not exists ph_saliva_lookup_reading numeric(12,4),",
  "  add column if not exists ph_saliva_loss_fraction numeric(10,6),",
  "  add column if not exists conductivity_lookup_c_value numeric(12,4);",
  "",
  "alter table public.biochemistry_tests",
  "  add constraint biochemistry_tests_versioned_reading_shape_check check (",
  "    (formula_version = 'biochemistry-score-v1'",
  "      and ph_average is not null",
  "      and urea_reading is not null",
  "      and conductivity_converted_c_value = (conductivity_raw_meter_value * 1.43))",
  "    or",
  "    (formula_version = 'biochemistry-score-v2'",
  "      and lookup_source_version = 'v3'",
  "      and lookup_source_document = 'HORSE Energy Loss Version 3 no urea or age.xlsx'",
  "      and ph_average is null",
  "      and urea_reading is null",
  "      and ph_average_lookup_value_id is null",
  "      and ph_average_loss_fraction is null",
  "      and urea_lookup_value_id is null",
  "      and urea_loss_fraction is null",
  "      and carbs_reading between 0 and 15",
  "      and ph_saliva between 4.80 and 9.00",
  "      and ph_urine between 4.80 and 9.00",
  "      and conductivity_raw_meter_value between 0 and 99",
  "      and conductivity_converted_c_value = least(round(conductivity_raw_meter_value * 1.43, 2), 80.00)",
  "      and (carbs_lookup_reading is null or carbs_lookup_reading <= carbs_reading)",
  "      and (ph_urine_lookup_reading is null or ph_urine_lookup_reading <= ph_urine)",
  "      and (ph_saliva_lookup_reading is null or ph_saliva_lookup_reading <= ph_saliva)",
  "      and (conductivity_lookup_c_value is null or (conductivity_lookup_c_value <= conductivity_converted_c_value and conductivity_lookup_c_value <= 80.00)))",
  "  );",
  "",
  "alter table public.biochemistry_tests",
  "  add constraint biochemistry_tests_versioned_scored_snapshot_check check (",
  "    scoring_status <> 'scored'",
  "    or (formula_version = 'biochemistry-score-v1'",
  "      and carbs_lookup_value_id is not null",
  "      and ph_average_lookup_value_id is not null",
  "      and salts_lookup_value_id is not null",
  "      and urea_lookup_value_id is not null",
  "      and carbs_loss_fraction is not null",
  "      and ph_average_loss_fraction is not null",
  "      and salts_loss_fraction is not null",
  "      and urea_loss_fraction is not null",
  "      and hydration_score is not null",
  "      and health_score is not null)",
  "    or (formula_version = 'biochemistry-score-v2'",
  "      and carbs_lookup_value_id is not null",
  "      and ph_urine_lookup_value_id is not null",
  "      and ph_saliva_lookup_value_id is not null",
  "      and salts_lookup_value_id is not null",
  "      and carbs_lookup_reading is not null",
  "      and ph_urine_lookup_reading is not null",
  "      and ph_saliva_lookup_reading is not null",
  "      and conductivity_lookup_c_value is not null",
  "      and carbs_loss_fraction between 0 and 1",
  "      and ph_urine_loss_fraction between 0 and 1",
  "      and ph_saliva_loss_fraction between 0 and 1",
  "      and salts_loss_fraction between 0 and 1",
  "      and hydration_score_energy_loss is not null",
  "      and hydration_score is not null",
  "      and health_score_energy_loss is not null",
  "      and health_score is not null",
  "      and hydration_score_energy_loss between 0 and 1",
  "      and hydration_score between 0 and 1",
  "      and health_score_energy_loss between 0 and 1",
  "      and health_score between 0 and 1",
  "      and scoring_blockers = '[]'::jsonb",
  "      and hydration_score_energy_loss = round((carbs_loss_fraction + salts_loss_fraction) / 2, 6)",
  "      and hydration_score = round(1 - hydration_score_energy_loss, 6)",
  "      and health_score_energy_loss = round((carbs_loss_fraction + ph_urine_loss_fraction + ph_saliva_loss_fraction + salts_loss_fraction) / 4, 6)",
  "      and health_score = round(1 - health_score_energy_loss, 6))",
  "  );",
  "",
  "create or replace function public.validate_biochemistry_v2_scored_snapshot()",
  "returns trigger",
  "language plpgsql",
  "set search_path = pg_catalog, public",
  "as $$",
  "begin",
  "  if new.formula_version <> 'biochemistry-score-v2' or new.scoring_status <> 'scored' then",
  "    return new;",
  "  end if;",
  "",
  "  if not exists (select 1 from public.biochemistry_lookup_values where id = new.carbs_lookup_value_id and lookup_type = 'carbs' and exact_reading = new.carbs_lookup_reading and loss_fraction = new.carbs_loss_fraction and source_document = 'HORSE Energy Loss Version 3 no urea or age.xlsx' and source_version = 'v3') then",
  "    raise exception 'Invalid v2 Carbohydrate lookup snapshot' using errcode = '23514';",
  "  end if;",
  "  if not exists (select 1 from public.biochemistry_lookup_values where id = new.ph_urine_lookup_value_id and lookup_type = 'ph_urine' and exact_reading = new.ph_urine_lookup_reading and loss_fraction = new.ph_urine_loss_fraction and source_document = 'HORSE Energy Loss Version 3 no urea or age.xlsx' and source_version = 'v3') then",
  "    raise exception 'Invalid v2 Urine pH lookup snapshot' using errcode = '23514';",
  "  end if;",
  "  if not exists (select 1 from public.biochemistry_lookup_values where id = new.ph_saliva_lookup_value_id and lookup_type = 'ph_saliva' and exact_reading = new.ph_saliva_lookup_reading and loss_fraction = new.ph_saliva_loss_fraction and source_document = 'HORSE Energy Loss Version 3 no urea or age.xlsx' and source_version = 'v3') then",
  "    raise exception 'Invalid v2 Saliva pH lookup snapshot' using errcode = '23514';",
  "  end if;",
  "  if not exists (select 1 from public.biochemistry_lookup_values where id = new.salts_lookup_value_id and lookup_type = 'salts' and exact_reading = new.conductivity_lookup_c_value and loss_fraction = new.salts_loss_fraction and source_document = 'HORSE Energy Loss Version 3 no urea or age.xlsx' and source_version = 'v3') then",
  "    raise exception 'Invalid v2 Salts lookup snapshot' using errcode = '23514';",
  "  end if;",
  "",
  "  return new;",
  "end",
  "$$;",
  "",
  "drop trigger if exists biochemistry_tests_validate_v2_scored_snapshot on public.biochemistry_tests;",
  "create trigger biochemistry_tests_validate_v2_scored_snapshot",
  "before insert or update on public.biochemistry_tests",
  "for each row execute function public.validate_biochemistry_v2_scored_snapshot();",
  "",  "insert into public.biochemistry_lookup_values (",
  "  lookup_type, exact_reading, exact_reading_text, loss_fraction, loss_percent_text,",
  "  increment_fraction, increment_percent_text, source_document, source_version, source_row_number",
  ")",
  "values",
  seedRows,
  "on conflict (lookup_type, exact_reading, source_version) do update",
  "set",
  "  exact_reading_text = excluded.exact_reading_text,",
  "  loss_fraction = excluded.loss_fraction,",
  "  loss_percent_text = excluded.loss_percent_text,",
  "  source_document = excluded.source_document,",
  "  source_row_number = excluded.source_row_number;",
  "",
].join(NEWLINE);

await fs.mkdir(path.dirname(fixturePath), { recursive: true });
await fs.mkdir(path.dirname(migrationPath), { recursive: true });
await fs.writeFile(fixturePath, fixtureText, "utf8");
await fs.writeFile(migrationPath, migration, "utf8");
console.log("Sprint 025C source integrity assertions passed: 12/12.");
console.log("Fixture rows: " + rows.length + "; migration seed rows: " + rows.length + ".");

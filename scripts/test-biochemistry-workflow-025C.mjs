import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  BIOCHEMISTRY_NUMERIC_FIELDS,
  validateBiochemistryCaptureValues,
} from "../components/ops/biochemistry-workflow-state.ts";

const complete = {
  horseId: "horse-test-id",
  horseName: "Test horse",
  testDate: "2026-08-07",
  timeOfDay: "am",
  carbsReading: "4.5",
  phSaliva: "7.25",
  phUrine: "7.24",
  conductivityRawMeterValue: "18.18",
  notes: "",
};
const capture = await readFile(new URL("../components/ops/biochemistry-capture-workflow.tsx", import.meta.url), "utf8");
const resultPanel = await readFile(new URL("../components/ops/biochemistry-result-panel.tsx", import.meta.url), "utf8");
const action = await readFile(new URL("../app/(ops)/data-entry/biochemistry/actions.ts", import.meta.url), "utf8");
let passed = 0;
function check(condition, label) {
  assert.ok(condition, label);
  passed += 1;
}
check(JSON.stringify(BIOCHEMISTRY_NUMERIC_FIELDS.map((field) => field.field)) === JSON.stringify(["carbsReading", "phSaliva", "phUrine", "conductivityRawMeterValue"]), "UI-01 exact four fields");
const validated = validateBiochemistryCaptureValues(complete);
check(validated.ok && !("ureaReading" in validated.values), "UI-02 no Urea default");
const minimum = validateBiochemistryCaptureValues({ ...complete, carbsReading: "0", phSaliva: "4.80", phUrine: "4.80", conductivityRawMeterValue: "0" });
const maximum = validateBiochemistryCaptureValues({ ...complete, carbsReading: "15", phSaliva: "9.00", phUrine: "9.00", conductivityRawMeterValue: "99" });
const outOfRange = validateBiochemistryCaptureValues({ ...complete, conductivityRawMeterValue: "99.01" });
const badStep = validateBiochemistryCaptureValues({ ...complete, carbsReading: "4.55" });
check(minimum.ok && maximum.ok && !outOfRange.ok && !badStep.ok, "UI-03 inclusive bounds and precision");
check(!capture.includes("ureaReading") && !capture.includes("Urea") && !capture.includes("Average pH"), "UI-04 capture/review hidden fields absent");
check(
  action.includes("data.formula_version === BIOCHEMISTRY_FORMULA_VERSION_V2")
    && action.includes("BIOCHEMISTRY_FORMULA_VERSION,")
    && action.includes("BIOCHEMISTRY_FORMULA_VERSION_V2,")
    && action.includes("sourceDocument: row.source_document")
    && action.includes("sourceVersion: row.source_version")
    && action.includes("redirectWithError(\"lookup-load-failed\")"),
  "UI-05 version-discriminated reconstruction and fail-closed v3 attribution",
);
check(resultPanel.includes("Hydration Score") && resultPanel.includes("Biochemistry Trend Score") && !resultPanel.includes("Recommendations") && !resultPanel.includes(">Zones<") && !resultPanel.includes("Urea") && !resultPanel.includes("pH Average"), "UI-06 numeric results with deferred guidance absent");
assert.equal(passed, 6);
console.log("Sprint 025C capture/result assertions passed: 6/6.");

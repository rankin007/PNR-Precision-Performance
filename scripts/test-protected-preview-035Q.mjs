import assert from "node:assert/strict";
import { assertSpecificErrorSummary } from "./protected-preview-035Q.mjs";

const counts = { selector: 0, semantics: 0, guidance: 0, focus: 0, coexistence: 0 };

function check(category, condition, message) {
  assert.ok(condition, message);
  counts[category] += 1;
}

function rejects(input, pattern) {
  try {
    assertSpecificErrorSummary(input);
  } catch (error) {
    return pattern.test(error.message);
  }
  return false;
}

const valid = {
  summaryCount: 1,
  id: "biochemistry-error-summary",
  role: "alert",
  text: "Correct the highlighted fields before review. Select a horse.",
  visible: true,
  focused: true,
  pageAlertCount: 2,
};

check("selector", assertSpecificErrorSummary(valid), "the exact summary selector is accepted");
check("selector", rejects({ ...valid, summaryCount: 0 }, /exactly one specific error summary/), "a missing specific summary is rejected");
check("semantics", valid.role === "alert" && assertSpecificErrorSummary(valid), "the specific summary alert role is accepted");
check("semantics", rejects({ ...valid, role: "status" }, /role=alert/), "a non-alert specific summary is rejected");
check("guidance", /correct.+before review/i.test(valid.text) && assertSpecificErrorSummary(valid), "actionable correction guidance is accepted");
check("guidance", rejects({ ...valid, text: "Something happened." }, /actionable correction guidance/), "non-actionable summary text is rejected");
check("focus", valid.focused && assertSpecificErrorSummary(valid), "focus on the specific summary is accepted");
check("focus", rejects({ ...valid, focused: false }, /receive focus/), "focus elsewhere is rejected");
check("coexistence", valid.pageAlertCount === 2 && assertSpecificErrorSummary(valid), "an unrelated coexisting page alert is permitted");
check("coexistence", rejects({ ...valid, visible: false }, /visible/), "a hidden specific summary is rejected even when alerts coexist");

assert.deepEqual(counts, { selector: 2, semantics: 2, guidance: 2, focus: 2, coexistence: 2 });
console.log("Sprint 035Q focused checks passed: 2 selector + 2 semantics + 2 guidance + 2 focus + 2 coexistence = 10.");

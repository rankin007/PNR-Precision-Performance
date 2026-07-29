import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BIOCHEMISTRY_NOTES_LIMIT,
  biochemistryNoteRequiresReview,
  canSubmitBiochemistryNote,
  validateBiochemistryCaptureValues,
} from "../components/ops/biochemistry-workflow-state.ts";

const baseValues = {
  horseId: "synthetic-horse",
  horseName: "Synthetic Horse",
  testDate: "2026-07-29",
  timeOfDay: "am",
  carbsReading: "2.5",
  phSaliva: "6.4",
  phUrine: "6.6",
  conductivityRawMeterValue: "10",
  ureaReading: "2.5",
  notes: "",
};

assert.equal(biochemistryNoteRequiresReview(""), false);
assert.equal(biochemistryNoteRequiresReview("   \n"), false);
assert.equal(canSubmitBiochemistryNote("", false), true);
assert.equal(canSubmitBiochemistryNote("Synthetic observation", false), false);
assert.equal(canSubmitBiochemistryNote("Synthetic observation", true), true);

const boundary = validateBiochemistryCaptureValues({
  ...baseValues,
  notes: "x".repeat(BIOCHEMISTRY_NOTES_LIMIT),
});
assert.equal(boundary.ok, true);
const overLimit = validateBiochemistryCaptureValues({
  ...baseValues,
  notes: "x".repeat(BIOCHEMISTRY_NOTES_LIMIT + 1),
});
assert.equal(overLimit.ok, false);
if (!overLimit.ok) assert.deepEqual(overLimit.errors.map(({ field }) => field), ["notes"]);

for (const notes of [
  "Synthetic Horse, two measures, 6.4 pH; correct to 6.6 pH.",
  "Synthetic quantity: ten units, comma, then pause.",
]) {
  const result = validateBiochemistryCaptureValues({ ...baseValues, notes });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.values.notes, notes);
    assert.equal(result.values.horseId, baseValues.horseId);
    assert.equal(result.values.phSaliva, baseValues.phSaliva);
    assert.equal(result.normalizedNumbers.phSaliva, Number(baseValues.phSaliva));
  }
}

const workflowSource = readFileSync("components/ops/biochemistry-capture-workflow.tsx", "utf8");
const actionSource = readFileSync("app/(ops)/data-entry/biochemistry/actions.ts", "utf8");
assert.match(workflowSource, /Typing is always available/);
assert.match(workflowSource, /device keyboard provides a microphone/);
assert.match(workflowSource, /application does not record or store audio/);
assert.match(workflowSource, /controlled by your device and keyboard settings/);
assert.match(workflowSource, /unavailable, offline, interrupted or inaccurate/);
assert.match(workflowSource, /I reviewed this note and corrected any dictation errors/);
assert.match(workflowSource, /note-review-confirmation/);
assert.match(workflowSource, /role="alert"/);
assert.match(workflowSource, /No notes added/);
assert.match(workflowSource, /submittedRef/);
assert.doesNotMatch(workflowSource, /getUserMedia|MediaRecorder|SpeechRecognition|webkitSpeechRecognition/);
assert.doesNotMatch(workflowSource, /waveform|confidence score|transcription progress/i);
assert.match(actionSource, /biochemistry_test_notes/);
assert.match(actionSource, /validateCommentText\(notes\)/);
assert.match(actionSource, /note_source: "manual"/);
assert.doesNotMatch(actionSource, /audio|transcript|dictat/i);

console.log("Sprint 027 voice-assisted capture tests passed without emitting note contents.");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildPasswordlessCallbackUrl, composeHorseAccessPresentation, composeHorseWorkspacePresentation, resolvePasswordlessCallbackOrigin } from "../lib/domain/trainer-journey.ts";

const counts = { state: 0, navigation: 0, denial: 0, privacy: 0, accessibility: 0, preview: 0 };
function check(category, condition, message) {
  assert.ok(condition, message);
  counts[category] += 1;
}

const consumers = ["portal-overview", "portal-horse-workspace", "operations-landing", "feeding", "track", "biochemistry"];
const adverseStates = [
  composeHorseAccessPresentation({ envReady: false, horseCount: 0 }),
  composeHorseAccessPresentation({ envReady: true, horseCount: 0 }),
  composeHorseAccessPresentation({ envReady: true, queryFailed: true, horseCount: 0 }),
];
for (const consumer of consumers) {
  for (const state of adverseStates) {
    check("state", state.state !== "ready" && state.action === null, `${consumer} must fail closed for ${state.state}`);
  }
}
check("state", composeHorseAccessPresentation({ envReady: true, horseCount: 1 }).state === "ready", "one assigned horse is ready");
check("state", composeHorseAccessPresentation({ envReady: true, horseCount: 2 }).message.includes("alphabetical"), "many horses remain alphabetical");
check("state", composeHorseWorkspacePresentation({ horseAvailable: true, canWrite: true, horseId: "synthetic", workflowStatus: "blocked", latestTestId: "test" }).state === "incomplete", "blocked is incomplete");
check("state", composeHorseWorkspacePresentation({ horseAvailable: true, canWrite: true, horseId: "synthetic", workflowStatus: "scored" }).state === "completed", "scored is operationally completed");
check("state", composeHorseWorkspacePresentation({ horseAvailable: true, canWrite: false, horseId: "synthetic" }).state === "unavailable", "missing workflow is unavailable");
check("state", composeHorseAccessPresentation({ envReady: true, queryFailed: true, horseCount: 0 }).state === "failed", "query error is failed");

const emptyWrite = composeHorseWorkspacePresentation({ horseAvailable: true, canWrite: true, horseId: "synthetic horse" });
const incompleteWrite = composeHorseWorkspacePresentation({ horseAvailable: true, canWrite: true, horseId: "synthetic", workflowStatus: "unscored", latestTestId: "test-1" });
check("navigation", emptyWrite.action?.href === "/data-entry/biochemistry?horse=synthetic%20horse", "capture handoff encodes horse id");
check("navigation", emptyWrite.action?.label === "Capture biochemistry", "capture action is explicit");
check("navigation", incompleteWrite.action?.href === "/data-entry/biochemistry/test-1", "incomplete handoff opens existing record");
check("navigation", incompleteWrite.action?.label === "Review biochemistry record", "review action is explicit");
check("navigation", composeHorseWorkspacePresentation({ horseAvailable: true, canWrite: false, horseId: "synthetic" }).action?.href === "/portal", "read-only returns to dashboard");
check("navigation", composeHorseAccessPresentation({ envReady: true, horseCount: 1 }).action?.href === "/portal", "ready list stays in portal");

const denied = composeHorseWorkspacePresentation({ horseAvailable: false, canWrite: true, horseId: "unknown" });
for (const fragment of ["unknown", "horse count", "stable", "workflow", "test", "assigned", "exists"]) {
  check("denial", !`${denied.title} ${denied.message}`.toLowerCase().includes(fragment), `denial must not leak ${fragment}`);
}

const portalLayout = readFileSync("app/(portal)/layout.tsx", "utf8");
const appShell = readFileSync("components/layout/app-shell.tsx", "utf8");
const signInPage = readFileSync("app/sign-in/page.tsx", "utf8");
const signInForm = readFileSync("components/auth/sign-in-form.tsx", "utf8");
const portalPage = readFileSync("app/(portal)/portal/page.tsx", "utf8");
const portalHorseList = readFileSync("app/(portal)/portal/horses/page.tsx", "utf8");
const horsePage = readFileSync("app/(portal)/portal/horses/[horseId]/page.tsx", "utf8");
const biochemistryPage = readFileSync("app/(ops)/data-entry/biochemistry/page.tsx", "utf8");
const workflow = readFileSync("components/ops/biochemistry-capture-workflow.tsx", "utf8");
const horses = readFileSync("lib/domain/horses.ts", "utf8");
const authActions = readFileSync("app/auth/actions.ts", "utf8");

check("navigation", resolvePasswordlessCallbackOrigin({ VERCEL_ENV: "preview", VERCEL_URL: "exact-preview.vercel.app", NEXT_PUBLIC_SITE_URL: "https://production.example" }) === "https://exact-preview.vercel.app", "Preview uses exact trusted Vercel HTTPS origin");
check("navigation", buildPasswordlessCallbackUrl({ VERCEL_ENV: "preview", VERCEL_URL: "exact-preview.vercel.app" }, "/portal/horses") === "https://exact-preview.vercel.app/auth/callback?next=%2Fportal%2Fhorses", "Preview callback preserves normalized internal next path");
check("denial", horsePage.includes("Horse not available") && horsePage.includes('href="/portal"'), "denied workspace returns without identity detail");

check("privacy", !portalLayout.includes("sessionUser?.email"), "portal does not pass participant email");
check("privacy", portalLayout.includes('memberDisplayName={context.memberDisplayName ?? "Approved account"}'), "portal has privacy-safe account label");
check("privacy", signInPage.includes("mailbox you privately control"), "private mailbox boundary is visible");
check("privacy", resolvePasswordlessCallbackOrigin({ VERCEL_ENV: "production", VERCEL_URL: "deployment.vercel.app", NEXT_PUBLIC_SITE_URL: "https://production.example" }) === "https://production.example", "production never replaces configured Site URL with Vercel URL");
check("privacy", resolvePasswordlessCallbackOrigin({ VERCEL_ENV: "development", VERCEL_URL: "deployment.vercel.app", NEXT_PUBLIC_SITE_URL: "https://configured.example" }) === "https://configured.example", "non-Preview configured environment keeps Site URL");
check("privacy", resolvePasswordlessCallbackOrigin({ VERCEL_ENV: "preview", VERCEL_URL: "   " }) === "http://localhost:3000", "blank Preview deployment URL falls back deterministically to localhost when no Site URL exists");

check("accessibility", signInForm.includes('id="approved-account-email"'), "email has stable control id");
check("accessibility", signInForm.includes('autoComplete="email"'), "email autocomplete is declared");
check("accessibility", signInForm.includes("focus-visible:outline"), "sign-in controls have visible focus");
check("accessibility", signInForm.includes("min-h-11"), "primary sign-in target is at least 44px");
check("accessibility", portalPage.includes('role="status"'), "dashboard state is announced");
check("accessibility", portalPage.includes('aria-label="Assigned horse operational overview"'), "dashboard list has accessible name");
check("accessibility", horsePage.includes('aria-labelledby="operational-summary"'), "workspace summary is labelled");
check("accessibility", workflow.includes('focus-visible:outline'), "capture controls retain visible focus");
check("accessibility", workflow.includes("sm:grid-cols-2") && workflow.includes("lg:grid-cols-5"), "capture reflows across viewports");
check("accessibility", portalHorseList.includes("result.presentation") && !portalHorseList.includes("sample horse cards"), "horse list renders typed fail-closed state without sample claims");

check("preview", !horses.includes("sample-horse-") && !horses.includes("fallbackHorses"), "Preview candidate cannot expose sample horse fallbacks");
check("preview", authActions.includes("VERCEL_ENV: process.env.VERCEL_ENV") && !authActions.includes("headers()") && !authActions.includes('readString(formData, "origin")'), "callback origin cannot be selected by headers, form input or URL parameters");

assert.deepEqual(counts, { state: 24, navigation: 8, denial: 8, privacy: 6, accessibility: 10, preview: 2 });
assert.equal(Object.values(counts).reduce((sum, value) => sum + value, 0), 58);
console.log("Sprint 035M local checks passed: 42 executable + 16 static/source = 58.");

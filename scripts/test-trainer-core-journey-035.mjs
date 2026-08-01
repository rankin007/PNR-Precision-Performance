import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const portal = read("app/(portal)/portal/page.tsx");
const horse = read("app/(portal)/portal/horses/[horseId]/page.tsx");
const horses = read("lib/domain/horses.ts");
const shell = read("components/layout/app-shell.tsx");
const signIn = read("components/auth/sign-in-form.tsx");
const auth = read("app/auth/actions.ts");
const counts = { visibility: 0, state: 0, navigation: 0, accessibility: 0, responsive: 0 };
const check = (group, value, message) => { assert.ok(value, message); counts[group] += 1; };

// Visibility and permission: 6.
check("visibility", horses.includes('.from("horses")'), "horse visibility remains server-query based");
check("visibility", horses.includes('createSupabaseServerClient()'), "horse reads use the authenticated server client");
check("visibility", !horses.includes("fallbackHorses") && !horses.includes("fallbackHorseDetails"), "unconfigured service exposes no sample horses");
check("visibility", portal.includes("Assigned horse operational overview"), "dashboard labels the bounded assigned-horse collection");
check("visibility", horse.includes("No horse, stable, assignment, or workflow details can be shown"), "denial wording leaks no record detail");
check("visibility", horse.includes('hasAppPermission(context, "horse.records.write")'), "horse action composition retains write permission input");

// State and action: 6.
check("state", portal.includes("No horses are currently assigned to this account"), "zero-horse state is explicit");
check("state", portal.includes("Assigned-horse information is unavailable right now"), "load failure differs from empty");
check("state", portal.includes("No missing information has been treated as complete or normal"), "dashboard fails closed");
check("state", horse.includes("Workspace unavailable") && horse.includes("Horse not available"), "workspace failure and denied horse states are explicit");
check("state", horse.includes("Latest result unavailable. No missing value is treated as normal or complete"), "missing biochemistry fails closed");
check("state", horse.includes("result.horse.operational.nextAction.href"), "next action comes from the existing typed derivation");

// Navigation and session: 4.
check("navigation", (horse.match(/href="\/portal"/g) ?? []).length >= 2, "workspace provides dashboard return paths");
check("navigation", auth.includes('redirect("/sign-in")'), "sign-out returns to repeat sign-in");
check("navigation", auth.includes("supabase.auth.signOut()"), "sign-out retains server session clearing");
check("navigation", auth.includes("signInWithOtp") && !auth.includes("signInWithPassword"), "sign-in remains passwordless");

// Accessibility: 4.
check("accessibility", signIn.includes('htmlFor="approved-account-email"') && signIn.includes('id="approved-account-email"'), "email label is explicitly associated");
check("accessibility", signIn.includes("required") && signIn.includes('autoComplete="email"'), "email input exposes expected semantics");
check("accessibility", shell.includes("aria-label={`${area} navigation`}"), "shared shell navigation has an accessible name");
check("accessibility", [signIn, shell, horse].every((source) => source.includes("focus-visible:outline")), "interactive journey surfaces expose visible focus");

// Responsive and content: 4.
check("responsive", portal.includes("md:flex-row") && portal.includes("md:grid-cols-3"), "dashboard retains phone-first larger-viewport enhancement");
check("responsive", horse.includes("lg:grid-cols") && horse.includes("md:grid-cols-3"), "workspace retains phone-first larger-viewport enhancement");
check("responsive", shell.includes("md:grid-cols-[260px_minmax(0,1fr)]"), "shared shell uses bounded responsive columns");
check("responsive", horse.includes("does not indicate clinical urgency, diagnosis, treatment, supplementation, or race readiness"), "workspace language remains operational and non-clinical");

assert.deepEqual(counts, { visibility: 6, state: 6, navigation: 4, accessibility: 4, responsive: 4 });
console.log(`Sprint 035 trainer journey assertions passed: ${Object.values(counts).reduce((sum, value) => sum + value, 0)} (6+6+4+4+4).`);

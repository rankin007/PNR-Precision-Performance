export type TrainerJourneyState = "ready" | "empty" | "incomplete" | "completed" | "unavailable" | "failed" | "denied" | "revoked";

export type TrainerJourneyPresentation = {
  state: TrainerJourneyState;
  title: string;
  message: string;
  action: { label: string; href: string } | null;
};

export type CallbackOriginEnvironment = {
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
};

export function resolvePasswordlessCallbackOrigin(environment: CallbackOriginEnvironment) {
  const deploymentHost = environment.VERCEL_URL?.trim() ?? "";
  const validDeploymentHost = /^[a-z0-9.-]+(?::\d+)?$/i.test(deploymentHost);
  if (environment.VERCEL_ENV === "preview" && validDeploymentHost) {
    return `https://${deploymentHost}`;
  }

  return environment.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

export function buildPasswordlessCallbackUrl(environment: CallbackOriginEnvironment, nextPath: string) {
  return `${resolvePasswordlessCallbackOrigin(environment)}/auth/callback?next=${encodeURIComponent(nextPath)}`;
}

export function composeHorseAccessPresentation(input: { envReady: boolean; queryFailed?: boolean; horseCount: number }): TrainerJourneyPresentation {
  if (!input.envReady) return { state: "unavailable", title: "Assigned horses unavailable", message: "The secure horse service is not configured in this environment.", action: null };
  if (input.queryFailed) return { state: "failed", title: "Assigned horses could not be loaded", message: "The assigned-horse list is unavailable. No missing record is treated as ready or complete.", action: null };
  if (input.horseCount === 0) return { state: "empty", title: "No assigned horses available", message: "No horses are currently available to this approved account.", action: null };
  return { state: "ready", title: input.horseCount === 1 ? "Assigned horse ready" : "Assigned horses ready", message: input.horseCount === 1 ? "One assigned horse is available for this account." : `${input.horseCount} assigned horses are available in alphabetical order.`, action: { label: "Review assigned horses", href: "/portal" } };
}

export function composeHorseWorkspacePresentation(input: { horseAvailable: boolean; canWrite: boolean; horseId: string; workflowStatus?: "scored" | "blocked" | "unscored" | null; latestTestId?: string | null }): TrainerJourneyPresentation {
  if (!input.horseAvailable) return { state: "denied", title: "Horse workspace unavailable", message: "This workspace is not available for the current account.", action: { label: "Return to dashboard", href: "/portal" } };
  if (!input.workflowStatus) return { state: "unavailable", title: "Biochemistry record unavailable", message: "No biochemistry record is available. This is not treated as normal or complete.", action: input.canWrite ? { label: "Capture biochemistry", href: `/data-entry/biochemistry?horse=${encodeURIComponent(input.horseId)}` } : { label: "Return to dashboard", href: "/portal" } };
  if (input.workflowStatus !== "scored") return { state: "incomplete", title: "Biochemistry record incomplete", message: `The latest record is ${input.workflowStatus} and needs operational review.`, action: input.canWrite && input.latestTestId ? { label: "Review biochemistry record", href: `/data-entry/biochemistry/${input.latestTestId}` } : { label: "Return to dashboard", href: "/portal" } };
  return { state: "completed", title: "Biochemistry record completed", message: "The latest workflow record is stored under its recorded authority versions.", action: input.canWrite ? { label: "Capture biochemistry", href: `/data-entry/biochemistry?horse=${encodeURIComponent(input.horseId)}` } : { label: "Return to dashboard", href: "/portal" } };
}

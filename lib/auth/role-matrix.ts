export const OPERATIONAL_ROLES = [
  "administrator",
  "trainer",
  "stable_manager",
  "veterinarian",
  "consultant",
  "stable_hand",
] as const;

export type OperationalRole = (typeof OPERATIONAL_ROLES)[number];

export function isOperationalRole(value: unknown): value is OperationalRole {
  return typeof value === "string" && OPERATIONAL_ROLES.includes(value as OperationalRole);
}

export function canRoleComment(role: OperationalRole | null, hasHorseAccess: boolean) {
  return Boolean(role && hasHorseAccess);
}

export function canRoleEditHorse(role: OperationalRole | null, hasManagedHorseScope: boolean) {
  return Boolean(
    hasManagedHorseScope &&
      (role === "administrator" || role === "trainer" || role === "stable_manager"),
  );
}

export function canManageComment(input: {
  role: OperationalRole | null;
  currentUserId: string | null;
  authorUserId: string | null;
  hasHorseAccess: boolean;
}) {
  return input.role === "administrator" || Boolean(
    input.currentUserId &&
      input.currentUserId === input.authorUserId &&
      canRoleComment(input.role, input.hasHorseAccess),
  );
}

export function validateCommentText(value: string) {
  const text = value.trim();
  return text.length >= 1 && text.length <= 2000
    ? { ok: true as const, text }
    : { ok: false as const, error: "comment-length" as const };
}

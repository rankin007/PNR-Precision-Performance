export type BootstrapIdentityInput = {
  authUserId: string;
  email: string | null;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export type BootstrapPersistence = {
  ensureUser(input: BootstrapIdentityInput): Promise<string>;
  ensureProfile(input: BootstrapIdentityInput & { appUserId: string }): Promise<void>;
};

export async function bootstrapAuthenticatedUserWithPersistence(
  input: BootstrapIdentityInput,
  persistence: BootstrapPersistence,
) {
  const appUserId = await persistence.ensureUser(input);
  await persistence.ensureProfile({ ...input, appUserId });
  return { bootstrapped: true as const, appUserId };
}

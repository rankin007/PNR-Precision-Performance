import assert from "node:assert/strict";
import { bootstrapAuthenticatedUserWithPersistence } from "../lib/auth/bootstrap-concurrency.ts";

const users = new Map();
const profiles = new Map();
let nextUser = 1;

const persistence = {
  async ensureUser(input) {
    await Promise.resolve();
    if (!users.has(input.authUserId)) users.set(input.authUserId, `app-${nextUser++}`);
    return users.get(input.authUserId);
  },
  async ensureProfile(input) {
    await Promise.resolve();
    if (!profiles.has(input.appUserId)) profiles.set(input.appUserId, { active: true });
  },
};

const input = {
  authUserId: "00000000-0000-4000-8000-000000000035",
  email: "synthetic+035f@example.invalid",
};

const results = await Promise.all(Array.from({ length: 8 }, () =>
  bootstrapAuthenticatedUserWithPersistence(input, persistence)));

assert.equal(users.size, 1, "concurrent bootstrap must create one application user");
assert.equal(profiles.size, 1, "concurrent bootstrap must create one profile");
assert.equal(new Set(results.map((result) => result.appUserId)).size, 1);
assert.ok(results.every((result) => result.bootstrapped));

console.log(JSON.stringify({
  state: "pass",
  checks: ["concurrent-user-idempotence", "concurrent-profile-idempotence", "stable-bootstrap-result"],
}));

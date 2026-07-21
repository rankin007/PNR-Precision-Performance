import assert from "node:assert/strict";
import {
  canManageComment,
  canRoleComment,
  canRoleEditHorse,
  isOperationalRole,
  validateCommentText,
} from "../lib/auth/role-matrix.ts";

for (const role of ["administrator","trainer","stable_manager","veterinarian","consultant","stable_hand"]) {
  assert.equal(isOperationalRole(role), true);
  assert.equal(canRoleComment(role, true), true);
}
assert.equal(isOperationalRole("owner"), false);
assert.equal(canRoleComment(null, true), false);
assert.equal(canRoleEditHorse("administrator", true), true);
assert.equal(canRoleEditHorse("trainer", true), true);
assert.equal(canRoleEditHorse("stable_manager", true), true);
assert.equal(canRoleEditHorse("veterinarian", true), false);
assert.equal(canRoleEditHorse("consultant", true), false);
assert.equal(canRoleEditHorse("stable_hand", true), false);
assert.equal(canManageComment({role:"trainer",currentUserId:"a",authorUserId:"a",hasHorseAccess:true}), true);
assert.equal(canManageComment({role:"trainer",currentUserId:"a",authorUserId:"b",hasHorseAccess:true}), false);
assert.equal(canManageComment({role:"administrator",currentUserId:"a",authorUserId:"b",hasHorseAccess:true}), true);
assert.equal(validateCommentText("x").ok, true);
assert.equal(validateCommentText("x".repeat(2000)).ok, true);
assert.equal(validateCommentText("x".repeat(2001)).ok, false);
assert.equal(validateCommentText("   ").ok, false);
console.log("Sprint 021 focused role/comment tests passed.");

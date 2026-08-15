import assert from "node:assert/strict";
import {
  canManageComment,
  canRoleComment,
  canRoleEditHorse,
  isOperationalRole,
  validateCommentText,
} from "../lib/auth/role-matrix.ts";

let assertions = 0;
function equal(actual, expected) {
  assertions += 1;
  assert.equal(actual, expected);
}

for (const role of ["administrator","trainer","stable_manager","veterinarian","consultant","stable_hand"]) {
  equal(isOperationalRole(role), true);
  equal(canRoleComment(role, true), true);
}
equal(isOperationalRole("owner"), false);
equal(canRoleComment(null, true), false);
equal(canRoleEditHorse("administrator", true), true);
equal(canRoleEditHorse("trainer", true), true);
equal(canRoleEditHorse("stable_manager", true), true);
equal(canRoleEditHorse("veterinarian", true), false);
equal(canRoleEditHorse("consultant", true), false);
equal(canRoleEditHorse("stable_hand", true), false);
equal(canManageComment({role:"trainer",currentUserId:"a",authorUserId:"a",hasHorseAccess:true}), true);
equal(canManageComment({role:"trainer",currentUserId:"a",authorUserId:"b",hasHorseAccess:true}), false);
equal(canManageComment({role:"administrator",currentUserId:"a",authorUserId:"b",hasHorseAccess:true}), true);
equal(validateCommentText("x").ok, true);
equal(validateCommentText("x".repeat(2000)).ok, true);
equal(validateCommentText("x".repeat(2001)).ok, false);
equal(validateCommentText("   ").ok, false);
console.log(`Sprint 021 focused role/comment assertions passed: ${assertions}/27.`);

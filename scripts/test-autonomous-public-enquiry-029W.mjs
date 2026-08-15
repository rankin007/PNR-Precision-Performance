import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

let assertions = 0;
function check(value, message) {
  assertions += 1;
  if (!value) throw new Error(message);
}

const branch = execFileSync("git", ["branch", "--show-current"], { encoding: "utf8" }).trim();
const head = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
check(branch === "codex/029W-vercel-inventory-projection-and-final-readiness-attempt", "branch exact");
check(head === "d822c027c58ad88ec7472e35986e7a33d6a3d6c9", "head exact");

const controller = readFileSync("scripts/PreflightAuth029W.ps1", "utf8");
const projector = readFileSync("scripts/vercel-deployment-inventory-projection-029W.mjs", "utf8");
const projectorHash = createHash("sha256").update(projector).digest("hex");
check(controller.includes("$expectedBranch = 'codex/029W-vercel-inventory-projection-and-final-readiness-attempt'"), "controller branch lock");
check(controller.includes("$expectedHead = 'd822c027c58ad88ec7472e35986e7a33d6a3d6c9'"), "controller head lock");
check(controller.includes("$inventoryProjectorSha = '" + projectorHash + "'"), "projector hash lock");
check(!controller.includes("@('list'"), "raw list absent from PowerShell");
check(controller.includes("function Invoke-InventoryProjectorPage"), "isolated projector invocation");
check(controller.includes("'scripts/vercel-deployment-inventory-projection-029W.mjs','--mode'"), "fixed projector path");
check(controller.includes("'owned'}else{'full'"), "fixed projector modes");
check(controller.includes("INVENTORY_PROJECTION_VERSION_REFUSED"), "version refusal");
check(controller.includes("projectionVersion -ne 1"), "version exact");
check(controller.includes("AllowedFields @('deploymentHost','stateClass','targetClass','createdAt')"), "closed row fields");
check(controller.includes("function Test-StrictDeploymentHostname"), "strict hostname validator");
check(controller.includes("function Get-OwnedDeploymentProjectionByHost"), "hostname inspect function");
check(controller.includes("@('inspect',$DeploymentReference,'--format','json','--no-color')"), "hostname inspect vector");
check(controller.includes("RequiredFields @('id','name','url','target','readyState','aliases')"), "explicit alias evidence required");
check(controller.includes("$result.Json.id -notmatch '^dpl_[A-Za-z0-9]+$'"), "canonical id recovery");
check(controller.includes("$projection.MetadataClass -ne 'exact-029W'"), "metadata ownership check");
check(controller.includes("$projection.SourceClass -ne 'exact-canonical'"), "source ownership check");
check(controller.includes("$projection.AliasCount -ne 0"), "candidate alias isolation");
check(controller.includes("$preIds = @($PreInventory.Rows | ForEach-Object { $_.DeploymentHost })"), "pre inventory hostname identity");
check(controller.includes("$postIds = @($postInventory.Rows | ForEach-Object { $_.DeploymentHost })"), "post inventory hostname identity");
check(controller.includes("$added[0] -cne $direct.Host"), "direct envelope hostname reconciliation");
check(controller.includes("Remove-ExactOwnedDeployment -DeploymentId"), "inspected id cleanup");
check(controller.includes("--skip-domain"), "skip-domain deploy only");
check(!controller.includes("'alias','add'") && !controller.includes("'alias','rm'"), "no alias mutation vector");
check(!controller.includes("env','add','PUBLIC_ENQUIRY_SUBMISSION_ENABLED"), "no activation vector");
check(controller.includes("publicGateAttemptCount") && controller.includes("readinessAttemptCount") && controller.includes("expiryAttemptCount"), "three request ceilings");
check(controller.includes("$Record.phase -cne $ExpectedPhase -or $Record.$CounterName -ne 0) { throw 'ATTEMPT_CEILING_REFUSED' }"), "attempt ceiling enforced");
check(controller.includes("Invoke-OriginBoundRequest"), "origin binding preserved");
check(controller.includes("Complete-OwnedEnvironmentCleanup"), "environment compensation preserved");
check(controller.includes("$ownedNames = @($dedicatedNames + $temporaryNames)"), "seven-row ownership set");

check(projector.includes("export const RAW_STDOUT_LIMIT=4194304"), "raw output ceiling");
check(projector.includes("EXPECTED_VERCEL_VERSION=\"50.42.0\""), "cli version pin");
check(projector.includes("8376a6d957c6fe20a9a1d4738000eb60a519bd079c70f0a82c9e7b59ba9ee367"), "list source pin");
check(projector.includes("opaque(r,\"creator\");opaque(r,\"meta\")"), "protected containers opaque");
check(!projector.includes("Object.keys(r.creator)") && !projector.includes("Object.keys(r.meta)"), "protected containers not enumerated");
check(projector.includes("return {projectionVersion:1,rows,pagination:{count,next,prev}}"), "closed versioned projection");
check(projector.includes("mode===\"owned\"?[\"list\",\"--meta\",\"pp_sprint=029W\""), "owned list isolated in child");
check(projector.includes("raw.fill(0)"), "raw buffer cleared");
check(projector.includes("for(let restartCount=0;restartCount<=1"), "one restart ceiling");
check(projector.includes("p<PAGE_LIMIT") && projector.includes("rows.length>=ROW_LIMIT"), "page and row ceilings");

const selfTestText = execFileSync("powershell.exe", [
  "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "scripts/PreflightAuth029W.ps1", "-Operation", "SelfTest",
], { encoding: "utf8" }).trim();
const selfTest = JSON.parse(selfTestText);
check(selfTest.controller === "029W", "self-test controller");
check(selfTest.operation === "self-test" && selfTest.state === "pass", "self-test pass");
check(selfTest.lostArgsCount === 0 && selfTest.runnerResidue === 0, "process boundary residue");
check(selfTest.activationRowCount === 0 && selfTest.genericProductionIncludingCount === 5, "environment invariants");
check(selfTest.aliasInventoryFixtureCount === 5 && selfTest.aliasTruncationRefusalCount === 1, "alias invariants");
check(selfTest.paginationFixturePassCount === 1 && selfTest.paginationRefusalCount === 2, "projection fixtures");
check(selfTest.headPaginationDriftRefusalCount === 1 && selfTest.headRestartPassCount === 1, "full-page head drift behavior");
check(selfTest.walkCeilingRefusalCount === 3, "cursor page and row ceilings");
check(selfTest.activeStateFixtureCount === 3, "active state blocking fixture");
check(selfTest.ownershipFixturePassCount === 1 && selfTest.ownershipMismatchRefusalCount === 10, "hostname inspect ownership behavior");
check(selfTest.originMismatchRequestCount === 0 && selfTest.originMismatchBearerExposureCount === 0, "origin mismatch zero exposure");
check(selfTest.agentEnvelopeFixturePassCount === 1 && selfTest.agentEnvelopeRefusalCount === 7, "deploy envelope closed");

if (assertions !== 54) throw new Error("Sprint 029W guarded controller assertion target changed: " + assertions + "/54");
console.log("Sprint 029W guarded controller tests passed (" + assertions + "/" + assertions + ").");

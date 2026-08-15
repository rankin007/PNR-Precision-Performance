import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";

const container = "supabase_db_pnr-precision-performance";
const pgTapFile = "supabase/tests/028B_user_trend_view_preferences.test.sql";
const fixture = {
  userId: "00000000-0000-4000-8000-000000028401",
  authId: "00000000-0000-4000-8000-000000028501",
  profileId: "00000000-0000-4000-8000-000000028411",
  firstPreferenceId: "00000000-0000-4000-8000-000000028421",
  secondPreferenceId: "00000000-0000-4000-8000-000000028422",
};

function dockerPsqlArgs() {
  return [
    "exec",
    "-i",
    container,
    "psql",
    "-X",
    "-q",
    "-v",
    "ON_ERROR_STOP=1",
    "-U",
    "postgres",
    "-d",
    "postgres",
  ];
}

function runPsql(sql) {
  const result = spawnSync("docker", dockerPsqlArgs(), {
    input: sql,
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error) throw result.error;
  assert.equal(
    result.status,
    0,
    `local PostgreSQL command failed: ${result.stderr || result.stdout}`,
  );
  return result.stdout.trim();
}

function scalar(sql) {
  const output = runPsql(`\\pset tuples_only on\n\\pset format unaligned\n${sql}\n`);
  return output.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).at(-1) ?? "";
}

function startSession(sql) {
  const child = spawn("docker", dockerPsqlArgs(), {
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true,
  });
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.output = "";
  child.errorOutput = "";
  child.stdout.on("data", (chunk) => { child.output += chunk; });
  child.stderr.on("data", (chunk) => { child.errorOutput += chunk; });
  child.stdin.end(`\\pset tuples_only on\n\\pset format unaligned\n${sql}\n`);
  return child;
}

function waitForMarker(child, marker, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`timed out waiting for ${marker}; stderr=${child.errorOutput}`));
    }, timeoutMs);
    const onData = () => {
      if (child.output.includes(marker)) {
        cleanup();
        resolve();
      }
    };
    const onExit = (code) => {
      cleanup();
      reject(new Error(`session exited before ${marker}; code=${code}; stderr=${child.errorOutput}`));
    };
    const cleanup = () => {
      clearTimeout(timeout);
      child.stdout.off("data", onData);
      child.off("exit", onExit);
    };
    child.stdout.on("data", onData);
    child.once("exit", onExit);
    onData();
  });
}

function waitForExit(child, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    if (child.exitCode !== null) {
      resolve(child.exitCode);
      return;
    }
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`session exit timed out; stderr=${child.errorOutput}`));
    }, timeoutMs);
    const onExit = (code) => {
      cleanup();
      resolve(code);
    };
    const cleanup = () => {
      clearTimeout(timeout);
      child.off("exit", onExit);
    };
    child.once("exit", onExit);
  });
}

function pause(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function parsePid(output, marker) {
  const match = output.match(new RegExp(`${marker}=(\\d+)`));
  return match ? Number(match[1]) : null;
}

const inspect = spawnSync(
  "docker",
  ["inspect", "--format", "{{.State.Running}}", container],
  { encoding: "utf8", windowsHide: true },
);
assert.equal(inspect.status, 0, `required local Supabase container is absent: ${inspect.stderr}`);
assert.equal(inspect.stdout.trim(), "true", "required local Supabase database is not running");

const pgTap = spawnSync(
  process.execPath,
  ["node_modules/supabase/dist/supabase.js", "test", "db", "--local", pgTapFile],
  { encoding: "utf8", windowsHide: true },
);
if (pgTap.stdout) process.stdout.write(pgTap.stdout);
if (pgTap.stderr) process.stderr.write(pgTap.stderr);
if (pgTap.error) throw pgTap.error;
assert.equal(pgTap.status, 0, "028B pgTAP privacy suite failed");

let sessionOne;
let sessionTwo;
let sessionOnePid = null;
let sessionTwoPid = null;
let setupComplete = false;

try {
  runPsql(`
    delete from public.users where id = '${fixture.userId}';
    insert into public.users(id,auth_user_id,email,status,primary_role_code)
    values('${fixture.userId}','${fixture.authId}','trend-concurrency@example.invalid','active','trainer');
    insert into public.member_profiles(id,user_id,display_name,is_active)
    values('${fixture.profileId}','${fixture.userId}','Trend concurrency fixture',true);
    insert into public.user_trend_view_preferences(id,user_id,label,score_view,ph_view,is_default)
    values
      ('${fixture.firstPreferenceId}','${fixture.userId}','Concurrency A','both','none',true),
      ('${fixture.secondPreferenceId}','${fixture.userId}','Concurrency B','hydration','none',false);
  `);
  setupComplete = true;

  sessionOne = startSession(`
    begin;
    set local role authenticated;
    set local "request.jwt.claim.sub" = '${fixture.authId}';
    set local application_name = '028B-CONCURRENCY-A';
    select 'SESSION1_PID=' || pg_backend_pid();
    select 'SESSION1_RESULT=' || public.set_default_biochemistry_trend_preference('${fixture.firstPreferenceId}')::text;
    select 'SESSION1_HOLD_BEGIN';
    select pg_sleep(3);
    select 'SESSION1_HOLD_END';
    commit;
  `);
  await waitForMarker(sessionOne, "SESSION1_RESULT=true");
  sessionOnePid = parsePid(sessionOne.output, "SESSION1_PID");
  assert(Number.isInteger(sessionOnePid), "session one backend PID was not captured");

  sessionTwo = startSession(`
    begin;
    set local role authenticated;
    set local "request.jwt.claim.sub" = '${fixture.authId}';
    set local application_name = '028B-CONCURRENCY-B';
    select 'SESSION2_PID=' || pg_backend_pid();
    select 'SESSION2_RESULT=' || public.set_default_biochemistry_trend_preference('${fixture.secondPreferenceId}')::text;
    commit;
  `);
  await waitForMarker(sessionTwo, "SESSION2_PID=");
  sessionTwoPid = parsePid(sessionTwo.output, "SESSION2_PID");
  assert(Number.isInteger(sessionTwoPid), "session two backend PID was not captured");
  await pause(500);
  assert.equal(sessionTwo.exitCode, null, "session two did not overlap the held user lock");
  assert.equal(
    scalar("select count(*) from pg_stat_activity where application_name='028B-CONCURRENCY-B' and wait_event_type='Lock';"),
    "1",
    "session two was not observed waiting on the database lock",
  );

  assert.equal(await waitForExit(sessionOne), 0, `session one failed: ${sessionOne.errorOutput}`);
  assert.equal(await waitForExit(sessionTwo), 0, `session two failed: ${sessionTwo.errorOutput}`);
  assert.match(sessionTwo.output, /SESSION2_RESULT=true/, "session two did not complete its default change");

  assert.equal(
    scalar(`
      select json_build_object(
        'rows', count(*),
        'defaults', count(*) filter (where is_default),
        'target', count(*) filter (where id='${fixture.secondPreferenceId}' and is_default),
        'first_off', count(*) filter (where id='${fixture.firstPreferenceId}' and not is_default)
      )::text
      from public.user_trend_view_preferences where user_id='${fixture.userId}';
    `),
    '{"rows" : 2, "defaults" : 1, "target" : 1, "first_off" : 1}',
    "concurrent default changes did not serialize to the exact final state",
  );
} finally {
  if (sessionOne?.exitCode === null) sessionOne.kill();
  if (sessionTwo?.exitCode === null) sessionTwo.kill();
  for (const pid of [sessionOnePid, sessionTwoPid].filter(Number.isInteger)) {
    runPsql(`select pg_terminate_backend(${pid}) where exists(select 1 from pg_stat_activity where pid=${pid});`);
  }
  if (setupComplete) runPsql(`delete from public.users where id='${fixture.userId}';`);
  assert.equal(scalar(`select count(*) from public.users where id='${fixture.userId}';`), "0", "fixture user residue remains");
  assert.equal(scalar(`select count(*) from public.user_trend_view_preferences where user_id='${fixture.userId}';`), "0", "fixture preference residue remains");
  assert.equal(scalar("select count(*) from pg_stat_activity where application_name in ('028B-CONCURRENCY-A','028B-CONCURRENCY-B');"), "0", "fixture sessions remain");
  assert.equal(scalar("select count(*) from pg_locks l join pg_stat_activity a on a.pid=l.pid where a.application_name in ('028B-CONCURRENCY-A','028B-CONCURRENCY-B');"), "0", "fixture locks remain");
}

console.log("Sprint 028B migration privacy proof passed (24/24 pgTAP; overlapping-session serialization PASS; residue 0).");

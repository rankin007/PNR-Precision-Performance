import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const extensions = /\.(?:md|json|tsx?|jsx?|mjs|cjs|sql|ps1|ya?ml|toml|css)$/i;
const excluded = /^(?:\.release-main|\.claude|\.next|build|node_modules|\.validation-logs|\.logs|supabase\/\.temp(?:-old-link)?)(?:\/|$)|^planning\/reviews\/021M-supabase-support-escalation\.md$/;
const suspicious = /\uFFFD|\u00C2[\u0080-\u00BF]|\u00C3[\u0080-\u00BF]|\u00E2\u20AC|\u00CE[\u0080-\u00BF]/u;

function gitPaths(args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error("unable to enumerate maintained files");
  return result.stdout.split(/\r?\n/).filter(Boolean);
}

const paths = [...new Set([
  ...gitPaths(["ls-files"]),
  ...gitPaths(["ls-files", "--others", "--exclude-standard"]),
])].filter((path) => extensions.test(path) && !excluded.test(path.replaceAll("\\", "/")));

const failures = [];
const decoder = new TextDecoder("utf-8", { fatal: true });
for (const path of paths) {
  try {
    const bytes = await readFile(path);
    const text = decoder.decode(bytes);
    if (suspicious.test(text)) failures.push(`${path}: suspicious mojibake sequence`);
  } catch (error) {
    failures.push(`${path}: ${error instanceof TypeError ? "invalid UTF-8" : "unreadable"}`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`ENCODING_FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Encoding validation passed: ${paths.length} maintained text file(s).`);
}

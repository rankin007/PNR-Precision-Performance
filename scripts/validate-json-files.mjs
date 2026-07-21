import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

function sanitizeMessage(error) {
  if (error instanceof SyntaxError) return "invalid JSON syntax";
  if (error && typeof error === "object" && "code" in error) {
    if (error.code === "ENOENT") return "file not found";
    if (error.code === "EACCES" || error.code === "EPERM") return "file unreadable";
  }
  return "file unreadable";
}

export async function validateJsonFiles(paths) {
  if (paths.length === 0) {
    throw new Error("no JSON paths supplied");
  }

  for (const path of paths) {
    try {
      const source = await readFile(path, "utf8");
      JSON.parse(source.startsWith("\uFEFF") ? source.slice(1) : source);
    } catch (error) {
      const failure = new Error(`${path}: ${sanitizeMessage(error)}`);
      failure.cause = error;
      throw failure;
    }
  }

  return paths.length;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  try {
    const count = await validateJsonFiles(process.argv.slice(2));
    console.log(`JSON validation passed: ${count} file(s).`);
  } catch (error) {
    console.error(`JSON validation failed: ${error.message}`);
    process.exitCode = 1;
  }
}

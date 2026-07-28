#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports -- Preserve this intentional CommonJS CLI contract.
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports -- Preserve this intentional CommonJS CLI contract.
const path = require("path");

const DELIMITER = "============================================================";
const PROTECTED_FILES = new Set([
  "CLAUDE.md",
  "CODEX.md",
  ".gitignore",
  "src/README.md",
  "tests/README.md",
  "scripts/README.md",
  "samples/README.md",
  "references/README.md",
]);

function usage() {
  console.error([
    "Usage: node scripts/apply-architect-pack.js path/to/architect-pack.md [options]",
    "",
    "Options:",
    "  --dry-run   Show what would change without writing files.",
    "  --check     Validate pack formatting and file targets only.",
    "  --diff      Show changed file content as a simple line diff.",
    "  --backup    Save backups of overwritten files under .120x/backups/.",
    "  --yes       With --dry-run, run the preview and then apply in one command.",
  ].join("\n"));
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function normalizeProjectPath(filePath) {
  if (!filePath || filePath.trim() !== filePath) {
    fail(`Invalid FILE path: "${filePath}"`);
  }

  if (path.isAbsolute(filePath)) {
    fail(`Absolute paths are not allowed: ${filePath}`);
  }

  const normalized = path.posix.normalize(filePath.replace(/\\/g, "/"));

  if (normalized === "." || normalized.startsWith("../") || normalized === "..") {
    fail(`Paths outside the project root are not allowed: ${filePath}`);
  }

  if (PROTECTED_FILES.has(normalized)) {
    fail(`Protected file cannot be overwritten by an Architect Pack: ${normalized}`);
  }

  return normalized;
}

function parseArchitectPack(content) {
  const lines = content.split(/\r?\n/);
  const sections = [];
  let i = 0;

  while (i < lines.length) {
    if (lines[i] !== DELIMITER) {
      i += 1;
      continue;
    }

    const header = lines[i + 1] || "";
    const closing = lines[i + 2] || "";
    const match = header.match(/^FILE: (.+)$/);

    if (!match || closing !== DELIMITER) {
      fail(`Malformed FILE section near line ${i + 1}`);
    }

    const filePath = normalizeProjectPath(match[1]);
    i += 3;

    if (lines[i] === "") {
      i += 1;
    }

    const body = [];
    while (i < lines.length && lines[i] !== DELIMITER) {
      body.push(lines[i]);
      i += 1;
    }

    sections.push({
      filePath,
      content: body.join("\n").replace(/\n*$/, "\n"),
    });
  }

  return sections;
}

function parseArgs(args) {
  const flags = new Set(["--dry-run", "--check", "--diff", "--backup", "--yes"]);
  const options = {
    dryRun: false,
    check: false,
    diff: false,
    backup: false,
    yes: false,
  };
  const packArgs = [];

  for (const arg of args) {
    if (flags.has(arg)) {
      options[arg.slice(2).replace(/-([a-z])/g, (_, value) => value.toUpperCase())] = true;
    } else if (arg.startsWith("--")) {
      fail(`Unknown option: ${arg}`);
    } else {
      packArgs.push(arg);
    }
  }

  if (packArgs.length !== 1) {
    usage();
    process.exit(1);
  }

  if (options.check && (options.dryRun || options.yes || options.backup)) {
    fail("--check cannot be combined with --dry-run, --yes, or --backup.");
  }

  if (options.yes && !options.dryRun) {
    fail("--yes is only meaningful with --dry-run.");
  }

  return { packArg: packArgs[0], options };
}

function validateSections(sections, projectRoot) {
  if (sections.length === 0) {
    fail("No FILE sections found.");
  }

  const seen = new Set();
  for (const section of sections) {
    if (seen.has(section.filePath)) {
      fail(`Duplicate FILE section: ${section.filePath}`);
    }
    seen.add(section.filePath);

    const targetPath = path.resolve(projectRoot, section.filePath);
    const relativeCheck = path.relative(projectRoot, targetPath);

    if (relativeCheck.startsWith("..") || path.isAbsolute(relativeCheck)) {
      fail(`Resolved path escapes project root: ${section.filePath}`);
    }
  }
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function createBackup(projectRoot, filePath, targetPath, backupStamp) {
  const backupPath = path.resolve(projectRoot, ".120x", "backups", backupStamp, filePath);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.copyFileSync(targetPath, backupPath);
  return path.relative(projectRoot, backupPath).replace(/\\/g, "/");
}

function simpleLineDiff(oldText, newText) {
  const oldLines = oldText.split(/\r?\n/);
  const newLines = newText.split(/\r?\n/);
  const max = Math.max(oldLines.length, newLines.length);
  const output = [];

  for (let i = 0; i < max; i += 1) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    if (oldLine === newLine) {
      continue;
    }

    output.push(`@@ line ${i + 1} @@`);
    if (oldLine !== undefined) {
      output.push(`- ${oldLine}`);
    }
    if (newLine !== undefined) {
      output.push(`+ ${newLine}`);
    }
  }

  return output.join("\n");
}

function planChanges(sections, projectRoot) {
  return sections.map((section) => {
    const targetPath = path.resolve(projectRoot, section.filePath);
    const exists = fs.existsSync(targetPath);
    const oldContent = exists ? fs.readFileSync(targetPath, "utf8") : "";
    const changed = !exists || oldContent !== section.content;

    return {
      ...section,
      targetPath,
      exists,
      changed,
      oldContent,
      action: exists ? "updated" : "created",
    };
  });
}

function printResults(changes, mode, showDiff) {
  console.log(mode);
  for (const change of changes) {
    const suffix = change.changed ? "" : " (unchanged)";
    console.log(`- ${change.action}: ${change.filePath}${suffix}`);

    if (showDiff && change.changed) {
      if (!change.exists) {
        console.log("  Diff: new file");
        console.log(change.content.split(/\r?\n/).map((line) => `+ ${line}`).join("\n"));
      } else {
        const diff = simpleLineDiff(change.oldContent, change.content);
        console.log(diff || "  Diff: no line-level changes");
      }
    }
  }
}

function writeChanges(changes, options, projectRoot) {
  const backupStamp = options.backup ? timestamp() : null;
  const backups = [];

  for (const change of changes) {
    if (change.exists && change.changed && options.backup) {
      backups.push(createBackup(projectRoot, change.filePath, change.targetPath, backupStamp));
    }

    if (change.changed) {
      fs.mkdirSync(path.dirname(change.targetPath), { recursive: true });
      fs.writeFileSync(change.targetPath, change.content, "utf8");
    }
  }

  if (backups.length > 0) {
    console.log("Backups written:");
    for (const backup of backups) {
      console.log(`- ${backup}`);
    }
  }
}

function main() {
  const { packArg, options } = parseArgs(process.argv.slice(2));
  const packPath = path.resolve(process.cwd(), packArg);

  if (!fs.existsSync(packPath)) {
    fail(`Architect Pack not found: ${packArg}`);
  }

  const projectRoot = path.resolve(__dirname, "..");
  const packContent = fs.readFileSync(packPath, "utf8");
  const sections = parseArchitectPack(packContent);
  validateSections(sections, projectRoot);
  const changes = planChanges(sections, projectRoot);

  if (options.check) {
    console.log(`Check passed: ${sections.length} FILE section(s) valid.`);
    return;
  }

  if (options.dryRun) {
    printResults(changes, "Dry run: no files written.", options.diff);

    if (!options.yes) {
      return;
    }

    console.log("--yes supplied: applying after dry-run preview.");
  }

  writeChanges(changes, options, projectRoot);
  printResults(changes, "Architect Pack applied.", !options.dryRun && options.diff);
}

main();

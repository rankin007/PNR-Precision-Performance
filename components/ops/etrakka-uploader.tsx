"use client";

import { useEffect, useState } from "react";
import {
  importEtrakkaSessions,
  importEtrakkaSessionsFromUrl,
  type EtrakkaBatchImportResult,
  type EtrakkaImportPayload,
  type EtrakkaSessionCategory,
} from "@/lib/actions/etrakka";

type ImportMessage = {
  text: string;
  type: "error" | "success";
};

type ImportRow = Record<string, string>;

const NUMERIC_FIELDS = [
  "bt200",
  "bt400",
  "bt600",
  "bt800",
  "bt1000",
  "200",
  "400",
  "600",
  "800",
  "1000",
  "hr max",
  "hr 45",
  "trot mean hr",
  "canter mean hr",
  "gallop mean hr",
  "vmax",
  "v200",
  "mj",
  "sl 50",
  "gallop>60kph",
  "secs>60kph",
  "secstohrdrop",
  "secs to hr drop",
  "48kgap secs",
  "48k gap secs",
  "avghr2_5min",
  "avghr2_5m",
  "gallop metres",
  "intervals",
  "sessions",
];

function normalizeHeader(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function parseCsvLine(line: string) {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

function parseDelimitedRows(text: string) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => parseCsvLine(line));
}

function parseHtmlTableRows(text: string) {
  const rows = Array.from(text.matchAll(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/gi));

  return rows
    .map((rowMatch) => {
      const cells = Array.from(rowMatch[1].matchAll(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi));
      return cells.map((cellMatch) =>
        decodeHtmlEntities(cellMatch[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
      );
    })
    .filter((row) => row.length > 0);
}

function parseTabularRows(text: string) {
  if (/<table[\s>]/i.test(text) || /<tr[\s>]/i.test(text)) {
    return parseHtmlTableRows(text);
  }

  return parseDelimitedRows(text);
}

function getTableHeaderIndex(rows: string[][]) {
  return rows.findIndex((row) => {
    const headers = row.map((cell) => normalizeHeader(cell));
    return headers.includes("track name") && (headers.includes("session type") || headers.includes("start time"));
  });
}

function parseNumeric(value: string | null) {
  if (!value) return null;
  const sanitized = value.replace(/[^0-9.\-]/g, "");
  if (!sanitized) return null;
  const parsed = Number.parseFloat(sanitized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseInteger(value: string | null) {
  const parsed = parseNumeric(value);
  return parsed === null ? null : Math.round(parsed);
}

function parseDateTime(dateStr: string, timeStr: string) {
  try {
    const cleanDate = dateStr.replace(/^[a-zA-Z]+,\s*/, "").trim();
    const raw = `${cleanDate} ${timeStr}`.trim();
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function detectFileFormat(fileName: string) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".xls") || lower.endsWith(".xlsx")) return "xls";
  if (lower.endsWith(".txt")) return "txt";
  return "csv";
}

function extractViewSessionKey(value: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/sessionkey=([^'">]+)/i);
  return match?.[1] ?? null;
}

function classifySessionCategory(rowType: string | null, sessionType: string | null): EtrakkaSessionCategory {
  const normalized = `${rowType || ""} ${sessionType || ""}`.toLowerCase();
  if (normalized.includes("trial")) return "trial";
  if (normalized.includes("race")) return "race";
  if (normalized.includes("view")) return "view";
  if (normalized.trim().length > 0) return "session";
  return "unknown";
}

function buildRowMap(headers: string[], row: string[]) {
  const mapped: ImportRow = {};

  headers.forEach((header, index) => {
    mapped[header] = row[index]?.trim() ?? "";
  });

  return mapped;
}

function getFirstValue(row: ImportRow, aliases: string[]) {
  for (const alias of aliases) {
    const exact = row[alias];
    if (exact) return exact;

    const partialKey = Object.keys(row).find((key) => key === alias || key.includes(alias));
    if (partialKey && row[partialKey]) return row[partialKey];
  }

  return null;
}

function extractGpsSummary(row: ImportRow) {
  const gpsSummary = {
    distance: getFirstValue(row, ["distance", "gallop metres"]),
    vmax: getFirstValue(row, ["vmax"]),
    strideLength: getFirstValue(row, ["sl 50"]),
  };

  return Object.values(gpsSummary).some(Boolean) ? gpsSummary : null;
}

function extractEcgSummary(row: ImportRow) {
  const ecgSummary = {
    hrMax: getFirstValue(row, ["hr max"]),
    hr45: getFirstValue(row, ["hr 45"]),
    avgHr2_5min: getFirstValue(row, ["avghr2_5min", "avghr2_5m"]),
  };

  return Object.values(ecgSummary).some(Boolean) ? ecgSummary : null;
}

function buildPayloadFromRow(row: ImportRow, horseId: string, fileName: string): EtrakkaImportPayload | null {
  const sessionDateRaw = getFirstValue(row, ["date", "session date"]);
  const sessionTimeRaw = getFirstValue(row, ["start time", "start"]);
  const rowType = getFirstValue(row, ["view", "type"]);
  const sessionType = getFirstValue(row, ["session type", "type"]) || "";
  const viewValue = getFirstValue(row, ["view"]);

  if (!sessionDateRaw && !sessionTimeRaw && !getFirstValue(row, ["track name", "track", "note"])) {
    return null;
  }

  return {
    horseId,
    sessionDateIso: parseDateTime(sessionDateRaw || new Date().toDateString(), sessionTimeRaw || "12:00"),
    sessionDayLabel: getFirstValue(row, ["day"]),
    sessionStartTimeText: sessionTimeRaw || null,
    trainerName: getFirstValue(row, ["trainer"]),
    riderName: getFirstValue(row, ["rider"]) || "",
    trackName: getFirstValue(row, ["track name", "track"]) || "",
    etrakkaDevice: getFirstValue(row, ["blanket", "unit"]) || "",
    sessionType,
    sessionCategory: classifySessionCategory(rowType, sessionType),
    sourceRowType: rowType,
    sourceViewHtml: viewValue,
    sourceFileName: fileName,
    sourceFileFormat: detectFileFormat(fileName),
    sourceUrl: getFirstValue(row, ["url"]),
    sourceSessionKey: extractViewSessionKey(viewValue),
    sourceHorseCode: getFirstValue(row, ["horseid", "horse id"]),
    intervalCount: parseInteger(getFirstValue(row, ["intervals"])),
    sessionCount: parseInteger(getFirstValue(row, ["sessions"])),
    bt200: parseNumeric(getFirstValue(row, ["bt200"])),
    bt400: parseNumeric(getFirstValue(row, ["bt400"])),
    bt600: parseNumeric(getFirstValue(row, ["bt600"])),
    bt800: parseNumeric(getFirstValue(row, ["bt800"])),
    bt1000: parseNumeric(getFirstValue(row, ["bt1000"])),
    s200: parseNumeric(getFirstValue(row, ["200"])),
    s400: parseNumeric(getFirstValue(row, ["400"])),
    s600: parseNumeric(getFirstValue(row, ["600"])),
    s800: parseNumeric(getFirstValue(row, ["800"])),
    s1000: parseNumeric(getFirstValue(row, ["1000"])),
    hrMaxBpm: parseNumeric(getFirstValue(row, ["hr max"])),
    hr45: parseNumeric(getFirstValue(row, ["hr 45"])),
    trotMeanHrBpm: parseNumeric(getFirstValue(row, ["trot mean hr"])),
    canterMeanHrBpm: parseNumeric(getFirstValue(row, ["canter mean hr"])),
    gallopMeanHrBpm: parseNumeric(getFirstValue(row, ["gallop mean hr"])),
    vmaxKph: parseNumeric(getFirstValue(row, ["vmax"])),
    v200: parseNumeric(getFirstValue(row, ["v200"])),
    mj: parseNumeric(getFirstValue(row, ["mj"])),
    sl50: parseNumeric(getFirstValue(row, ["sl 50"])),
    gallopOver60kph: parseNumeric(getFirstValue(row, ["gallop>60kph"])),
    secsOver60kph: parseNumeric(getFirstValue(row, ["secs>60kph"])),
    secsToHrDrop: parseNumeric(getFirstValue(row, ["secstohrdrop", "secs to hr drop"])),
    gap48kSecs: parseNumeric(getFirstValue(row, ["48kgap secs", "48k gap secs"])),
    recoveryAvgHr2_5minBpm: parseNumeric(getFirstValue(row, ["avghr2_5min", "avghr2_5m"])),
    gallopMetres: parseNumeric(getFirstValue(row, ["gallop metres", "distance"])),
    gpsSummary: extractGpsSummary(row),
    gpsTrack: null,
    ecgSummary: extractEcgSummary(row),
    ecgTrace: null,
    rawPayload: row,
    sourceHeaderLabels: null,
    sourceRowValues: null,
    sourceRowNumber: null,
    note: getFirstValue(row, ["note"]),
  };
}

function parseMultiRowTablePayloads(rows: string[][], horseId: string, fileName: string) {
  const headerIndex = getTableHeaderIndex(rows);
  if (headerIndex === -1) return [];

  const headerLabels = rows[headerIndex].map((cell) => cell.trim());
  const headers = headerLabels.map((cell) => normalizeHeader(cell));

  return rows
    .slice(headerIndex + 1)
    .filter((row) => row.some((cell) => cell.trim().length > 0))
    .map((row, index): EtrakkaImportPayload | null => {
      const payload = buildPayloadFromRow(buildRowMap(headers, row), horseId, fileName);

      if (!payload) {
        return null;
      }

      return {
        ...payload,
        sourceHeaderLabels: headerLabels,
        sourceRowValues: row,
        sourceRowNumber: index + 1,
      } satisfies EtrakkaImportPayload;
    })
    .filter((payload): payload is EtrakkaImportPayload => Boolean(payload));
}

function parseSingleSessionPayload(text: string, horseId: string, fileName: string) {
  const rows = parseDelimitedRows(text);
  const data: ImportRow = {};

  rows.forEach((row) => {
    if (row.length < 2) return;
    const key = normalizeHeader(row[0]);
    const value = row[1]?.trim() ?? "";
    data[key] = value;
  });

  NUMERIC_FIELDS.forEach((field) => {
    if (!(field in data)) return;
    data[field] = data[field].trim();
  });

  const payload = buildPayloadFromRow(data, horseId, fileName);
  return payload
    ? [
        {
          ...payload,
          sourceRowNumber: 1,
        },
      ]
    : [];
}

function parseEtrakkaFile(text: string, horseId: string, fileName: string) {
  const rows = parseTabularRows(text);
  const multiRowPayloads = parseMultiRowTablePayloads(rows, horseId, fileName);
  if (multiRowPayloads.length > 0) return multiRowPayloads;
  return parseSingleSessionPayload(text, horseId, fileName);
}

function buildResultMessage(result: EtrakkaBatchImportResult, horseName: string, totalRows: number): ImportMessage {
  const summary = [
    `Imported ${result.importedCount} session${result.importedCount === 1 ? "" : "s"}`,
    result.duplicateCount > 0 ? `skipped ${result.duplicateCount} duplicate${result.duplicateCount === 1 ? "" : "s"}` : null,
    result.failedCount > 0 ? `${result.failedCount} failed` : null,
    totalRows > 0 ? `from ${totalRows} parsed row${totalRows === 1 ? "" : "s"}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  if (result.importedCount === 0 && result.failedCount > 0) {
    return {
      type: "error",
      text: `${summary} for ${horseName}. ${result.errors[0] || "Please review the file format."}`,
    };
  }

  const detail = result.errors[0] ? ` First issue: ${result.errors[0]}` : "";
  return {
    type: result.failedCount > 0 ? "error" : "success",
    text: `${summary} for ${horseName}.${detail}`,
  };
}

export function EtrakkaUploader({ horseId, horseName }: { horseId: string; horseName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [sessionUrl, setSessionUrl] = useState("");
  const [message, setMessage] = useState<ImportMessage | null>(null);

  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash === "#etrakka-import") {
        setIsOpen(true);
      }
    };

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const parseAndImportFile = async (file: File) => {
    setSelectedFileName(file.name);
    setLoading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const payloads = parseEtrakkaFile(text, horseId, file.name);

      if (payloads.length === 0) {
        setMessage({
          text: "No E-Trakka session rows were found in this file. Please use a supported export.",
          type: "error",
        });
        return;
      }

      const result = await importEtrakkaSessions(payloads);
      setMessage(buildResultMessage(result, horseName, payloads.length));
    } catch (error: unknown) {
      console.error(error);
      setMessage({
        text: "Error parsing the file. Please ensure it is a valid E-Trakka CSV, TXT, or session-summary export.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const importFromUrl = async () => {
    const trimmedUrl = sessionUrl.trim();
    if (!trimmedUrl) {
      setMessage({
        text: "Paste an E-Trakka session URL before starting the import.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setSelectedFileName("");
    setMessage(null);

    try {
      const result = await importEtrakkaSessionsFromUrl({
        horseId,
        sourceUrl: trimmedUrl,
      });

      setMessage(buildResultMessage(result, horseName, result.importedCount + result.duplicateCount + result.failedCount));
    } catch (error: unknown) {
      console.error(error);
      setMessage({
        text: "That E-Trakka page could not be imported. Try a CSV export or a read-only session link.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await parseAndImportFile(file);
    event.target.value = "";
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-teal-300 bg-gradient-to-br from-teal-50 via-white to-[#f7efe3] px-6 py-8 text-center shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Performance Import</p>
        <h3 className="mt-3 font-display text-3xl text-ink">Import E-Trakka</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">
          Open the dedicated import panel for a cleaner upload flow, better mobile handling, and faster CSV processing locked to {horseName}.
        </p>
        <div className="mt-5 rounded-2xl border border-teal-200 bg-white/80 px-4 py-3 text-sm text-ink shadow-sm">
          You can now upload an export file or paste a readable E-Trakka session URL from the import panel.
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-6 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          Open Import Panel
        </button>
        <p className="mt-3 text-xs text-steel">Supports `.csv`, `.txt`, and session-summary `.xls` exports from E-Trakka.</p>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-sand/95 backdrop-blur-sm sm:p-6">
          <div className="flex min-h-full w-full flex-1 flex-col bg-white sm:mx-auto sm:min-h-0 sm:max-w-5xl sm:rounded-[2rem] sm:shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-white/95 px-6 py-4 backdrop-blur sm:rounded-t-[2rem]">
              <div>
                <p className="eyebrow text-teal-600">Performance Import</p>
                <h2 className="mt-1 font-display text-2xl text-ink">E-Trakka Upload</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
                aria-label="Close E-Trakka upload modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid flex-1 gap-6 overflow-y-auto p-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-6">
                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Import Target</p>
                  <div className="mt-4 rounded-2xl border border-ink/10 bg-white px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Horse</p>
                    <p className="mt-2 text-2xl font-display text-ink">{horseName}</p>
                    <p className="mt-2 text-sm text-steel">All parsed performance data will be attached directly to this horse record.</p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">What&apos;s Improved</p>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">Multi-row CSV files now import every session row in one pass</div>
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">View, Race, and Trial rows are classified separately in the saved session model</div>
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">Future GPS and ECG placeholders are prepared in the session record</div>
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">Import summary now shows imported, duplicate, and failed row counts</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-[1.75rem] border-2 border-teal-500/20 bg-teal-50/10 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Upload File</p>
                  <label
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDragActive(true);
                    }}
                    onDragLeave={() => setIsDragActive(false)}
                    onDrop={(event) => {
                      event.preventDefault();
                      setIsDragActive(false);
                      const file = event.dataTransfer.files?.[0];
                      if (file && !loading) {
                        void parseAndImportFile(file);
                      }
                    }}
                    className={`mt-5 flex min-h-[18rem] cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed px-6 py-8 text-center transition ${
                      isDragActive
                        ? "border-teal-500 bg-teal-50"
                        : "border-slate-300 bg-white hover:border-teal-400 hover:bg-slate-50"
                    } ${loading ? "pointer-events-none opacity-70" : ""}`}
                  >
                    <div className="rounded-full bg-teal-100 p-4 text-teal-700">
                      <svg className="h-8 w-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    </div>
                    <p className="mt-5 text-base font-semibold text-ink">
                      {loading ? "Parsing and importing file..." : "Click to upload or drag and drop"}
                    </p>
                    <p className="mt-2 text-sm text-steel">Use an E-Trakka CSV, TXT, or session-summary export with track, split, heart-rate, and recovery fields.</p>
                    <p className="mt-4 rounded-full bg-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                      {selectedFileName || "No file selected yet"}
                    </p>
                    <input type="file" className="hidden" accept=".csv,.txt,.xls,.xlsx" onChange={handleFileUpload} disabled={loading} />
                  </label>
                </div>

                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Paste Session URL</p>
                  <p className="mt-3 text-sm leading-6 text-steel">
                    Paste a readable E-Trakka session page link here. Login-gated Trainer Centre URLs will be rejected unless they expose a public read-only session page.
                  </p>
                  <div className="mt-4 grid gap-3">
                    <input
                      type="url"
                      value={sessionUrl}
                      onChange={(event) => setSessionUrl(event.target.value)}
                      placeholder="https://e-trakka.com/SessionDetails.aspx?sessionkey=..."
                      className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal-500"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => void importFromUrl()}
                      disabled={loading}
                      className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f1720] disabled:cursor-not-allowed disabled:bg-steel"
                    >
                      {loading ? "Importing..." : "Import From URL"}
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-4 text-sm font-medium text-teal-800">
                    <svg className="h-5 w-5 animate-spin text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Importing performance sessions into the horse workspace.
                  </div>
                ) : null}

                {message ? (
                  <div
                    className={`rounded-2xl border px-4 py-4 text-sm font-medium ${
                      message.type === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-teal-200 bg-teal-50 text-teal-700"
                    }`}
                  >
                    {message.text}
                  </div>
                ) : null}

                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Import Notes</p>
                  <div className="mt-4 grid gap-3 text-sm text-steel">
                    <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3">Multi-row CSV exports now import each session row instead of only the first one.</p>
                    <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3">View, Race, and Trial row types are separated into their own session category field.</p>
                    <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3">Recovery and workload fields like MJ, seconds-to-drop, and 48K gap seconds are saved with the session.</p>
                    <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3">GPS and ECG placeholders are ready for richer future E-Trakka export formats.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-ink/10 bg-white/95 px-6 py-4 backdrop-blur sm:rounded-b-[2rem]">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
                >
                  Close Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

import type {
  EtrakkaBatchImportResult,
  EtrakkaImportPayload,
  EtrakkaSessionCategory,
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
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return "html";
  return "csv";
}

function extractViewLinkParts(value: string | null, fallbackSourceUrl?: string) {
  if (!value) {
    return {
      sourceViewHtml: null,
      sourceUrl: fallbackSourceUrl ?? null,
      sourceSessionKey: null,
    };
  }

  const hrefMatch = value.match(/href=['"]([^'"]+)['"]/i);
  const rawHref = hrefMatch?.[1]?.trim() ?? "";

  let resolvedUrl = fallbackSourceUrl ?? null;
  let sourceSessionKey: string | null = null;

  if (rawHref) {
    try {
      const base = fallbackSourceUrl ? new URL(fallbackSourceUrl) : new URL("https://e-trakka.com/");
      const absolute = new URL(rawHref, base);
      resolvedUrl = absolute.toString();
      sourceSessionKey = absolute.searchParams.get("sessionkey");
    } catch {
      resolvedUrl = fallbackSourceUrl ?? rawHref;
    }
  } else if (fallbackSourceUrl) {
    try {
      sourceSessionKey = new URL(fallbackSourceUrl).searchParams.get("sessionkey");
    } catch {
      sourceSessionKey = null;
    }
  }

  return {
    sourceViewHtml: value,
    sourceUrl: resolvedUrl,
    sourceSessionKey,
  };
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

function buildPayloadFromRow(
  row: ImportRow,
  horseId: string,
  fileName: string,
  fallbackSourceUrl?: string,
  sourceHeaderLabels?: string[] | null,
  sourceRowValues?: string[] | null,
  sourceRowNumber?: number | null,
): EtrakkaImportPayload | null {
  const sessionDateRaw = getFirstValue(row, ["date", "session date"]);
  const sessionTimeRaw = getFirstValue(row, ["start time", "start"]);
  const rowType = getFirstValue(row, ["view", "type"]);
  const sessionType = getFirstValue(row, ["session type", "type"]) || "";
  const viewLink = extractViewLinkParts(getFirstValue(row, ["view"]), fallbackSourceUrl);

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
    sourceViewHtml: viewLink.sourceViewHtml,
    sourceFileName: fileName,
    sourceFileFormat: detectFileFormat(fileName),
    sourceUrl: getFirstValue(row, ["url"]) || viewLink.sourceUrl,
    sourceSessionKey: viewLink.sourceSessionKey,
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
    sourceHeaderLabels: sourceHeaderLabels ?? null,
    sourceRowValues: sourceRowValues ?? null,
    sourceRowNumber: sourceRowNumber ?? null,
    note: getFirstValue(row, ["note"]),
  } satisfies EtrakkaImportPayload;
}

function parseMultiRowTablePayloads(
  rows: string[][],
  horseId: string,
  fileName: string,
  fallbackSourceUrl?: string,
): EtrakkaImportPayload[] {
  const headerIndex = getTableHeaderIndex(rows);
  if (headerIndex === -1) return [];

  const headerLabels = rows[headerIndex].map((cell) => cell.trim());
  const headers = headerLabels.map((cell) => normalizeHeader(cell));

  return rows
    .slice(headerIndex + 1)
    .filter((row) => row.some((cell) => cell.trim().length > 0))
    .map((row, index) => ({
      rowMap: buildRowMap(headers, row),
      rowValues: row,
      rowNumber: index + 1,
    }))
    .map(({ rowMap, rowValues, rowNumber }) =>
      buildPayloadFromRow(
        rowMap,
        horseId,
        fileName,
        fallbackSourceUrl,
        headerLabels,
        rowValues,
        rowNumber,
      ),
    )
    .filter((payload): payload is EtrakkaImportPayload => Boolean(payload));
}

function parseSingleSessionPayload(
  text: string,
  horseId: string,
  fileName: string,
  fallbackSourceUrl?: string,
): EtrakkaImportPayload[] {
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

  const payload = buildPayloadFromRow(data, horseId, fileName, fallbackSourceUrl, null, null, 1);
  return payload ? [payload] : [];
}

export function parseEtrakkaFile(
  text: string,
  horseId: string,
  fileName: string,
  fallbackSourceUrl?: string,
): EtrakkaImportPayload[] {
  const rows = parseTabularRows(text);
  const multiRowPayloads = parseMultiRowTablePayloads(rows, horseId, fileName, fallbackSourceUrl);
  if (multiRowPayloads.length > 0) return multiRowPayloads;
  return parseSingleSessionPayload(text, horseId, fileName, fallbackSourceUrl);
}

export function buildEtrakkaImportResultMessage(
  result: EtrakkaBatchImportResult,
  horseName: string,
  totalRows: number,
): ImportMessage {
  const summary = [
    `Imported ${result.importedCount} session${result.importedCount === 1 ? "" : "s"}`,
    result.duplicateCount > 0
      ? `skipped ${result.duplicateCount} duplicate${result.duplicateCount === 1 ? "" : "s"}`
      : null,
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

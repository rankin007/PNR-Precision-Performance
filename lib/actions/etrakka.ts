"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parseEtrakkaFile } from "@/lib/etrakka/parser";

export type EtrakkaSessionCategory = "view" | "race" | "trial" | "session" | "unknown";

export type EtrakkaImportPayload = {
  horseId: string;
  sessionDateIso: string;
  sessionDayLabel: string | null;
  sessionStartTimeText: string | null;
  trainerName: string | null;
  riderName: string;
  trackName: string;
  etrakkaDevice: string;
  sessionType: string;
  sessionCategory: EtrakkaSessionCategory;
  sourceRowType: string | null;
  sourceViewHtml: string | null;
  sourceFileName: string | null;
  sourceFileFormat: string | null;
  sourceUrl: string | null;
  sourceSessionKey: string | null;
  sourceHorseCode: string | null;
  intervalCount: number | null;
  sessionCount: number | null;
  bt200: number | null;
  bt400: number | null;
  bt600: number | null;
  bt800: number | null;
  bt1000: number | null;
  s200: number | null;
  s400: number | null;
  s600: number | null;
  s800: number | null;
  s1000: number | null;
  hrMaxBpm: number | null;
  hr45: number | null;
  trotMeanHrBpm: number | null;
  canterMeanHrBpm: number | null;
  gallopMeanHrBpm: number | null;
  vmaxKph: number | null;
  v200: number | null;
  mj: number | null;
  sl50: number | null;
  gallopOver60kph: number | null;
  secsOver60kph: number | null;
  secsToHrDrop: number | null;
  gap48kSecs: number | null;
  recoveryAvgHr2_5minBpm: number | null;
  gallopMetres: number | null;
  gpsSummary: Record<string, unknown> | null;
  gpsTrack: Record<string, unknown> | null;
  ecgSummary: Record<string, unknown> | null;
  ecgTrace: Record<string, unknown> | null;
  rawPayload: Record<string, unknown>;
  note: string | null;
};

type EtrakkaImportResult = {
  success: boolean;
  error?: string;
};

export type EtrakkaBatchImportResult = {
  success: boolean;
  importedCount: number;
  duplicateCount: number;
  failedCount: number;
  errors: string[];
};

function isAllowedEtrakkaUrl(value: string) {
  try {
    const parsed = new URL(value);
    return (
      parsed.protocol === "https:" &&
      ["e-trakka.com", "www.e-trakka.com", "demo.e-trakka.com"].includes(parsed.hostname)
    );
  } catch {
    return false;
  }
}

function buildInsertRecord(payload: EtrakkaImportPayload) {
  return {
    horse_id: payload.horseId,
    session_date: payload.sessionDateIso,
    session_day_label: payload.sessionDayLabel,
    session_start_time_text: payload.sessionStartTimeText,
    trainer_name: payload.trainerName,
    rider: payload.riderName || null,
    track_name: payload.trackName || null,
    blanket: payload.etrakkaDevice || null,
    session_type: payload.sessionType || null,
    session_category: payload.sessionCategory,
    source_row_type: payload.sourceRowType || null,
    source_view_html: payload.sourceViewHtml || null,
    source_file_name: payload.sourceFileName || null,
    source_file_format: payload.sourceFileFormat || null,
    source_url: payload.sourceUrl || null,
    source_session_key: payload.sourceSessionKey || null,
    source_horse_code: payload.sourceHorseCode || null,
    interval_count: payload.intervalCount,
    session_count: payload.sessionCount,
    bt200: payload.bt200,
    bt400: payload.bt400,
    bt600: payload.bt600,
    bt800: payload.bt800,
    bt1000: payload.bt1000,
    s200: payload.s200,
    s400: payload.s400,
    s600: payload.s600,
    s800: payload.s800,
    s1000: payload.s1000,
    hr_max: payload.hrMaxBpm,
    hr_45: payload.hr45,
    trot_mean_hr: payload.trotMeanHrBpm,
    canter_mean_hr: payload.canterMeanHrBpm,
    gallop_mean_hr: payload.gallopMeanHrBpm,
    vmax: payload.vmaxKph,
    v200: payload.v200,
    mj: payload.mj,
    sl_50: payload.sl50,
    gallop_over_60kph: payload.gallopOver60kph,
    secs_over_60kph: payload.secsOver60kph,
    secs_to_hr_drop: payload.secsToHrDrop,
    gap_48k_secs: payload.gap48kSecs,
    avg_hr_2_5min: payload.recoveryAvgHr2_5minBpm,
    gallop_metres: payload.gallopMetres,
    gps_summary: payload.gpsSummary,
    gps_track: payload.gpsTrack,
    ecg_summary: payload.ecgSummary,
    ecg_trace: payload.ecgTrace,
    raw_payload: payload.rawPayload,
    note: payload.note || null,
  };
}

const CSV_ALIGNMENT_COLUMNS = [
  "session_day_label",
  "session_start_time_text",
  "trainer_name",
  "source_view_html",
  "source_session_key",
] as const;

function removeCsvAlignmentColumns(record: ReturnType<typeof buildInsertRecord>) {
  const fallbackRecord = { ...record };

  for (const column of CSV_ALIGNMENT_COLUMNS) {
    delete fallbackRecord[column];
  }

  return fallbackRecord;
}

function isMissingCsvAlignmentColumnError(errorMessage: string) {
  return CSV_ALIGNMENT_COLUMNS.some((column) => errorMessage.includes(column));
}

async function insertSingleEtrakkaSession(payload: EtrakkaImportPayload): Promise<EtrakkaImportResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const insertRecord = buildInsertRecord(payload);

    const { error: insertError } = await supabase
      .from("etrakka_sessions")
      .insert(insertRecord);

    if (insertError) {
      console.error("Insert error:", insertError.message);

      if (isMissingCsvAlignmentColumnError(insertError.message)) {
        const { error: fallbackInsertError } = await supabase
          .from("etrakka_sessions")
          .insert(removeCsvAlignmentColumns(insertRecord));

        if (!fallbackInsertError) {
          return { success: true };
        }

        console.error("Fallback insert error:", fallbackInsertError.message);
        return { success: false, error: fallbackInsertError.message };
      }

      if (insertError.code === "23505") {
        return { success: false, error: "duplicate" };
      }

      return { success: false, error: insertError.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
    return { success: false, error: errorMsg };
  }
}

export async function importEtrakkaSession(payload: EtrakkaImportPayload) {
  const result = await insertSingleEtrakkaSession(payload);

  if (result.success) {
    return { success: true };
  }

  if (result.error === "duplicate") {
    return { success: false, error: "This eTrakka session has already been imported for this horse on this date." };
  }

  return { success: false, error: "Database rejected the file: " + result.error };
}

export async function importEtrakkaSessions(payloads: EtrakkaImportPayload[]): Promise<EtrakkaBatchImportResult> {
  const summary: EtrakkaBatchImportResult = {
    success: true,
    importedCount: 0,
    duplicateCount: 0,
    failedCount: 0,
    errors: [],
  };

  for (const payload of payloads) {
    const result = await insertSingleEtrakkaSession(payload);

    if (result.success) {
      summary.importedCount += 1;
      continue;
    }

    if (result.error === "duplicate") {
      summary.duplicateCount += 1;
      continue;
    }

    summary.failedCount += 1;
    summary.errors.push(
      `${payload.trackName || "Unknown track"} ${payload.sessionDateIso}: ${result.error || "Unknown error"}`,
    );
  }

  summary.success = summary.importedCount > 0 && summary.failedCount === 0;

  return summary;
}

export async function importEtrakkaSessionsFromUrl(args: {
  horseId: string;
  sourceUrl: string;
}): Promise<EtrakkaBatchImportResult> {
  const sourceUrl = args.sourceUrl.trim();

  if (!args.horseId || !sourceUrl) {
    return {
      success: false,
      importedCount: 0,
      duplicateCount: 0,
      failedCount: 1,
      errors: ["Horse and E-Trakka URL are required."],
    };
  }

  if (!isAllowedEtrakkaUrl(sourceUrl)) {
    return {
      success: false,
      importedCount: 0,
      duplicateCount: 0,
      failedCount: 1,
      errors: ["Only HTTPS E-Trakka session URLs are supported."],
    };
  }

  try {
    const response = await fetch(sourceUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "user-agent": "PrecisionPerformance/1.0 (+https://precisionperformance.com.au)",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        importedCount: 0,
        duplicateCount: 0,
        failedCount: 1,
        errors: [`E-Trakka returned HTTP ${response.status}.`],
      };
    }

    const text = await response.text();
    const normalized = text.toLowerCase();
    if (
      normalized.includes("log in to the e-trakka trainer centre") ||
      (normalized.includes("please enter your username and password") && normalized.includes("user name"))
    ) {
      return {
        success: false,
        importedCount: 0,
        duplicateCount: 0,
        failedCount: 1,
        errors: ["That URL is behind the E-Trakka login wall. Export the session to CSV first, or use a read-only session link."],
      };
    }

    const fileName = new URL(sourceUrl).pathname.split("/").pop() || "session-details.html";
    const payloads = parseEtrakkaFile(text, args.horseId, fileName, sourceUrl);

    if (payloads.length === 0) {
      return {
        success: false,
        importedCount: 0,
        duplicateCount: 0,
        failedCount: 1,
        errors: ["No session rows could be parsed from that E-Trakka page."],
      };
    }

    return importEtrakkaSessions(payloads);
  } catch (error: unknown) {
    return {
      success: false,
      importedCount: 0,
      duplicateCount: 0,
      failedCount: 1,
      errors: [error instanceof Error ? error.message : "Unable to fetch the E-Trakka page."],
    };
  }
}

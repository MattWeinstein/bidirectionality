import {
  AZ_ZIP_CENTROIDS,
  type SymptomReport,
  type SymptomSeverity,
  type ZipCentroid,
} from "@/types/symptom-report";
import { SYMPTOM_CODES, type SymptomCode } from "@/types/symptom-catalog";

// Deterministic synthetic data. Same seed → same dataset every run, so the
// map looks stable across reloads and screenshots stay reproducible. Swap
// out for live data once the reporting feature ships — call sites should
// only need to swap the import.

const SEED = 0xc0ffee;
const TOTAL_REPORTS = 300;
const TIME_WINDOW_DAYS = 30;

// Codes a person would actually pick when reporting — everything in the
// catalog except the contradictory "no symptoms" option.
const REPORTABLE_SYMPTOMS: SymptomCode[] = SYMPTOM_CODES.filter((c) => c !== "no_symptoms");

// Mulberry32 — small, fast, deterministic PRNG. Plenty for synthetic data.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted<T>(rand: () => number, items: ReadonlyArray<[T, number]>): T {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [item, w] of items) {
    r -= w;
    if (r <= 0) return item;
  }
  return items[items.length - 1][0];
}

function pickSymptoms(rand: () => number): SymptomCode[] {
  // 1-3 symptoms per report.
  const count = pickWeighted(rand, [
    [1, 5],
    [2, 4],
    [3, 2],
  ]);
  const pool = [...REPORTABLE_SYMPTOMS];
  const picked: SymptomCode[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(rand() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

function pickSeverity(rand: () => number): SymptomSeverity {
  return pickWeighted<SymptomSeverity>(rand, [
    ["mild", 70],
    ["moderate", 25],
    ["severe", 5],
  ]);
}

// Weights make the map look like real surveillance — Phoenix and Tucson
// have most reports, smaller suburbs have fewer. Roughly proportional to
// population, but tuned by hand for visual readability.
const ZIP_WEIGHT_OVERRIDES: Record<string, number> = {
  "85003": 3,
  "85008": 4,
  "85013": 3,
  "85021": 3,
  "85032": 3,
  "85201": 3,
  "85251": 3,
  "85281": 3,
  "85701": 3,
  "85705": 3,
  "85716": 3,
  "85719": 3,
};

function weightFor(z: ZipCentroid): number {
  return ZIP_WEIGHT_OVERRIDES[z.zip] ?? 1.5;
}

export function generateSymptomReports(
  total: number = TOTAL_REPORTS,
  windowDays: number = TIME_WINDOW_DAYS,
): SymptomReport[] {
  const rand = mulberry32(SEED);
  const now = Date.now();
  const windowMs = windowDays * 24 * 60 * 60 * 1000;

  const weighted: Array<[ZipCentroid, number]> = AZ_ZIP_CENTROIDS.map((z) => [z, weightFor(z)]);

  const reports: SymptomReport[] = [];
  for (let i = 0; i < total; i++) {
    const zip = pickWeighted(rand, weighted);
    // Jitter ~0.012° (~1.3 km) so points cluster around but don't stack on
    // the centroid.
    const lat = zip.lat + (rand() - 0.5) * 0.024;
    const lng = zip.lng + (rand() - 0.5) * 0.024;
    const reportedAt = new Date(now - rand() * windowMs).toISOString();

    reports.push({
      id: `rep_${i.toString().padStart(4, "0")}`,
      zip: zip.zip,
      county: zip.county,
      lat,
      lng,
      symptoms: pickSymptoms(rand),
      severity: pickSeverity(rand),
      reportedAt,
    });
  }

  return reports;
}

export interface ZipAggregate {
  zip: string;
  county: "Pima" | "Maricopa";
  label: string;
  lat: number;
  lng: number;
  count: number;
  symptomCounts: Record<SymptomCode, number>;
  severityCounts: Record<SymptomSeverity, number>;
  dominantSeverity: SymptomSeverity;
}

export function aggregateByZip(reports: SymptomReport[]): ZipAggregate[] {
  const byZip = new Map<string, ZipAggregate>();

  for (const z of AZ_ZIP_CENTROIDS) {
    byZip.set(z.zip, {
      zip: z.zip,
      county: z.county,
      label: z.label,
      lat: z.lat,
      lng: z.lng,
      count: 0,
      symptomCounts: Object.fromEntries(SYMPTOM_CODES.map((s) => [s, 0])) as Record<SymptomCode, number>,
      severityCounts: { mild: 0, moderate: 0, severe: 0 },
      dominantSeverity: "mild",
    });
  }

  for (const r of reports) {
    const agg = byZip.get(r.zip);
    if (!agg) continue;
    agg.count += 1;
    agg.severityCounts[r.severity] += 1;
    for (const s of r.symptoms) agg.symptomCounts[s] += 1;
  }

  // Dominant severity: highest weighted score (severe > moderate > mild).
  for (const agg of byZip.values()) {
    const score =
      agg.severityCounts.severe * 3 +
      agg.severityCounts.moderate * 2 +
      agg.severityCounts.mild;
    if (agg.severityCounts.severe / Math.max(agg.count, 1) >= 0.15) {
      agg.dominantSeverity = "severe";
    } else if (score / Math.max(agg.count, 1) >= 1.5) {
      agg.dominantSeverity = "moderate";
    } else {
      agg.dominantSeverity = "mild";
    }
  }

  return Array.from(byZip.values()).filter((a) => a.count > 0);
}

// Single source of truth for symptoms. Not yet wired into the reporting (map)
// or resources (decision tree) code; this file exists so the team agrees on
// the vocabulary first.
//
// This is the "Minimum Set of Key Data" surveillance standard — the same list
// the resources SymptomSelector was built from. We stay strictly on the
// standard (no local additions) for interoperability.
//
// Once adopted, both sides derive from here:
//   - reporting / map  → uses `code` (stable, typed)
//   - SymptomSelector  → renders `SYMPTOM_LABELS`
//   - classifySymptoms → uses `categoryForCode` instead of substring matching

import type { SymptomCategory } from "@/types/resource";

export interface SymptomCatalogEntry {
  code: string;
  label: string;
  category: SymptomCategory;
}

export const SYMPTOM_CATALOG = [
  // Category mappings preserve the existing classifySymptoms() behavior.
  { code: "no_symptoms", label: "No symptoms", category: "none" },
  { code: "fever", label: "Fever", category: "ili" },
  { code: "chills", label: "Chills", category: "ili" },
  { code: "cough_congestion", label: "Cough/congestion", category: "respiratory" },
  { code: "sore_throat", label: "Sore throat", category: "respiratory" },
  { code: "difficulty_breathing", label: "Difficulty breathing", category: "severe" },
  { code: "nausea_vomiting", label: "Nausea/vomiting", category: "mild" },
  { code: "diarrhea", label: "Diarrhea", category: "mild" },
  { code: "rash", label: "Rash", category: "ili" },
  { code: "red_eyes", label: "Red eyes", category: "mild" },
  { code: "body_aches", label: "Muscle or body aches and pains", category: "ili" },
  { code: "loss_smell_taste", label: "Loss of smell or taste", category: "mild" },
  // New category assignments (not in the original classifier) — confirm clinically:
  { code: "bleeding", label: "Bleeding from body openings", category: "severe" },
  { code: "bloody_urine", label: "Discolored or bloody urine", category: "severe" },
  { code: "jaundice", label: "Yellow skin/yellow eyes", category: "severe" },
] as const satisfies readonly SymptomCatalogEntry[];

export type SymptomCode = (typeof SYMPTOM_CATALOG)[number]["code"];

// Derived views — consume these instead of hand-maintaining parallel lists.
export const SYMPTOM_LABELS: string[] = SYMPTOM_CATALOG.map((s) => s.label);

export const SYMPTOM_CODES: SymptomCode[] = SYMPTOM_CATALOG.map((s) => s.code);

const BY_CODE = new Map(SYMPTOM_CATALOG.map((s) => [s.code, s]));
const BY_LABEL = new Map(SYMPTOM_CATALOG.map((s) => [s.label.toLowerCase(), s]));

export function categoryForCode(code: SymptomCode): SymptomCategory {
  return BY_CODE.get(code)!.category;
}

export function labelForCode(code: SymptomCode): string {
  return BY_CODE.get(code)!.label;
}

export function entryForLabel(label: string): SymptomCatalogEntry | undefined {
  return BY_LABEL.get(label.toLowerCase());
}

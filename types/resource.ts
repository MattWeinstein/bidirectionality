// Resource model — guidance + contacts mapped to symptom categories.
// Other teams (e.g., data-sources) supply jurisdiction-specific resources.

export type SymptomCategory =
  | "none"
  | "respiratory"
  | "mild"
  | "ili"
  | "severe"
  | "vector_encounter"
  | "animal_encounter"
  | "wildlife_illness"
  | "vector_presence";

export type ResourceType = "link" | "phone" | "action" | "surveillance";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  description: string;
  url?: string;
  phone?: string;
  // If null, assume user's current jurisdiction
  jurisdiction?: string;
}

// Decision tree input
export interface SymptomInput {
  symptoms: string[];
  jurisdiction: string;
}

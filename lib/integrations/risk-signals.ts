import type { AlertDraft } from "@/types/alert";

// Risk team owns the trigger logic — what counts as a "trend change" or an
// environmental risk threshold. They emit triggers; we convert triggers into
// auto-alerts. The seam is intentionally one-way: we don't reach into their
// model.

export interface RiskTrigger {
  id: string;
  kind: "environmental" | "trend";
  detectedAt: string;
  // Risk team populates this; we treat it as opaque metadata for now.
  evidence: Record<string, unknown>;
  // A pre-built alert draft so the risk team has full control over the
  // user-visible content. We add jurisdiction/contact at dispatch time.
  draft: Omit<AlertDraft, "contact">;
}

export interface RiskSignalSource {
  // Pull-based for now. Switch to push (webhook / event bus) once the
  // Risk team has infra for it.
  pollTriggers(since: string): Promise<RiskTrigger[]>;
}

let source: RiskSignalSource | null = null;

export function registerRiskSignalSource(impl: RiskSignalSource): void {
  source = impl;
}

export function getRiskSignalSource(): RiskSignalSource | null {
  return source;
}

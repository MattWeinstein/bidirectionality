import type { Alert, AlertDraft } from "@/types/alert";

// Query + mutation surface for alerts. Implementations are intentionally
// in-memory stubs until the DB team lands persistence — keep call sites
// thin so swapping the impl is a one-file change.

const store = new Map<string, Alert>();

export async function listAlerts(opts?: { jurisdictionId?: string }): Promise<Alert[]> {
  const all = Array.from(store.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  if (!opts?.jurisdictionId) return all;
  return all.filter((a) => a.contact.jurisdictionId === opts.jurisdictionId);
}

export async function getAlert(id: string): Promise<Alert | null> {
  return store.get(id) ?? null;
}

export async function createAlert(draft: AlertDraft): Promise<Alert> {
  const now = new Date().toISOString();
  const alert: Alert = {
    ...draft,
    id: crypto.randomUUID(),
    source: draft.source ?? "manual",
    createdAt: now,
    updatedAt: now,
  };
  store.set(alert.id, alert);
  return alert;
}

export async function updateAlert(id: string, patch: Partial<AlertDraft>): Promise<Alert | null> {
  const existing = store.get(id);
  if (!existing) return null;
  const next: Alert = {
    ...existing,
    ...patch,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };
  store.set(id, next);
  return next;
}

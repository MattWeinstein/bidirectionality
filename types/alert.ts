// Canonical Alert model — the contract every team (admin UI, auto-alert engine,
// notification dispatch, map layers) reads from and writes to. Treat changes
// here as cross-team API changes.

export type AlertSeverity = "low" | "medium" | "high";

export type AlertType = "heat" | "dust" | "cholera" | "mosquito" | "other";

export type AlertSource = "manual" | "auto";

export type AlertChannel = "sms" | "email" | "push";

export interface GeoLocation {
  zip: string;
  county: string;
  // Optional precise point. Manual alerts may only have zip+county; map-derived
  // alerts will have lat/lng.
  lat?: number;
  lng?: number;
}

export interface JurisdictionContact {
  jurisdictionId: string;
  name: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface AlertAttachment {
  url: string;
  mime: string;
  filename: string;
  sizeBytes: number;
}

export interface Alert {
  id: string;
  title: string;
  shortDescription: string;
  severity: AlertSeverity;
  type: AlertType;
  source: AlertSource;
  location: GeoLocation;
  contact: JurisdictionContact;
  attachments: AlertAttachment[];
  createdAt: string;
  updatedAt: string;
  // Set by auto-alert engine; null for manual alerts.
  triggerId?: string;
}

export type AlertDraft = Omit<Alert, "id" | "createdAt" | "updatedAt" | "source"> & {
  source?: AlertSource;
};

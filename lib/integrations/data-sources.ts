// External data feeds referenced in the BIDIRECTIONALITY doc. Each source
// gets a typed fetcher; map layers and resource recommendations consume
// these. URLs live in docs/data-sources.md — keep this file as the
// programmatic surface only.

export interface CoolingCenter {
  id: string;
  name: string;
  address: string;
  county: string;
  lat: number;
  lng: number;
  hours?: string;
  phone?: string;
  source: "pima" | "maricopa" | "azdhs" | "mag" | "az-state";
}

export interface HeatRiskZone {
  id: string;
  county: string;
  riskLevel: "low" | "moderate" | "high" | "extreme";
  geometry: GeoJSON.Polygon;
  asOf: string;
}

export interface OutbreakReport {
  id: string;
  county: string;
  disease: string;
  caseCount: number;
  deathCount: number;
  reportedAt: string;
  source: string;
}

export interface DataSourceClient {
  fetchCoolingCenters(): Promise<CoolingCenter[]>;
  fetchHeatRiskZones(): Promise<HeatRiskZone[]>;
  fetchOutbreakReports(opts?: { county?: string }): Promise<OutbreakReport[]>;
}

let client: DataSourceClient | null = null;

export function registerDataSourceClient(impl: DataSourceClient): void {
  client = impl;
}

export function getDataSourceClient(): DataSourceClient | null {
  return client;
}

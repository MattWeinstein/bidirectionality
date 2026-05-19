// Geo helpers. ZIP↔county is the cheapest, most-used lookup; the rest will
// land once the map team picks a tile/source provider.

const AZ_ZIP_TO_COUNTY: Record<string, string> = {
  // Seed values — extend or replace with a real dataset (Census ZCTA → county).
  "85001": "Maricopa",
  "85701": "Pima",
  "86001": "Coconino",
  "85501": "Gila",
};

export function countyForZip(zip: string): string | undefined {
  return AZ_ZIP_TO_COUNTY[zip];
}

export function isArizonaZip(zip: string): boolean {
  if (!/^\d{5}$/.test(zip)) return false;
  const prefix = parseInt(zip.slice(0, 3), 10);
  return prefix >= 850 && prefix <= 865;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export function pointInBox(lat: number, lng: number, box: BoundingBox): boolean {
  return lat <= box.north && lat >= box.south && lng <= box.east && lng >= box.west;
}

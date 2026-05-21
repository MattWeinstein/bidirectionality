import { NextResponse } from "next/server";
import { aggregateByZip, generateSymptomReports } from "@/lib/data/synthetic-symptoms";

// Synthetic symptom reports for the map. Deterministic (fixed seed) so the
// response is stable across requests. This is the contract consumers code
// against — swap the body for the real reporting backend when it lands and
// callers don't change.
//
//   GET /api/symptom-reports          → { reports: SymptomReport[] }
//   GET /api/symptom-reports?by=zip   → { aggregates: ZipAggregate[] }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reports = generateSymptomReports();

  if (searchParams.get("by") === "zip") {
    return NextResponse.json({ aggregates: aggregateByZip(reports) });
  }

  return NextResponse.json({ reports });
}

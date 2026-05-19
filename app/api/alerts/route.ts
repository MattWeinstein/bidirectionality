import { NextResponse } from "next/server";
import { createAlert, listAlerts } from "@/lib/alerts";
import type { AlertDraft } from "@/types/alert";

export async function GET() {
  const alerts = await listAlerts();
  return NextResponse.json({ alerts });
}

export async function POST(request: Request) {
  // TODO: replace with zod parse once we add the dep, and gate on
  // getAuthProvider().requireAdmin(request).
  const body = (await request.json()) as AlertDraft;
  const created = await createAlert(body);
  return NextResponse.json({ alert: created }, { status: 201 });
}

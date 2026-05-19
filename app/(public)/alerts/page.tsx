import { listAlerts } from "@/lib/alerts";
import { AlertBanner } from "@/components/alerts/AlertBanner";
import { AlertCard } from "@/components/alerts/AlertCard";

export default async function PublicAlertsPage() {
  const alerts = await listAlerts();
  const lead = alerts[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Active health alerts</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Manual alerts from your jurisdiction, plus auto-alerts from environmental
        and trend signals.
      </p>

      {lead && <div className="mt-6"><AlertBanner alert={lead} /></div>}

      <ul className="mt-6 space-y-3">
        {alerts.length === 0 ? (
          <li className="rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-500 dark:border-zinc-700">
            No active alerts. Admins can publish one from{" "}
            <code className="font-mono">/admin/alerts/new</code>.
          </li>
        ) : (
          alerts.map((a) => (
            <li key={a.id}>
              <AlertCard alert={a} />
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

import Link from "next/link";
import { listAlerts } from "@/lib/alerts";
import { SeverityBadge } from "@/components/alerts/SeverityBadge";

export default async function AdminAlertsPage() {
  const alerts = await listAlerts();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Alerts</h1>
        <Link
          href="/admin/alerts/new"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          New alert
        </Link>
      </div>

      <table className="mt-6 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wider text-zinc-500 dark:border-zinc-800">
            <th className="py-2 font-medium">Title</th>
            <th className="py-2 font-medium">Severity</th>
            <th className="py-2 font-medium">Type</th>
            <th className="py-2 font-medium">Location</th>
            <th className="py-2 font-medium">Source</th>
            <th className="py-2 font-medium" />
          </tr>
        </thead>
        <tbody>
          {alerts.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-zinc-500">
                No alerts yet. Create one to get started.
              </td>
            </tr>
          ) : (
            alerts.map((a) => (
              <tr key={a.id} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-3">{a.title}</td>
                <td className="py-3"><SeverityBadge severity={a.severity} /></td>
                <td className="py-3 capitalize">{a.type}</td>
                <td className="py-3">{a.location.county} · {a.location.zip}</td>
                <td className="py-3 capitalize text-zinc-500">{a.source}</td>
                <td className="py-3 text-right">
                  <Link href={`/admin/alerts/${a.id}`} className="text-sm hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}

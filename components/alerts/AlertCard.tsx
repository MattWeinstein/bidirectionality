import type { Alert } from "@/types/alert";
import { SeverityBadge } from "./SeverityBadge";

export function AlertCard({ alert }: { alert: Alert }) {
  return (
    <article className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium">{alert.title}</h3>
        <SeverityBadge severity={alert.severity} />
      </div>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {alert.shortDescription}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
        <span className="capitalize">{alert.type}</span>
        <span>·</span>
        <span>{alert.location.county} · {alert.location.zip}</span>
        <span>·</span>
        <span className="capitalize">{alert.source}</span>
      </div>
    </article>
  );
}

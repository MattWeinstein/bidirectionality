import type { Alert } from "@/types/alert";

const tone: Record<Alert["severity"], string> = {
  low: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
  medium: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40",
  high: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40",
};

export function AlertBanner({ alert }: { alert: Alert }) {
  return (
    <div className={`rounded-lg border p-4 ${tone[alert.severity]}`}>
      <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
        {alert.severity} · {alert.type}
      </div>
      <div className="mt-1 text-lg font-semibold">{alert.title}</div>
      <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
        {alert.shortDescription}
      </p>
    </div>
  );
}

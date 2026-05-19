import Link from "next/link";

const surfaces = [
  {
    group: "Public (citizen-facing)",
    items: [
      { href: "/alerts", title: "Alert feed", blurb: "Banner + list of active health alerts." },
      { href: "/map", title: "Map", blurb: "AZ heatmap, cooling centers, outbreak overlays." },
      { href: "/resources", title: "Resources", blurb: "Recommended next steps from a guided flow." },
      { href: "/preferences", title: "Preferences", blurb: "Opt-in to SMS, email, or push notifications." },
    ],
  },
  {
    group: "Admin (jurisdiction)",
    items: [
      { href: "/admin/alerts", title: "Alert list", blurb: "Manage alerts for this jurisdiction." },
      { href: "/admin/alerts/new", title: "New alert", blurb: "Create a manual alert with map-picker." },
    ],
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          One Health Surveillance · Bidirectionality
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Manual + auto health alerts for Arizona jurisdictions
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          This subteam owns the bidirectional surface: jurisdiction admins publish
          alerts, residents receive them through their preferred channel, and
          context (maps, resources) helps them act. Below are the work-in-progress
          screens — links go to live (stub) pages.
        </p>
      </header>

      {surfaces.map((s) => (
        <section key={s.group} className="mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {s.group}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {s.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-zinc-200 p-4 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              >
                <div className="font-medium">{item.title}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.blurb}
                </div>
                <div className="mt-2 font-mono text-xs text-zinc-500">{item.href}</div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <footer className="mt-12 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800">
        Integration contracts in <code className="font-mono">lib/integrations/</code>.
        Cross-team docs in <code className="font-mono">docs/</code>.
      </footer>
    </main>
  );
}

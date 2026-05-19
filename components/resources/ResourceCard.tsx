export function ResourceCard({
  title,
  blurb,
  href,
}: {
  title: string;
  blurb: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg border border-zinc-200 p-4 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
    >
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{blurb}</div>
      <div className="mt-2 truncate font-mono text-xs text-zinc-500">{href}</div>
    </a>
  );
}

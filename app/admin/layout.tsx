import Link from "next/link";
import { JurisdictionGate } from "@/components/admin/JurisdictionGate";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <JurisdictionGate>
      <div className="flex min-h-full flex-col">
        <header className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/admin/alerts" className="font-semibold">
              Admin · Bidirectionality
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/admin/alerts" className="hover:underline">Alerts</Link>
              <Link href="/admin/alerts/new" className="hover:underline">New alert</Link>
              <Link href="/" className="text-zinc-500 hover:underline">Exit</Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </JurisdictionGate>
  );
}

import { MapLoader } from "@/components/map/MapLoader";

export default function MapPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Map</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Heat risk, cooling centers, and outbreak overlays. Data sources are wired
        through <code className="font-mono">lib/integrations/data-sources.ts</code>.
      </p>
      <div className="mt-6">
        <MapLoader />
      </div>
    </main>
  );
}

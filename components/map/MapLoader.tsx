"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window` on import, so the map component is loaded client-side
// only. Next 16 requires the `ssr: false` dynamic import to live inside a
// client component — keep that wiring isolated here.
const LeafletMap = dynamic(() => import("./LeafletMap").then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] items-center justify-center rounded-lg border border-zinc-200 text-sm text-zinc-500 dark:border-zinc-800">
      Loading map…
    </div>
  ),
});

export function MapLoader() {
  return <LeafletMap />;
}

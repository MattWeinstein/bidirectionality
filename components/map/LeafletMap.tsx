"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Arizona-centered default view. Layers (cooling centers, heat zones,
// outbreaks) will be added as children pulling from
// lib/integrations/data-sources.ts.
const AZ_CENTER: [number, number] = [34.0489, -111.0937];

export function LeafletMap() {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <MapContainer
        center={AZ_CENTER}
        zoom={7}
        style={{ height: 480, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

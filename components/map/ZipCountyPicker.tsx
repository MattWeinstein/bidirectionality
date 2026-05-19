"use client";

import { useState } from "react";
import { countyForZip, isArizonaZip } from "@/lib/geo/zip-county";

export function ZipCountyPicker({
  defaultZip = "",
  onChange,
}: {
  defaultZip?: string;
  onChange?: (next: { zip: string; county: string | undefined; valid: boolean }) => void;
}) {
  const [zip, setZip] = useState(defaultZip);
  const valid = isArizonaZip(zip);
  const county = valid ? countyForZip(zip) : undefined;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">ZIP code</label>
      <input
        value={zip}
        onChange={(e) => {
          const next = e.target.value;
          setZip(next);
          onChange?.({
            zip: next,
            county: isArizonaZip(next) ? countyForZip(next) : undefined,
            valid: isArizonaZip(next),
          });
        }}
        placeholder="85001"
        className="w-32 rounded border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <div className="text-xs text-zinc-500">
        {!zip
          ? "Enter an Arizona ZIP."
          : !valid
            ? "Not a valid AZ ZIP."
            : county
              ? `County: ${county}`
              : "County lookup pending — extend AZ_ZIP_TO_COUNTY in lib/geo/zip-county.ts."}
      </div>
    </div>
  );
}

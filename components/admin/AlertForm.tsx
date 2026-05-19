"use client";

import { useState } from "react";
import type { Alert, AlertSeverity, AlertType } from "@/types/alert";
import { ZipCountyPicker } from "@/components/map/ZipCountyPicker";

const SEVERITIES: AlertSeverity[] = ["low", "medium", "high"];
const TYPES: AlertType[] = ["heat", "dust", "cholera", "mosquito", "other"];

export function AlertForm({ initial }: { initial?: Alert }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [severity, setSeverity] = useState<AlertSeverity>(initial?.severity ?? "medium");
  const [type, setType] = useState<AlertType>(initial?.type ?? "heat");
  const [zip, setZip] = useState(initial?.location.zip ?? "");
  const [county, setCounty] = useState(initial?.location.county ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wiring to POST /api/alerts lands once validation + auth do.
    console.info("AlertForm submit", { title, shortDescription, severity, type, zip, county });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </Field>

      <Field label="Short description">
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={3}
          required
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </Field>

      <Field label="Attachment (image / PDF)">
        <input
          type="file"
          accept="image/*,application/pdf"
          className="text-sm"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Severity">
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as AlertSeverity)}
            className="w-full rounded border border-zinc-300 px-3 py-2 capitalize dark:border-zinc-700 dark:bg-zinc-900"
          >
            {SEVERITIES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Type">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as AlertType)}
            className="w-full rounded border border-zinc-300 px-3 py-2 capitalize dark:border-zinc-700 dark:bg-zinc-900"
          >
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <ZipCountyPicker
        defaultZip={zip}
        onChange={({ zip: z, county: c }) => {
          setZip(z);
          setCounty(c ?? "");
        }}
      />

      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {initial ? "Save changes" : "Publish alert"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SYMPTOM_OPTIONS = [
  "Fever",
  "Cough",
  "Sore throat",
  "Congestion",
  "Diarrhea",
  "Nausea/Vomiting",
  "Loss of smell/taste",
  "Red eyes",
  "Difficulty breathing",
  "Muscle aches",
  "Chills",
  "Rash",
  "Yellow skin/eyes",
  "Bloody urine",
  "Tick/Insect bite",
  "Animal bite",
  "Dead/Sick animals",
  "Mosquito activity",
];

export function SymptomSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSymptoms =
    searchParams.get("symptoms")?.split(",").filter(Boolean) || [];

  const [selected, setSelected] = useState<Set<string>>(
    new Set(currentSymptoms),
  );

  const handleToggle = (symptom: string) => {
    const next = new Set(selected);
    if (next.has(symptom)) {
      next.delete(symptom);
    } else {
      next.add(symptom);
    }
    setSelected(next);
  };

  const handleSubmit = () => {
    const query = Array.from(selected).join(",");
    router.push(`?symptoms=${encodeURIComponent(query)}`);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <h2 className="text-lg font-semibold">
        What symptoms are you experiencing?
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Select one or more to see personalized resources.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {SYMPTOM_OPTIONS.map((symptom) => (
          <button
            key={symptom}
            onClick={() => handleToggle(symptom)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selected.has(symptom)
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "border border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selected.size === 0}
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:bg-zinc-400 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Show Resources
      </button>
    </div>
  );
}

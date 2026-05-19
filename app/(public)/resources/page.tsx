import { ResourceCard } from "@/components/resources/ResourceCard";

// Resource recommendations come from a decision flow (per Ellen's flow chart).
// For now we stub two recommendations so the layout and visual language are
// settled before the flow logic lands.

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Recommended resources</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Based on your selections, here are 1–2 places to start. The full flow
        will follow Ellen's decision tree.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <ResourceCard
          title="Pima County cooling centers"
          href="https://www.pima.gov/2307/Cooling-Centers"
          blurb="Find an air-conditioned public space near you."
        />
        <ResourceCard
          title="Maricopa Heat Relief"
          href="https://www.maricopa.gov/2462/Heat-Relief-Assistance"
          blurb="Hydration, shelter, and transport assistance."
        />
      </div>
    </main>
  );
}

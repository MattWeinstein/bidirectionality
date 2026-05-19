import { notFound } from "next/navigation";
import { getAlert } from "@/lib/alerts";
import { AlertForm } from "@/components/admin/AlertForm";

export default async function EditAlertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alert = await getAlert(id);
  if (!alert) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Edit alert</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        ID <code className="font-mono">{alert.id}</code>
      </p>
      <div className="mt-6">
        <AlertForm initial={alert} />
      </div>
    </main>
  );
}

import { AlertForm } from "@/components/admin/AlertForm";

export default function NewAlertPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">New manual alert</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Fields per the BIDIRECTIONALITY spec: title, short description,
        upload, geographic location, contact info, severity, type.
      </p>
      <div className="mt-6">
        <AlertForm />
      </div>
    </main>
  );
}

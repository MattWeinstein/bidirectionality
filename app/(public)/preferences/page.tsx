export default function PreferencesPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Notification preferences</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Choose how you want to hear about alerts. Storage will go through the
        auth/DB team's user profile.
      </p>

      <form className="mt-6 space-y-3">
        {(["sms", "email", "push"] as const).map((ch) => (
          <label
            key={ch}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 p-4 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            <input type="checkbox" name="channel" value={ch} defaultChecked />
            <span className="font-medium capitalize">{ch}</span>
          </label>
        ))}
        <button
          type="submit"
          disabled
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Save (not wired yet)
        </button>
      </form>
    </main>
  );
}

// Auth gate placeholder. Once registerAuthProvider() is wired by the DB team,
// this becomes a server component that calls getAuthProvider().requireAdmin()
// and redirects unauthenticated users. Until then it renders an inline notice
// so it's obvious the page is unprotected.

export function JurisdictionGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-amber-100 px-4 py-2 text-center text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-200">
        ⚠ Admin auth not wired yet — DB team owns
        <code className="mx-1 font-mono">lib/integrations/auth.ts</code>
      </div>
      {children}
    </>
  );
}

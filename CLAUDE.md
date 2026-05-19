# Guidance for LLM assistants

This file is loaded automatically by Claude Code (and equivalent tools) into
every conversation about this repo. Read it before suggesting structural
changes.

## What this project is

The bidirectional subteam of a multi-team One Health surveillance system for
Arizona. We ship manual + auto health alerts, maps that contextualize them,
and the resource / notification flows that follow. We are **one of several
subteams** — auth, risk detection, and external data feeds are owned by
others and integrated through typed seams in `lib/integrations/`.

## Architectural rules

1. **The `Alert` type in `types/alert.ts` is the cross-team contract.**
   Adding or renaming fields is an API change — flag it, don't quietly
   refactor.
2. **Don't inline cross-team logic.** Auth, risk triggers, and external
   data feeds each have an interface in `lib/integrations/`. Code calls
   the interface, never a concrete implementation, so other teams can plug
   in without forking this repo.
3. **Server components by default.** Add `"use client"` only when the file
   needs hooks, event handlers, or browser-only APIs (Leaflet does — it
   touches `window` on import and must be loaded with
   `next/dynamic({ ssr: false })`).
4. **Route groups separate audiences.** `app/(public)/` is citizen-facing,
   `app/admin/` is jurisdiction-admin-only. Don't share layouts across the
   two — they look and behave differently.
5. **No business logic in components.** Components render; `lib/` decides.
6. **Path alias `@/*` is configured.** Use it (`@/lib/alerts`,
   `@/types/alert`) — don't write `../../../`.

## Conventions

- **Tailwind v4.** Utility classes only; no separate CSS modules.
- **Stubs over mocks.** When something can't be wired yet (auth, persistence,
  data feeds), render a visible notice or log the action — don't silently
  fake it. The `JurisdictionGate` banner is the pattern.
- **No new top-level folders** without updating this file and
  `docs/integration.md`.
- **Don't introduce a state manager, ORM, or auth library unilaterally.**
  Those are cross-team decisions.

## Where to read next

- `docs/integration.md` — exactly how other teams plug in.
- `docs/data-sources.md` — external feed URLs and provenance.
- `README.md` — human-oriented overview.

## What NOT to do

- Don't replace the `Alert` interface with a Zod-inferred type without
  team agreement — the interface is the canonical reference, and Zod
  schemas should derive from it (not the other way around).
- Don't move auth/risk/data logic out of `lib/integrations/`. The whole
  point of those files is that another team supplies them.
- Don't add a `pages/` directory. This is an App Router project.
- Don't delete the showcase landing at `app/page.tsx` — it's how the team
  demos work to stakeholders and other subteams.

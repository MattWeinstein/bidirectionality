# Bidirectionality

The **bidirectional component** of a One Health surveillance system for
Arizona. This subteam ships:

- **Manual health alerts** — jurisdiction admins author + publish alerts.
- **Auto health alerts** — environmental and trend-based triggers from the
  Risk team are converted into citizen-facing alerts.
- **Maps & resources** — heatmaps, cooling centers, outbreak overlays, and a
  guided resource recommendation flow.
- **Notifications** — banner, SMS, email, push (user-selectable).

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

The landing page at `/` is a **showcase** linking to each work-in-progress
surface — use it as the entry point for demos and onboarding.

## Project structure

```
app/
  page.tsx              showcase landing
  (public)/             citizen-facing routes (alerts, map, resources, preferences)
  admin/                jurisdiction admin (auth-gated)
  api/                  route handlers

components/
  alerts/  map/  admin/  resources/  ui/

lib/
  alerts/               canonical queries / mutations
  geo/                  zip ↔ county, geofencing
  notifications/        channel interface (sms/email/push)
  integrations/         seams for OTHER teams to implement
    auth.ts             DB / auth team
    risk-signals.ts     Risk team
    data-sources.ts     external feeds (ArcGIS, MAG, county)

types/alert.ts          canonical Alert type — the cross-team contract

docs/
  integration.md        contracts between subteams
  data-sources.md       URLs + provenance for every external feed
```

## How other teams plug in

Every cross-team boundary is a TypeScript interface in `lib/integrations/`.
Other teams supply an implementation and call `register…()` at startup —
we don't fork their code, they don't fork ours. See
[docs/integration.md](./docs/integration.md).

| Team | Seam |
| --- | --- |
| Auth / DB | `lib/integrations/auth.ts` |
| Risk | `lib/integrations/risk-signals.ts` |
| Data feeds | `lib/integrations/data-sources.ts` |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Leaflet.

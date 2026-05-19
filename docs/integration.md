# Integration contracts

This subteam owns the **bidirectional surface** of the One Health surveillance
system: manual + auto health alerts, the maps that contextualize them, and the
notification + resource flows that follow. Other subteams plug in through the
typed seams below.

## Owned by us

| Surface | Path |
| --- | --- |
| Alert data model | `types/alert.ts` |
| Alert storage / queries | `lib/alerts/` |
| Public UI (citizen) | `app/(public)/` |
| Admin UI (jurisdiction) | `app/admin/` |
| Notification dispatch | `lib/notifications/` |
| HTTP API | `app/api/alerts/` |

## Plug-in seams (other teams implement)

### Auth — `lib/integrations/auth.ts`

The DB/auth team supplies an `AuthProvider` implementation and calls
`registerAuthProvider()` at app startup. We never inline auth logic — every
admin route resolves auth through `getAuthProvider()`.

Per the spec: **~40 users**, **1 admin per jurisdiction**, **max 10 devices
per account**. The provider enforces the device cap via `canRegisterDevice()`.

### Risk signals — `lib/integrations/risk-signals.ts`

The Risk team owns the logic that decides what's a "trend change" or an
environmental risk. They emit `RiskTrigger`s; we convert each trigger into
an auto-alert by setting `source: "auto"` and attaching the jurisdiction's
contact info before persisting.

The current contract is pull-based (`pollTriggers(since)`) — switch to push
once the Risk team has infra.

### Data sources — `lib/integrations/data-sources.ts`

Map layers (cooling centers, heat risk, outbreaks) come from external feeds.
The `DataSourceClient` interface hides which feed is providing which layer
so we can swap or merge sources without changing UI code. Source URLs are
catalogued in [data-sources.md](./data-sources.md).

## Conventions

- **Server components by default.** Mark a file `"use client"` only if it
  needs hooks, browser APIs (Leaflet!), or event handlers.
- **All alerts conform to the `Alert` type.** If you need a field that
  isn't there, add it to `types/alert.ts` and announce the change.
- **No business logic in components.** Components render; `lib/` decides.
- **Path alias `@/*`** is configured in `tsconfig.json` — use it everywhere.

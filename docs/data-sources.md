# External data sources

URLs and notes for every feed referenced in the BIDIRECTIONALITY spec.
Programmatic access lives in `lib/integrations/data-sources.ts`.

## Cooling centers

- **Pima County** — https://www.pima.gov/2307/Cooling-Centers
- **Arizona DHS interactive map** — https://experience.arcgis.com/experience/c5bdf9ab90894e1baa5860c450dedb3b
- **MAG Heat Relief Network (map)** — https://hrn.azmag.gov/map
- **MAG Heat Relief Network (listing)** — https://hrn.azmag.gov/listing
- **Maricopa Heat Relief Assistance** — https://www.maricopa.gov/2462/Heat-Relief-Assistance
- **Maricopa Heat Relief Toolkit** — https://www.maricopa.gov/6066/Heat-Relief-Toolkit
- **AZ state heat hub** — https://heat.az.gov/

## Open questions

- Symptom heatmaps (people + animals) — source TBD.
- Outbreak case/death counts by county — pending coordination with the
  county data working group.
- Tribal nation boundaries for contextual reporting — Sameer owns;
  confirm geometry source.

## Adding a new feed

1. Pick the right method on `DataSourceClient` (or add one with team review).
2. Add a typed adapter in a new file under `lib/integrations/sources/`.
3. List the source URL and contact here.

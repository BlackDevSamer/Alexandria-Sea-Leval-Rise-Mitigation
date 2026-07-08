# AlexGuard — Feature Suggestions & Roadmap

Suggestions based on the current codebase (React/TS frontend, .NET backend, FastAPI + LSTM ML service) and the revisions described in `site_notes.md`.

---

## 1. Architecture-Aligned Suggestions

- **Merge fragility report into the forecast endpoint:** Extend the ML service's `/forecast` response to also include a district-by-district damage % breakdown, so the "72-hour urban fragility report" can be generated directly from this endpoint instead of a separate reporting pipeline.
- **Repurpose Reports/Analytics logic instead of deleting it:** `ReportsController` and `AnalyticsController` are being removed as standalone pages per the notes — turn their logic into internal services called by `InfrastructureController` / `MapRiskController` (e.g. for PDF export), rather than discarding the code outright.
- **Reuse the chatbot UI shell:** `ChatController` / `ChatPrediction.jsx` are being removed, but the existing component shell could be repurposed into the new "select layers → submit → generate report" panel instead of building that UI from scratch.

## 2. Data Freshness (Dynamic vs. Static)

- Add a `dataSource` / `lastUpdated` field to the `ScenariosController` response so the frontend can clearly label live vs. static data sources.
- For the Future Planning (static, 7-year cycle) page, cache the `InfrastructureController` response at build/deploy time (scheduled job or static JSON snapshot) rather than querying the DB per request — cheaper and matches the actual update cadence.

## 3. New Feature Ideas

- **District comparison view:** Using `PopulationController` + `MapRiskController`, add a side-by-side comparison of 2–3 districts' exposure to help prioritize interventions.
- **Scenario delta view:** Building on the existing SSP1/2/5 tabs (`ScenarioYearFilter.jsx`), add a "what changed" view showing the delta between two scenarios/years.
- **Saved reports per user:** `AuthController` already exists — add a per-user dashboard of past 72-hour reports so planners/officials can revisit results without regenerating them.
- **Reusable critical-facilities layer config:** Generalize the planned schools/universities toggle into a shared `critical_facilities` config (schools, hospitals, power stations, etc.) used by both the Urgent Interventions and Future Planning pages instead of hardcoding it per page.

## 4. UX / Content Suggestions

- Make the 72-hour urban fragility report exportable (PDF/print) — decision-makers will want to share it in meetings, not just view it on screen.
- Keep a lightweight color-coded risk cue directly on the map (even after removing the standalone "risk severity" badge), so users get an at-a-glance signal without generating a full report.
- Add a visible "Data last updated: [date/year]" label on the Future Planning page so users understand the staleness is intentional, not a bug.
- On the Egypt Vision 2030 page, add 2–3 concrete linkage points between specific Vision 2030 goals and your platform's resilience metrics, beyond just naming it.
- Double-check that exported PDFs/reports also carry the new AlexGuard branding after the rebrand (easy to miss report templates).

---

*Companion document to `site_notes.md` — captures forward-looking feature ideas rather than required revisions.*

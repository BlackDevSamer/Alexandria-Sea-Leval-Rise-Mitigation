# AlexGuard Website Notes & Revisions

Documentation of the requested changes to the website, organized by page/section.

---

## 1. General Changes (Site-wide)

- **Branding:** Replace the "Ministry of Water Resources and Irrigation" name and logo with the **AlexGuard** project name and logo.
- **Terminology:** Replace the word "vulnerability" (الضعف) with **"fragility/resilience"** (الهشاشة) across all pages.
- **Reports page:** Remove entirely — reports will be generated inside the other two pages, so a dedicated page is not needed.
- **Analytics page:** Remove entirely.
- **Final page structure** (in addition to the home page):
  1. Urgent Interventions
  2. Future Planning
  3. Intersection with Egypt Vision 2030 (text-only page, minimal technical work)

---

## 2. Home Page

- **Map:** Remove it from the home page, since there are already two other pages containing maps.
- **Footer:** Remove the current research institute name/logo, and replace it with:
  > "AlexGuard in collaboration with the National Institute of Oceanography and Fisheries"

**Preliminary naming note (for simplicity):**
- "Forecasts" page ↔ corresponds to "Urgent Interventions"
- "Infrastructure" page ↔ corresponds to "Future Planning"

---

## 3. Forecasts / "Urgent Interventions" Page

- **Remove the chatbot entirely:**
  - It would draw the user into conversations we don't need.
  - It doesn't have any genuinely useful features that justify keeping it.
- **Replacement:** A map containing our current layers, plus an element similar to what already exists on the Infrastructure page:
  - The user selects exactly what they need (could also add options like schools and universities).
  - After submitting, the following appear:
    - Flood map
    - An urban fragility/resilience report for the next 72 hours, showing the damage percentage for each critical sector within each district/neighborhood in the city.
- **Remove "risk severity"** from this page, since it will already appear inside the report.

---

## 4. Infrastructure Changes ("Future Planning")

- **Remove "risk severity"** from this page as well (same logic as the Urgent Interventions page).
- **Same display mechanism** for analytics and maps as above, with one key difference:
  - The data here is **static** and not pulled live from the model as in "Urgent Interventions."
  - Reason: this page's data is only updated every **7 years**, so it doesn't make sense to use a live API for something updated that infrequently.

---

## 5. "Egypt Vision 2030" Page

- The text content will be written and delivered separately.
- Request to the design team: present it in an **eye-catching, polished** style without extra complexity.
- Note from the doctor: simply mentioning "Egypt Vision 2030" tends to strongly impress evaluators.

---

## Appendix: Reference Images from the Original Document

> The following images are attached as a visual reference for the current layout that needs to be modified.

- `image1.png` — Current logo (Ministry of Water Resources and Irrigation) to be replaced.
- `image2.png` — Sample of the current map on the home page (to be removed from there).
- `image3.png` — Sample of the current footer (institute text to be updated).
- `image4.png` — Sample of the current "risk severity" indicator (to be removed from both the Urgent Interventions and Future Planning pages).

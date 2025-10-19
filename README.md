# ICE‑6: Marks and Channels — Company Metrics Visualizations

Interactive visualizations built with React + D3 using a custom CSV (company_growth.csv) that contains yearly Revenue, Expenses, Profit, and Employees from 2018–2030.

## Project Goals
- Create three charts using the same dataset:
  - Bar chart (Year vs Revenue).
  - Scatter plot (Revenue vs Expenses) with axis labels.
  - Multi‑series chart (Revenue bars + Profit line) with legend and styling.
- Add titles, labels, legend, gridlines, annotations, and a short interpretation for each chart.
- Provide links/screenshots and well‑commented code.

## Dataset
File: public/company_growth.csv

Columns:
- Year (integer): 2018–2030.
- Revenue (number, millions): Company revenue per year.
- Expenses (number, millions): Operating expenses per year.
- Profit (number, millions): Annual profit per year.
- Employees (integer): Headcount per year.

Sample rows:
| Year | Revenue (Millions) | Expenses (Millions) | Profit (Millions) | Employees |
|----:|--------------------:|--------------------:|------------------:|----------:|
| 2018 | 45.3               | 31.7                | 13.6              | 250       |
| 2019 | 50.1               | 34.9                | 15.2              | 270       |
| 2020 | 47.8               | 36.4                | 11.4              | 260       |
| 2021 | 55.6               | 39.3                | 16.3              | 300       |
| 2022 | 60.9               | 42.8                | 18.1              | 320       |
| 2023 | 68.2               | 46.7                | 21.5              | 340       |
| 2024 | 74.5               | 49.1                | 25.4              | 360       |
| 2025 | 81.0               | 53.0                | 28.0              | 380       |
| 2026 | 88.2               | 57.2                | 31.0              | 400       |
| 2027 | 96.0               | 61.5                | 34.5              | 420       |
| 2028 | 104.3              | 66.0                | 38.3              | 440       |
| 2029 | 113.0              | 70.8                | 42.2              | 460       |
| 2030 | 122.0              | 75.9                | 46.1              | 480       |

## Tech Stack
- React 18 for UI structure and tabbed navigation.
- D3 v7 for scales, axes, shapes, and SVG rendering.
- CSV served from public/ for reliable fetching (no CORS issues).

## How to Run
1. Place `company_growth.csv` in `public/`.
2. `npm install`
3. `npm start`
4. Open http://localhost:3000 and use the tabs (Bar | Scatter | Multi‑series).

## File Structure
```bash
    public/
    └─ company_growth.csv
    src/
    ├─ App.js # Tab switcher, mounts charts
    ├─ App.css # Shared light/dark themes and chart styles
    ├─ index.js # React bootstrap
    ├─ hooks/
    │ └─ useCompanyData.js # Loads and parses the CSV (Year, Revenue, Expenses, Profit, Employees)
    ├─ utils/
    │ └─ formatters.js # Shared D3 formatters for numbers/years
    └─ charts/
    ├─ BarChart.js # Year vs Revenue
    ├─ ScatterPlot.js # Revenue vs Expenses with labels and grid
    └─ MultiSeries.js # Revenue (bars) + Profit (line) with legend
   ```

## Chart 1 — Bar Chart
- Title: “Company Revenue by Year”
- Encodings:
  - x: Year (ordinal, scaleBand)
  - y: Revenue (linear, millions)
  - mark: Rectangles (bars), value labels on top
- Axes/Labels:
  - X label: “Year”
  - Y label: “Revenue (Millions)”
- Customization:
  - Gridlines on y, formatted ticks (e.g., “0 M … 120 M”)
  - Hover tooltip with all metrics for the selected year
- Interpretation:
  - Revenue trends upward from 45.3 M (2018) to 122.0 M (2030), passing 100 M around 2028–2029, indicating sustained growth and compounding expansion.

## Chart 2 — Scatter Plot
- Title: “Revenue vs Expenses (Scatter)”
- Encodings:
  - x: Revenue (linear, millions)
  - y: Expenses (linear, millions)
  - mark: Points (circles)
- Axes/Labels:
  - X label: “Revenue (Millions)”
  - Y label: “Expenses (Millions)”
- Customization:
  - Gridlines on both axes, white tick labels for dark theme
  - Tooltip on hover (Year, Revenue, Expenses)
- Interpretation:
  - Strong positive relationship: higher revenue years correspond to higher expenses; dispersion is moderate, suggesting a fairly stable cost structure as the company scales.

## Chart 3 — Multi‑Series (Combo)
- Title: “Revenue (Bars) + Profit (Line)”
- Encodings:
  - x: Year (ordinal, scaleBand)
  - y: Amount (linear, millions)
  - marks: Bars for Revenue, line + points for Profit
- Axes/Labels:
  - X label: “Year”
  - Y label: “Amount (Millions)”
- Legend:
  - “Revenue (bars)” and “Profit (line)”
- Customization:
  - Gridlines, formatted ticks, contrasting series colors, optional annotation for max Profit
- Interpretation:
  - Both Revenue and Profit rise across the period; the widening gap after ~2024 indicates absolute profit growth alongside steady top‑line expansion.

## How the Data is Parsed
`useCompanyData.js`:
- Loads `/company_growth.csv` with `d3.csv`.
- Casts: `Year` to number; financials and employees to numeric types.

## Design Choices (Marks & Channels)
- Marks: bars (area), line (path), points (circles), text labels.
- Channels: position (x/y), length (bar height), color (series distinction), text (value labels), and grid for reference.

## Accessibility & Styling
- Sufficient color contrast for dark theme (white labels/ticks).
- Titles and axis labels provided for context.
- Tooltips expose exact values on hover.

## What to Submit
- One project link (CodeSandbox/VizHub) hosting all three charts via tabs.
- A short PDF/DOC with:
  - Screenshots of each chart (with titles and labels visible).
  - 2–3 sentence description for each chart (distribution/trend/relationship).
  - Notes on customizations (legend, colors, gridlines, annotations).
  - Brief mention that code is commented and original.

## Known Limitations
- The scatter plot can show overlap; consider opacity or jitter if points increase.
- CSV must remain in `public/` or a CORS‑enabled URL.

## Attribution
- Built for CSCE 5320 ICE‑6: Marks and Channels requirements.
- React and D3 are MIT‑licensed open‑source libraries.

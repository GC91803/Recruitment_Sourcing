# Recruitment Sourcing

Recruiting lead intelligence dashboard for finding charter-school business and operations leaders with recent availability signals, contact provenance, review workflows, and CSV/XLSX export.

## Getting Started

Install dependencies and start the local app:

```bash
pnpm install
pnpm run dev
```

Useful checks:

```bash
pnpm run typecheck
pnpm run build
```

## Project Structure

- `src/shared/leadRecord.ts`: shared lead contract used by pipeline, dashboard, and export work.
- `src/data/sampleLeads.ts`: sample records for dashboard development before the pipeline is connected.
- `src/App.tsx`: starter recruiter workspace screen.
- `docs/product-plan.md`: product requirements and MVP acceptance criteria.
- `docs/work-split.md`: recommended feature ownership and branch plan.

## Collaboration Plan

Start new feature branches from `main` after this scaffold lands:

- `feature/lead-intelligence-pipeline`
- `feature/recruiter-dashboard-export`

Keep schema changes in `src/shared/leadRecord.ts` small and reviewed by both feature owners.

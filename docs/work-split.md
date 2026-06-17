# Work Split

This repo is set up so two people can work in parallel without editing the same files most of the time.

## Shared Contract

Own jointly:

- `src/shared/leadRecord.ts`
- `src/data/sampleLeads.ts`

Change these intentionally because both feature lanes depend on them. If the lead shape needs to change, make that a small standalone pull request before using the new fields heavily.

## Lane 1: Lead Intelligence Pipeline

Suggested branch:

```bash
git checkout -b feature/lead-intelligence-pipeline
```

Primary ownership:

- Source discovery and search-provider adapters.
- Title and keyword matching.
- Evidence extraction and provenance.
- Lead qualification rules.
- Deduping and identity review.
- Opt-out and suppression handling.
- Scoring inputs that populate `LeadRecord`.

Recommended future folders:

- `src/pipeline/`
- `src/config/`
- `src/suppression/`
- `src/scoring/`

Avoid changing dashboard layout files unless a schema change requires a small demo update.

## Lane 2: Recruiter Dashboard And Export

Suggested branch:

```bash
git checkout -b feature/recruiter-dashboard-export
```

Primary ownership:

- Lead list, filters, and review lanes.
- Lead detail view.
- Accept, reject, notes, and reviewed states.
- CSV/XLSX export using the shared export row helper.
- Empty, loading, and error states.

Recommended future folders:

- `src/components/`
- `src/features/leads/`
- `src/export/`

Use `src/data/sampleLeads.ts` until Lane 1 provides real pipeline output.

## Merge Order

1. Keep this scaffold on `main`.
2. Both people branch from fresh `main`.
3. Merge small shared-contract updates first.
4. Merge feature PRs after typecheck/build passes.

## Conflict Rules

- If both lanes need the same field, add it to `LeadRecord` in a small shared PR.
- If a dashboard feature needs mock data, add the smallest realistic sample to `sampleLeads`.
- If pipeline work exposes new evidence or scoring details, preserve backward-compatible fields until the dashboard has been updated.

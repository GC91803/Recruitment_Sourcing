# Recruiting Lead Intelligence Dashboard MVP

## Summary

Build a nationwide charter-school recruiting intelligence dashboard for internal recruiters sourcing business and operations leaders. The product identifies people with strong employment-availability signals from the last 30 days, requires at least one clear source signal, enriches for personal email, scores contactability highest, and lets recruiters review and export leads to CSV/XLSX.

The main v1 workflow is recruiter-first. A secondary school-level alert is captured for future sales and customer-success use when evidence suggests a school may have lost a key business/ops leader.

## Data Sources

- Public and official school sources: charter school websites, district/network leadership pages, staff directories, HR pages, press releases, newsletters, board agendas/minutes, personnel reports, charter authorizer pages, and state education directories.
- Public web discovery: compliant search APIs such as Bing Web Search, Brave Search, SerpAPI, Tavily, or other licensed search providers to discover relevant pages and documents.
- Licensed enrichment sources: vendors for personal email and phone availability, with source/vendor provenance stored per contact field.
- Optional future/import sources: approved exports or workflows from subscription tools such as LinkedIn Recruiter, Indeed Resume, Apollo, ZoomInfo, and similar platforms. Do not scrape platforms where terms prohibit automated extraction.

## Core Lead Rules

- Segment: charter schools nationwide.
- Role family: business and operations leaders, including CBO, CFO, COO, finance, operations, procurement, HR, enrollment, facilities, and related senior roles.
- Freshness: qualifying signal must be from the last 30 days.
- Minimum dashboard fields: name, prior/current relevant role, school, personal email, and source evidence.
- Lead qualification: strong signals only, such as explicit job-seeking language, public availability, public resume/listing, or clear recent role end/departure.
- Evidence standard: one source is enough only when the indicator is clear; weaker or ambiguous cases require review or corroboration.
- Deduping: merge duplicate person records into one canonical lead; ambiguous identity matches go to review.

## Dashboard Behavior

- Primary view: scored lead list with filters for state, title family, keyword match, source type, confidence, review status, and contactability.
- Lead detail: show candidate name, role history, school, state, matched titles/keywords, signal type, date found, source snippets, source links, personal email, phone availability, and contact provenance.
- Scoring: contactability is the top ranking factor, with personal email required and phone availability improving score. Intent strength, role fit, source quality, and recency also contribute.
- Review lanes: high-confidence leads can be export-ready automatically; weaker leads appear in a needs-review lane.
- Recruiter actions: accept/reject, add notes, mark reviewed, and export accepted leads.
- Export: CSV/XLSX with candidate details, school, state, role, keywords, score, contact fields, evidence snippets, source URLs, provenance, review status, and secondary school-alert flag.

## Admin And Governance

- Admin-configured title and keyword lists should drive matching and be editable without code changes.
- Store provenance for every evidence and contact field, including source URL/vendor, retrieval date, signal type, and confidence.
- Include opt-out/suppression handling from v1 so opted-out people are excluded from future exports and dashboard surfacing.
- Avoid direct scraping of LinkedIn or similar subscription platforms unless explicitly allowed by official APIs, permitted exports, or vendor agreements.

## Roadblocks To Plan For

- LinkedIn and subscription-platform terms may restrict automated scraping, storage, or reuse.
- Personal email and phone enrichment introduces privacy, opt-out, and outreach-policy requirements.
- Public school data is fragmented across websites, PDFs, scanned documents, agendas, and state-specific directories.
- Role-ended signals do not always mean job-seeking; the UI must show evidence and avoid overclaiming.
- Common names require conservative identity matching to avoid false positives.
- Nationwide coverage will produce uneven source quality by state and school network.

## Test Cases And Acceptance

- Finds a qualified business/ops leader with a clear job-seeking signal from the last 30 days and a personal email.
- Excludes a relevant person with no email from the main dashboard.
- Sends ambiguous single-source role-gap cases to review instead of export-ready.
- Merges duplicate records for the same person while preserving all source evidence.
- Suppresses an opted-out person from dashboard and export.
- Exports accepted leads to CSV/XLSX with all required fields and evidence links.
- Allows admin updates to title/keyword lists and applies them to future matching.
- Creates a secondary school-level alert flag when a lead implies a school may have lost a key business/ops role.

## Assumptions

- v1 is a real pipeline MVP, not just a clickable prototype.
- Dashboard is the primary product surface.
- Collection is nationwide, with state-only filtering in v1.
- Weekly scheduled refresh plus on-demand searches.
- Sales/customer-success use is future-facing and secondary, not a main v1 workflow.

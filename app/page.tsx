"use client";

import { useMemo, useState } from "react";

type Status = "Export-ready" | "Needs review" | "Accepted";
type Signal = "Leadership transition" | "School closure" | "Finance pressure" | "Operations shift";

type Lead = {
  id: string;
  personLabel: string;
  title: string;
  school: string;
  state: string;
  networkType: string;
  signal: Signal;
  score: number;
  contactScore: number;
  sourceConfidence: number;
  lastSeen: string;
  status: Status;
  email: string;
  phone: string;
  sourceName: string;
  sourceUrl: string;
  snippet: string;
  keywords: string[];
  schoolAlert: string;
  nextAction: string;
};

const leads: Lead[] = [
  {
    id: "VTX-104",
    personLabel: "Anonymized Candidate A",
    title: "Former CEO / senior charter network leader",
    school: "KIPP DC",
    state: "DC",
    networkType: "CMO",
    signal: "Leadership transition",
    score: 94,
    contactScore: 98,
    sourceConfidence: 86,
    lastSeen: "Nov 18, 2025",
    status: "Export-ready",
    email: "personal email verified - masked",
    phone: "mobile signal found",
    sourceName: "Washington Post",
    sourceUrl:
      "https://www.washingtonpost.com/education/2025/11/18/kipp-dc-founder-susan-schaeffler-steps-down/",
    snippet:
      "Public reporting described the founder and CEO of KIPP DC stepping down in early 2026 after long tenure.",
    keywords: ["CEO", "charter network", "transition", "operations"],
    schoolAlert:
      "Leadership transition may create near-term needs around finance, HR, and operating continuity.",
    nextAction: "Recruiter review, then export to sourcing list",
  },
  {
    id: "VTX-121",
    personLabel: "Anonymized Candidate B",
    title: "School founder / executive director profile",
    school: "Capital Village Public Charter School",
    state: "DC",
    networkType: "Single-site charter",
    signal: "School closure",
    score: 89,
    contactScore: 96,
    sourceConfidence: 84,
    lastSeen: "Mar 14, 2026",
    status: "Needs review",
    email: "personal email verified - masked",
    phone: "not found",
    sourceName: "Washington Post",
    sourceUrl:
      "https://www.washingtonpost.com/education/2026/03/14/capital-village-charter-school-dc/",
    snippet:
      "Public reporting described a D.C. charter school closure tied to enrollment and financial challenges.",
    keywords: ["founder", "closure", "finance", "enrollment"],
    schoolAlert:
      "Closure context suggests leadership and operations talent may be entering the market.",
    nextAction: "Check source and confirm role fit before export",
  },
  {
    id: "VTX-138",
    personLabel: "Anonymized Candidate C",
    title: "Charter system operations leader",
    school: "Chavez Huerta Preparatory Academy",
    state: "CO",
    networkType: "Charter system",
    signal: "School closure",
    score: 87,
    contactScore: 93,
    sourceConfidence: 88,
    lastSeen: "Jun 12, 2025",
    status: "Export-ready",
    email: "personal email verified - masked",
    phone: "mobile signal found",
    sourceName: "Wikipedia source summary",
    sourceUrl:
      "https://en.wikipedia.org/wiki/Ch%C3%A1vez_Huerta_Preparatory_Academy",
    snippet:
      "Public sources summarized the school's 2025 closure after district and state actions.",
    keywords: ["operations", "closure", "finance", "charter agreement"],
    schoolAlert:
      "Closure may indicate displaced operational leadership and finance support needs.",
    nextAction: "Prioritize for operations leadership sourcing",
  },
  {
    id: "VTX-149",
    personLabel: "Anonymized Candidate D",
    title: "Regional finance / school operations leader",
    school: "Downtown College Preparatory",
    state: "CA",
    networkType: "Charter network",
    signal: "Finance pressure",
    score: 82,
    contactScore: 91,
    sourceConfidence: 78,
    lastSeen: "May 2025",
    status: "Needs review",
    email: "personal email verified - masked",
    phone: "not found",
    sourceName: "San Francisco Chronicle",
    sourceUrl: "https://www.sfchronicle.com/bayarea/article/san-jose-charter-school-closure-20334288.php",
    snippet:
      "Public reporting described closure after enrollment declines and financial challenges.",
    keywords: ["finance", "enrollment", "closure", "network"],
    schoolAlert:
      "Financial pressure and closure context may surface experienced finance and operations talent.",
    nextAction: "Confirm current availability before recruiter outreach",
  },
  {
    id: "VTX-166",
    personLabel: "Anonymized Candidate E",
    title: "Former COO / executive operations profile",
    school: "IDEA Public Schools",
    state: "TX",
    networkType: "Large CMO",
    signal: "Operations shift",
    score: 78,
    contactScore: 88,
    sourceConfidence: 74,
    lastSeen: "Public history",
    status: "Needs review",
    email: "personal email verified - masked",
    phone: "mobile signal found",
    sourceName: "Wikipedia source summary",
    sourceUrl: "https://en.wikipedia.org/wiki/IDEA_Public_Schools",
    snippet:
      "Publicly summarized leadership history includes CEO and COO changes within a large charter network.",
    keywords: ["COO", "large CMO", "operations", "leadership"],
    schoolAlert:
      "Large-network operations experience may be relevant for scaling charter systems.",
    nextAction: "Lower freshness; use as concept-only sample record",
  },
  {
    id: "VTX-173",
    personLabel: "Anonymized Candidate F",
    title: "Finance and compliance executive profile",
    school: "Great Hearts Academies",
    state: "AZ",
    networkType: "Multi-state CMO",
    signal: "Leadership transition",
    score: 75,
    contactScore: 87,
    sourceConfidence: 70,
    lastSeen: "Public profile context",
    status: "Accepted",
    email: "personal email verified - masked",
    phone: "not found",
    sourceName: "Wikipedia source summary",
    sourceUrl: "https://en.wikipedia.org/wiki/Great_Hearts_Academies",
    snippet:
      "Public school-network context indicates multi-state scale across Arizona, Texas, and Louisiana.",
    keywords: ["finance", "compliance", "multi-state", "growth"],
    schoolAlert:
      "Multi-state growth context is useful for recruiting finance and compliance leaders.",
    nextAction: "Already accepted for demo export",
  },
];

const states = ["All states", "AZ", "CA", "CO", "DC", "TX"];
const statuses = ["All statuses", "Export-ready", "Needs review", "Accepted"];
const signals = [
  "All signals",
  "Leadership transition",
  "School closure",
  "Finance pressure",
  "Operations shift",
];

function statusClass(status: Status) {
  if (status === "Export-ready") return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (status === "Accepted") return "bg-blue-50 text-blue-800 border-blue-200";
  return "bg-amber-50 text-amber-800 border-amber-200";
}

function scoreClass(score: number) {
  if (score >= 88) return "text-emerald-700";
  if (score >= 80) return "text-[#bc8f2d]";
  return "text-slate-600";
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(leads[0].id);
  const [stateFilter, setStateFilter] = useState("All states");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [signalFilter, setSignalFilter] = useState("All signals");
  const [query, setQuery] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [acceptedIds, setAcceptedIds] = useState<string[]>(["VTX-173"]);

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const matchesState = stateFilter === "All states" || lead.state === stateFilter;
      const status = acceptedIds.includes(lead.id) ? "Accepted" : lead.status;
      const matchesStatus = statusFilter === "All statuses" || status === statusFilter;
      const matchesSignal = signalFilter === "All signals" || lead.signal === signalFilter;
      const haystack = `${lead.personLabel} ${lead.title} ${lead.school} ${lead.keywords.join(" ")}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesState && matchesStatus && matchesSignal && matchesQuery;
    });
  }, [acceptedIds, query, signalFilter, stateFilter, statusFilter]);

  const selected = filtered.find((lead) => lead.id === selectedId) ?? filtered[0] ?? leads[0];
  const acceptedCount = leads.filter((lead) => acceptedIds.includes(lead.id) || lead.status === "Accepted").length;
  const exportReadyCount = leads.filter((lead) => lead.status === "Export-ready").length;
  const avgScore = Math.round(leads.reduce((total, lead) => total + lead.score, 0) / leads.length);

  function acceptLead(id: string) {
    setAcceptedIds((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#17344a]">
      <header className="border-b border-[#d8d1c3] bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <img
              src="/vertex-logo.jpg"
              alt="Vertex Education"
              className="h-12 w-20 rounded bg-white object-contain object-left"
            />
            <div>
              <p className="text-xs font-semibold uppercase text-[#b7892c]">Talent intelligence mock</p>
              <h1 className="text-xl font-semibold text-[#12344d]">Recruiting Lead Dashboard</h1>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {["Leads", "Sources", "Review", "Exports"].map((item, index) => (
              <button
                key={item}
                className={`h-9 rounded-md border px-3 font-medium ${
                  index === 0
                    ? "border-[#0f5d70] bg-[#0f5d70] text-white"
                    : "border-[#d8d1c3] bg-white text-[#284d5f] hover:border-[#0f5d70]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1500px] gap-5 px-5 py-5">
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-md border border-[#d8d1c3] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-[#0f5d70]">Empowering Schools. Simplifying Operations.</p>
                <h2 className="mt-2 text-3xl font-semibold text-[#12344d]">
                  Find charter school operations leaders with source-backed signals.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c6d74]">
                  Demo records use real public school/source context with anonymized candidate identities and masked contacts.
                  The workflow shows how recruiters would review, accept, and export leads.
                </p>
              </div>
              <button
                onClick={() => setExportOpen((value) => !value)}
                className="h-11 rounded-md bg-[#bc8f2d] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[#a87c22]"
              >
                Preview export
              </button>
            </div>
            {exportOpen && (
              <div className="mt-4 rounded-md border border-[#d8d1c3] bg-[#fbfaf6] p-4 text-sm text-[#284d5f]">
                CSV/XLSX preview ready: {acceptedCount} accepted records, {exportReadyCount} export-ready records, source URLs,
                masked personal email status, phone signal, school alert flag, and reviewer notes.
              </div>
            )}
          </section>

          <section className="grid grid-cols-3 gap-3">
            <article className="rounded-md border border-[#d8d1c3] bg-white p-4">
              <p className="text-xs font-semibold uppercase text-[#6d7c82]">Lead score</p>
              <p className="mt-2 text-3xl font-semibold text-[#12344d]">{avgScore}</p>
              <p className="mt-1 text-xs text-[#6d7c82]">Average demo fit</p>
            </article>
            <article className="rounded-md border border-[#d8d1c3] bg-white p-4">
              <p className="text-xs font-semibold uppercase text-[#6d7c82]">Ready</p>
              <p className="mt-2 text-3xl font-semibold text-[#0f5d70]">{exportReadyCount}</p>
              <p className="mt-1 text-xs text-[#6d7c82]">Auto export lane</p>
            </article>
            <article className="rounded-md border border-[#d8d1c3] bg-white p-4">
              <p className="text-xs font-semibold uppercase text-[#6d7c82]">Accepted</p>
              <p className="mt-2 text-3xl font-semibold text-[#bc8f2d]">{acceptedCount}</p>
              <p className="mt-1 text-xs text-[#6d7c82]">Reviewer approved</p>
            </article>
          </section>
        </div>

        <section className="rounded-md border border-[#d8d1c3] bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
            <label className="block">
              <span className="text-xs font-semibold uppercase text-[#6d7c82]">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try finance, closure, CBO, operations"
                className="mt-1 h-11 w-full rounded-md border border-[#cfc8ba] bg-white px-3 text-sm outline-none focus:border-[#0f5d70]"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase text-[#6d7c82]">State</span>
              <select
                value={stateFilter}
                onChange={(event) => setStateFilter(event.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-[#cfc8ba] bg-white px-3 text-sm outline-none focus:border-[#0f5d70]"
              >
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase text-[#6d7c82]">Signal</span>
              <select
                value={signalFilter}
                onChange={(event) => setSignalFilter(event.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-[#cfc8ba] bg-white px-3 text-sm outline-none focus:border-[#0f5d70]"
              >
                {signals.map((signal) => (
                  <option key={signal}>{signal}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase text-[#6d7c82]">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-[#cfc8ba] bg-white px-3 text-sm outline-none focus:border-[#0f5d70]"
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-md border border-[#d8d1c3] bg-white shadow-sm">
            <div className="grid grid-cols-[1.1fr_0.8fr_0.75fr_0.55fr_0.55fr] border-b border-[#e4ded2] bg-[#f8f6f1] px-4 py-3 text-xs font-semibold uppercase text-[#6d7c82]">
              <span>Candidate and role</span>
              <span>School/source context</span>
              <span>Signal</span>
              <span>Score</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-[#ece7dd]">
              {filtered.map((lead) => {
                const status = acceptedIds.includes(lead.id) ? "Accepted" : lead.status;
                return (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedId(lead.id)}
                    className={`grid w-full grid-cols-[1.1fr_0.8fr_0.75fr_0.55fr_0.55fr] items-center gap-3 px-4 py-4 text-left hover:bg-[#fbfaf6] ${
                      selected.id === lead.id ? "bg-[#f3f8f8]" : "bg-white"
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-[#12344d]">{lead.personLabel}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#64747a]">{lead.title}</span>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#284d5f]">{lead.school}</span>
                      <span className="mt-1 block text-xs text-[#64747a]">{lead.state} - {lead.networkType}</span>
                    </span>
                    <span className="text-sm text-[#284d5f]">{lead.signal}</span>
                    <span className={`text-xl font-semibold ${scoreClass(lead.score)}`}>{lead.score}</span>
                    <span>
                      <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusClass(status)}`}>
                        {status}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="rounded-md border border-[#d8d1c3] bg-white shadow-sm">
            <div className="border-b border-[#e4ded2] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#0f5d70]">{selected.id}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-[#12344d]">{selected.personLabel}</h3>
                  <p className="mt-1 text-sm text-[#64747a]">{selected.title}</p>
                </div>
                <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${statusClass(acceptedIds.includes(selected.id) ? "Accepted" : selected.status)}`}>
                  {acceptedIds.includes(selected.id) ? "Accepted" : selected.status}
                </span>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md bg-[#f8f6f1] p-3">
                  <p className="text-xs font-semibold uppercase text-[#6d7c82]">Fit</p>
                  <p className="mt-1 text-xl font-semibold text-[#12344d]">{selected.score}</p>
                </div>
                <div className="rounded-md bg-[#f8f6f1] p-3">
                  <p className="text-xs font-semibold uppercase text-[#6d7c82]">Contact</p>
                  <p className="mt-1 text-xl font-semibold text-[#0f5d70]">{selected.contactScore}</p>
                </div>
                <div className="rounded-md bg-[#f8f6f1] p-3">
                  <p className="text-xs font-semibold uppercase text-[#6d7c82]">Source</p>
                  <p className="mt-1 text-xl font-semibold text-[#bc8f2d]">{selected.sourceConfidence}</p>
                </div>
              </div>

              <section>
                <h4 className="text-sm font-semibold text-[#12344d]">Evidence</h4>
                <p className="mt-2 text-sm leading-6 text-[#5c6d74]">{selected.snippet}</p>
                <a
                  href={selected.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-[#0f5d70] underline decoration-[#b7d0d2] underline-offset-4"
                >
                  Open public source
                </a>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#12344d]">Contact provenance</h4>
                <div className="mt-2 rounded-md border border-[#e4ded2] bg-[#fbfaf6] p-3 text-sm leading-6 text-[#5c6d74]">
                  <p>Email: {selected.email}</p>
                  <p>Phone: {selected.phone}</p>
                  <p>Source: licensed enrichment placeholder for demo</p>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#12344d]">School alert</h4>
                <p className="mt-2 text-sm leading-6 text-[#5c6d74]">{selected.schoolAlert}</p>
              </section>

              <section>
                <h4 className="text-sm font-semibold text-[#12344d]">Matched keywords</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-md border border-[#d8d1c3] bg-white px-2 py-1 text-xs font-semibold text-[#284d5f]">
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => acceptLead(selected.id)}
                  className="h-11 rounded-md bg-[#0f5d70] px-3 text-sm font-semibold text-white hover:bg-[#0b4a59]"
                >
                  Accept lead
                </button>
                <button className="h-11 rounded-md border border-[#d8d1c3] bg-white px-3 text-sm font-semibold text-[#284d5f] hover:border-[#0f5d70]">
                  Add note
                </button>
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

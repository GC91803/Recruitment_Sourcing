import { Download, Filter, Search } from 'lucide-react';
import { sampleLeads } from './data/sampleLeads';
import { leadExportHeaders } from './shared/leadRecord';

export function App() {
  const exportReadyCount = sampleLeads.filter((lead) => lead.reviewStatus === 'export_ready').length;
  const needsReviewCount = sampleLeads.filter((lead) => lead.reviewStatus === 'needs_review').length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Recruiting Intelligence</p>
          <h1>Lead review workspace</h1>
        </div>
        <button className="primary-action" type="button">
          <Download size={18} aria-hidden="true" />
          Export accepted
        </button>
      </header>

      <section className="summary-grid" aria-label="Lead summary">
        <div>
          <span>Export ready</span>
          <strong>{exportReadyCount}</strong>
        </div>
        <div>
          <span>Needs review</span>
          <strong>{needsReviewCount}</strong>
        </div>
        <div>
          <span>Export fields</span>
          <strong>{leadExportHeaders.length}</strong>
        </div>
      </section>

      <section className="toolbar" aria-label="Lead controls">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <input placeholder="Search leads, schools, or keywords" />
        </label>
        <button className="secondary-action" type="button">
          <Filter size={18} aria-hidden="true" />
          Filters
        </button>
      </section>

      <section className="lead-table" aria-label="Recruiting leads">
        <div className="table-row table-head">
          <span>Candidate</span>
          <span>School</span>
          <span>Signal</span>
          <span>Score</span>
          <span>Status</span>
        </div>
        {sampleLeads.map((lead) => (
          <article className="table-row" key={lead.id}>
            <span>
              <strong>{lead.fullName}</strong>
              <small>{lead.currentOrPriorRole}</small>
            </span>
            <span>
              <strong>{lead.schoolName}</strong>
              <small>{lead.state} · {lead.titleFamily}</small>
            </span>
            <span>{lead.evidence[0]?.signalType.replace('_', ' ')}</span>
            <span>{lead.score}</span>
            <span className={`status ${lead.reviewStatus}`}>{lead.reviewStatus.replace('_', ' ')}</span>
          </article>
        ))}
      </section>
    </main>
  );
}

export type ReviewStatus = 'export_ready' | 'needs_review' | 'accepted' | 'rejected';

export type SignalType =
  | 'job_seeking'
  | 'public_resume'
  | 'role_ended'
  | 'leadership_gap'
  | 'other';

export type SourceType =
  | 'school_site'
  | 'state_directory'
  | 'board_minutes'
  | 'press_release'
  | 'search_result'
  | 'vendor_enrichment';

export type ContactProvenance = {
  field: 'personalEmail' | 'phone';
  sourceName: string;
  sourceUrl?: string;
  retrievedAt: string;
  confidence: number;
};

export type EvidenceSource = {
  id: string;
  sourceType: SourceType;
  signalType: SignalType;
  title: string;
  url: string;
  snippet: string;
  publishedAt?: string;
  retrievedAt: string;
  confidence: number;
};

export type LeadRecord = {
  id: string;
  fullName: string;
  currentOrPriorRole: string;
  schoolName: string;
  state: string;
  titleFamily: string;
  matchedKeywords: string[];
  personalEmail: string;
  phone?: string;
  score: number;
  contactabilityScore: number;
  intentScore: number;
  roleFitScore: number;
  sourceQualityScore: number;
  recencyScore: number;
  reviewStatus: ReviewStatus;
  schoolAlertFlag: boolean;
  evidence: EvidenceSource[];
  contactProvenance: ContactProvenance[];
  notes?: string;
  foundAt: string;
  updatedAt: string;
};

export type LeadExportRow = {
  fullName: string;
  schoolName: string;
  state: string;
  role: string;
  titleFamily: string;
  matchedKeywords: string;
  score: number;
  personalEmail: string;
  phone: string;
  evidenceLinks: string;
  evidenceSnippets: string;
  reviewStatus: ReviewStatus;
  schoolAlertFlag: boolean;
};

export const leadExportHeaders: Array<keyof LeadExportRow> = [
  'fullName',
  'schoolName',
  'state',
  'role',
  'titleFamily',
  'matchedKeywords',
  'score',
  'personalEmail',
  'phone',
  'evidenceLinks',
  'evidenceSnippets',
  'reviewStatus',
  'schoolAlertFlag',
];

export function toLeadExportRow(lead: LeadRecord): LeadExportRow {
  return {
    fullName: lead.fullName,
    schoolName: lead.schoolName,
    state: lead.state,
    role: lead.currentOrPriorRole,
    titleFamily: lead.titleFamily,
    matchedKeywords: lead.matchedKeywords.join(', '),
    score: lead.score,
    personalEmail: lead.personalEmail,
    phone: lead.phone ?? '',
    evidenceLinks: lead.evidence.map((source) => source.url).join(' | '),
    evidenceSnippets: lead.evidence.map((source) => source.snippet).join(' | '),
    reviewStatus: lead.reviewStatus,
    schoolAlertFlag: lead.schoolAlertFlag,
  };
}

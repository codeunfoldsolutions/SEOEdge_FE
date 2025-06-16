///////////////////////////// AuditOverview type for auditpage

export type AuditOverviewResponse = {
  totalAudits: number;
  completedAudits: number;
  avgDuration: number;
  totalIssues: number;
  avgImprovement: number;
};
// ////////////////////////////////////////

//////////////////////////// get all audits Response type
export type AllAuditsResponse = {
  message: string;
  data: AllAuditRecord[];
  info: AuditListInfo;
};

export type AllAuditCategoryScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type AllAuditItem = {
  score: number;
  description: string;
  displayValue?: string;
};

export type AllAuditDetails = {
  [key: string]: AllAuditItem;
};

export type ProjectSummary = {
  ownerId: string;
  url: string;
  title: string;
  active: boolean;
  score: number;
  description: string;
  criticalCount: number;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  auditsCount: number;
  minorCount: number;
  id: string;
};

export type AllAuditRecord = {
  ownerId: string;
  projectId: ProjectSummary;
  duration: string;
  pdfUrl: string;
  type: string;
  status: string;
  criticalCount: number;
  score: number;
  categories: AllAuditCategoryScores;
  audits: AllAuditDetails;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type AuditListInfo = {
  next: string | null;
  prev: string | null;
};

////////////////////////////////////////////

////////////////////////////////////////////////// Create Audit Response types
export type CreateAuditResponse = {
  message: string;
  data: CreatedAudit;
};

export type CreateAuditCategoryScore = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type CreateAuditsList = {
  score: number;
  description: string;
  displayValue?: string;
};

export type CreateAuditDetail = {
  [key: string]: CreateAuditsList;
};

export type CreatedAudit = {
  ownerId: string;
  projectId: string;
  duration: string;
  pdfUrl: string;
  type: string;
  status: string;
  criticalCount: number;
  score: number;
  categories: CreateAuditCategoryScore;
  audits: CreateAuditDetail;
  createdAt: string;
  updatedAt: string;
  id: string;
};

//////////////////////////////////////////////////

/////////////////// single project audit response type ///////////////

export type SingleProjectAuditResponse = {
  message: string;
  data: SingleAuditRecord[];
  info: PaginationInfo;
};

export type SingleAuditCategoryScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type SingleAuditItem = {
  score: number;
  description: string;
  displayValue?: string;
};

export type SingleAuditDetails = {
  [key: string]: SingleAuditItem;
};

export type SingleAuditRecord = {
  ownerId: string;
  projectId: string;
  duration: string;
  pdfUrl: string;
  type: string;
  status: string;
  criticalCount: number;
  score: number;
  categories: SingleAuditCategoryScores;
  audits: SingleAuditDetails;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type PaginationInfo = {
  next: string | null;
  prev: string | null;
};

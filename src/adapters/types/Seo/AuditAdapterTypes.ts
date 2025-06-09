export type AuditOverviewData = {
  totalAudits: number;
  completedAudits: number;
  avgDuration: number;
  totalIssues: number;
  avgImprovement: number;
};

export type AllAuditsResponse = {
  data: AuditItem[];
  info: {
    next: string | null;
    prev: string | null;
  };
};

type AuditItem = {
  ownerId: string;
  projectId: Project;
  duration: string;
  type: string;
  status: string;
  criticalCount: number;
  score: number;
  categories: Categories;
  audits: Record<string, AuditDetail>;
  createdAt: string;
  updatedAt: string;
  id: string;
};

type Project = {
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
  id: string;
};

type Categories = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type AuditDetail = {
  score: number;
  description: string;
  displayValue?: string;
};

export type AuditListItem = {
  id: number;
  project: string;
  date: string;
  time: string;
  score: number;
  previousScore: number;
  status: string;
  issues: number;
  duration: string;
  change: string;
  type: string;
};

export type CreateAuditResponse = {
  message: string;
  data: {
    ownerId: string;
    projectId: string;
    duration: string;
    type: string;
    status: string;
    criticalCount: number;
    score: number;
    categories: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    };
    audits: {
      [key: string]: {
        score: number;
        description: string;
        displayValue?: string;
      };
    };
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  fake: {
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
    id: string;
  }[];
};

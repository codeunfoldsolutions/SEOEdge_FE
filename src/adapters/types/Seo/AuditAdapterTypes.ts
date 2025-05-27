export type AuditOverviewData = {
  totalAudits: number;
  completedAudits: number;
  avgDuration: number;
  totalIssues: number;
  avgImprovement: number;
};

export type AllAuditsResponse = {
  data: [];
  info: {
    next: string | null;
    prev: string | null;
  };
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

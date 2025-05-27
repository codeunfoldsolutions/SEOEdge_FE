export type ProjectOverviewData = {
  totalProjects: number;
  activeProjects: number;
  totalIssues: number;
  averageScore: number;
};

export type ProjectListItem = {
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

export type AllProjectsResponse = {
  data: ProjectListItem[];
  info: {
    prev: string | null;
    next: string | null;
  };
};

export type ProjectCreate = {
  url: string;
  title: string;
  description: string;
  type: "blog" | "ecommerce" | "business" | "other";
};

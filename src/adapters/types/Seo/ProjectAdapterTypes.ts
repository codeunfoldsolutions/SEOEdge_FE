export type ProjectOverviewResponse = {
  message: string;
  data: {
    totalProjects: number;
    activeProjects: number;
    totalIssues: number;
    averageScore: number;
  };
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

export type SingleProject = {
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

export type CreateProjectResponse = {
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

export type DashboardProjectResponse = {
  message: string;
  data: SingleProject[];
  info: PaginationInfo;
};

export type PaginationInfo = {
  next: number | null;
  prev: number | null;
};

export type SingleProjectResponse = {
  message: string;
  data: SingleProject[];
};

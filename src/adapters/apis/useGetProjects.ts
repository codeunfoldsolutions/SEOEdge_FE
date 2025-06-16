import { SeoProject } from "../SeoProjectAdapter";
import {
  AllProjectsResponse,
  DashboardProjectResponse,
  ProjectOverviewResponse,
} from "../types/Seo/ProjectAdapterTypes";
import TanstackWrapper from "../utils/tanstack-wrapper";

export const projectMutation = TanstackWrapper.mutation;
const projectQuery = TanstackWrapper.query;

export const ProjectQuery = <T>(path: string, key: string) => {
  return projectQuery({
    queryKey: [key],
    queryCallback: () => SeoProject.getProjectData<T>(path),
    enabled: !!path,
  });
};

const useGetProjects = () => {
  const {
    data: projectsData,
    isLoading: loadingProjects,
    isSuccess: ProjectsFetched,
  } = ProjectQuery<AllProjectsResponse>("/project/all", "projects");

  const {
    data: projectOverviewData,
    isLoading: loadingProjectsOverview,
    isSuccess: ProjectsOverviewFetched,
  } = ProjectQuery<ProjectOverviewResponse>(
    "/project/overview",
    "projectOverview"
  );

  const {
    data: dashboardProjectData,
    isLoading: loadingDashboardProjects,
    isSuccess: dashboardProjectsFetched,
  } = ProjectQuery<DashboardProjectResponse>(
    "/dashboard/project",
    "dashboardProjects"
  );

  const projects = ProjectsFetched ? projectsData?.data : [];

  const projectsOverview = ProjectsOverviewFetched
    ? projectOverviewData.data
    : undefined;

  const dashboardprojects = dashboardProjectsFetched
    ? dashboardProjectData.data
    : [];

  return {
    projects,
    loadingProjects,
    ProjectsFetched,

    projectsOverview,
    loadingProjectsOverview,
    ProjectsOverviewFetched,

    dashboardprojects,
    loadingDashboardProjects,
    dashboardProjectsFetched,
  };
};

export default useGetProjects;

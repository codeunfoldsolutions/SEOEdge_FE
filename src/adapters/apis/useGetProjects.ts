import { SeoProject, useSeoProjectQuery } from "@/adapters/SeoProjectAdapter";

const UseGetProjects = () => {
  const {
    data: projectsOverviewData,
    isLoading: isProjectsOverviewLoading,
    isError: isProjectsOverviewError,
    isSuccess: isProjectsOverviewSuccess,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getProjectOverview,
    queryKey: ["projectOverview" + new Date().toISOString()],
  });

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isSuccess: isProjectsSuccess,
    isError: isProjectsError,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getAllProject,
    queryKey: ["projects" + new Date().toISOString()],
  });

  const {
    data: dashboardProjectsData,
    isLoading: isDashboardProjectsLoading,
    isSuccess: isDashboardProjectsSuccess,
    isError: isDashboardProjectsError,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getAllProject,
    queryKey: ["dashboardProjects" + new Date().toISOString()],
  });

  const projectsOverview = isProjectsOverviewSuccess
    ? projectsOverviewData?.data
    : undefined;

  const projects = isProjectsSuccess ? projectsData?.data : [];

  const dashboardProjects = isDashboardProjectsSuccess
    ? dashboardProjectsData?.data
    : [];

  return {
    projects,
    projectsOverview,
    dashboardProjects,
    isProjectsOverviewLoading,
    isProjectsOverviewError,
    isProjectsLoading,
    isProjectsError,
    isDashboardProjectsLoading,
    isDashboardProjectsError,
  };
};

export default UseGetProjects;

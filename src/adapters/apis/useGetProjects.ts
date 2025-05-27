import { SeoProject, useSeoProjectQuery } from "@/adapters/SeoProjectAdapter";
import { ProjectListItem } from "@/adapters/types/Seo/ProjectAdapterTypes";

const UseGetProjects = () => {
  const {
    data: projectsOverviewData,
    isLoading: isProjectsOverviewLoading,
    isError: isProjectsOverviewError,
    isSuccess: isProjectsOverviewSuccess,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getProjectOverview,
    queryKey: ["projectOverview"],
  });

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isSuccess: isProjectsSuccess,
    isError: isProjectsError,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getAllProject,
    queryKey: ["projects"],
  });

  const {
    data: dashboardProjectsData,
    isLoading: isDashboardProjectsLoading,
    isSuccess: isDashboardProjectsSuccess,
    isError: isDashboardProjectsError,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getAllProject,
    queryKey: ["dashboardProjects"],
  });

  const projectsOverview = isProjectsOverviewSuccess
    ? projectsOverviewData?.data
    : undefined;

  const projects: ProjectListItem[] = isProjectsSuccess
    ? projectsData?.data
    : [];

  const dashboardProjects: ProjectListItem[] = isDashboardProjectsSuccess
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

import { SeoProject, useSeoProjectQuery } from "@/adapters/SeoProjectAdapter";
import { ProjectListItem } from "@/adapters/types/Seo/ProjectAdapterTypes";

const UseGetProjects = () => {
  const {
    data: overviewData,
    isLoading: isOverviewLoading,
    isError,
    isSuccess: isOverviewSuccess,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getProjectOverview,
    queryKey: ["overview"],
  });

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isSuccess: isProjectsSuccess,
  } = useSeoProjectQuery({
    queryCallback: SeoProject.getAllProject,
    queryKey: ["projects"],
  });

  const overview = isOverviewSuccess ? overviewData?.data : undefined;

  const projects: ProjectListItem[] = isProjectsSuccess
    ? projectsData?.data
    : [];

  return {
    overview,
    isOverviewLoading,
    isProjectsLoading,
    isError,
    projects,
  };
};

export default UseGetProjects;

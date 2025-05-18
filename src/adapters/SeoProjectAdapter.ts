import ApiService from "./utils/api-service";
import TanstackWrapper from "./utils/tanstack-wrapper";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";
import {
  AllProjectsResponse,
  ProjectOverviewData,
} from "./types/Seo/ProjectAdapterTypes";

import { ProjectCreate } from "./types/Seo/ProjectAdapterTypes";

const projectService = new ApiService("/seo");
const useSeoProjectMutation = TanstackWrapper.mutation;
const useSeoProjectQuery = TanstackWrapper.query;

const SeoProject = {
  getProjectOverview: async () => {
    const response = await projectService.fetch<{ data: ProjectOverviewData }>(
      "/project/overview"
    );
    return response;
  },

  getAllProject: async () => {
    const response = await projectService.fetch<AllProjectsResponse>(
      `/projects/all`
    );
    return response;
  },

  createProject: async ({ payload }: MutationCallBackArgs<ProjectCreate>) => {
    const response = await projectService.mutate({
      slug: `project/create`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

export { SeoProject, useSeoProjectMutation, useSeoProjectQuery };

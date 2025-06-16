// import ApiService from "./utils/api-service";
// import TanstackWrapper from "./utils/tanstack-wrapper";
// import { MutationCallBackArgs } from "./types/TanstackUtilTypes";
// import {
//   AllProjectsResponse,
//   ProjectOverviewData,
//   CreateProjectResponse,
//   SingleProjectrResponse,
//   ProjectCreate,
// } from "./types/Seo/ProjectAdapterTypes";

// const projectService = new ApiService("/seo");
// const useSeoProjectMutation = TanstackWrapper.mutation;
// const useSeoProjectQuery = TanstackWrapper.query;

// const SeoProject = {
//   getProjectOverview: async () => {
//     const response = await projectService.fetch<{ data: ProjectOverviewData }>(
//       "/project/overview"
//     );
//     return response;
//   },

//   getAllProject: async () => {
//     const response = await projectService.fetch<AllProjectsResponse>(
//       "/project/all"
//     );
//     return response;
//   },

//   getSingleProject: async (id: string) => {
//     const response = await projectService.fetch<SingleProjectrResponse>(
//       `/project/${id}`
//     );
//     return response;
//   },

//   getProjectForDashboard: async () => {
//     const response = await projectService.fetch<AllProjectsResponse>(
//       "/dashboard/project"
//     );
//     return response;
//   },

//   createProject: async ({ payload }: MutationCallBackArgs<ProjectCreate>) => {
//     const response = await projectService.mutate<
//       ProjectCreate,
//       CreateProjectResponse
//     >({
//       slug: "project/create",
//       payload,
//       type: "JSON",
//       method: "POST",
//     });
//     return response;
//   },
// };

// export { SeoProject, useSeoProjectMutation, useSeoProjectQuery };

import ApiService from "./utils/api-service";

import {
  CreateProjectResponse,
  ProjectCreate,
} from "./types/Seo/ProjectAdapterTypes";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";

const projectService = new ApiService("/seo");

export const SeoProject = {
  getProjectData: async <T>(path: string): Promise<T> => {
    const response = await projectService.fetch<T>(path || ``);
    return response;
  },

  createProject: async ({ payload }: MutationCallBackArgs<ProjectCreate>) => {
    const response = await projectService.mutate<
      ProjectCreate,
      CreateProjectResponse
    >({
      slug: "project/create",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

import ApiService from "./utils/api-service";
import TanstackWrapper from "./utils/tanstack-wrapper";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";

import {
  AllAuditsResponse,
  AuditOverviewData,
} from "./types/Seo/AuditAdapterTypes";

const auditService = new ApiService("/seo");
const useSeoAuditMutation = TanstackWrapper.mutation;
const useSeoAuditQuery = TanstackWrapper.query;

const SeoAudit = {
  getAuditsOverview: async () => {
    const response = await auditService.fetch<{ data: AuditOverviewData }>(
      "/audits/overview"
    );
    return response;
  },

  getAllAudits: async () => {
    const response = await auditService.fetch<AllAuditsResponse>(`/audits/all`);
    return response;
  },

  // createProject: async ({ payload }: MutationCallBackArgs<ProjectCreate>) => {
  //   const response = await auditService.mutate({
  //     slug: `project/create`,
  //     payload,
  //     type: "JSON",
  //     method: "POST",
  //   });
  //   return response;
  // },
};

export { SeoAudit, useSeoAuditMutation, useSeoAuditQuery };

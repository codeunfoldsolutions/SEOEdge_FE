import ApiService from "./utils/api-service";
import TanstackWrapper from "./utils/tanstack-wrapper";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";

import {
  AllAuditsResponse,
  AuditOverviewData,
  CreateAuditResponse,
} from "./types/Seo/AuditAdapterTypes";

const auditService = new ApiService("/seo/audits");
const useSeoAuditMutation = TanstackWrapper.mutation;
const useSeoAuditQuery = TanstackWrapper.query;

const SeoAudit = {
  getAuditsOverview: async () => {
    const response = await auditService.fetch<{ data: AuditOverviewData }>(
      "/overview"
    );
    return response;
  },

  getAllAudits: async () => {
    const response = await auditService.fetch<AllAuditsResponse>(`/all`);
    return response;
  },

  createAudit: async (slug: string) => {
    const response = await auditService.mutate<{}, CreateAuditResponse>({
      slug,
      payload: {},
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

export { SeoAudit, useSeoAuditMutation, useSeoAuditQuery };

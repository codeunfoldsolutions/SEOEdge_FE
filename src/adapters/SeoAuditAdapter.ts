import ApiService from "./utils/api-service";

import { CreateAuditResponse } from "./types/Seo/AuditAdapterTypes";

const auditService = new ApiService("/seo/audits");

const SeoAudit = {
  getAuditData: async <T>(path: string): Promise<T> => {
    const response = await auditService.fetch<T>(path || ``);
    return response;
  },

  createAudit: async (slug: string) => {
    const response = await auditService.mutate<undefined, CreateAuditResponse>({
      slug,
      payload: undefined,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

export { SeoAudit };

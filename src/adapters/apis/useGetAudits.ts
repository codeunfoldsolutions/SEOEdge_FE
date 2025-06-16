import { SeoAudit } from "../SeoAuditAdapter";
import { UseQueryOptions } from "@tanstack/react-query";
import {
  AllAuditsResponse,
  AuditOverviewResponse,
  SingleProjectAuditResponse,
} from "../types/Seo/AuditAdapterTypes";
import TanstackWrapper from "../utils/tanstack-wrapper";

const auditMutation = TanstackWrapper.mutation;
const auditQuery = TanstackWrapper.query;

export const AuditQuery = <T>(path: string, key: string) => {
  return auditQuery({
    queryKey: [key],
    queryCallback: () => SeoAudit.getAuditData<T>(path),
    enabled: !!path,
  });
};

export const useCreateAudit = (params: string) => {
  return auditMutation({
    mutationCallback: () => SeoAudit.createAudit(params),
    onSuccess: () => {},
  });
};

const useGetAudits = () => {
  const {
    data: auditsData,
    isLoading: loadingAudits,
    isSuccess: auditsFetched,
  } = AuditQuery<AllAuditsResponse>("/all", "allAudits");

  const {
    data: auditsOverviewData,
    isLoading: loadingAuditsOverview,
    isSuccess: auditsOverviewFetched,
  } = AuditQuery<AuditOverviewResponse>("/overview", "auditOverview");

  const getSingleProjectAudits = (projectId: string) =>
    AuditQuery<SingleProjectAuditResponse>(
      `/${projectId}`,
      "singleProjectAudits"
    );

  const audits = auditsFetched ? auditsData?.data : [];

  const auditOverview = auditsOverviewFetched ? auditsOverviewData : undefined;

  return {
    audits,
    loadingAudits,
    auditsFetched,

    auditOverview,
    loadingAuditsOverview,
    auditsOverviewFetched,

    getSingleProjectAudits,
  };
};

export default useGetAudits;

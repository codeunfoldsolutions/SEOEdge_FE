import { SeoAudit } from "../SeoAuditAdapter copy";
import { AuditListItem } from "../types/Seo/AuditAdapterTypes";
import TanstackWrapper from "../utils/tanstack-wrapper";

const useSeoAuditQuery = TanstackWrapper.query;

const UseGetAudits = () => {
  const {
    data: auditOverviewData,
    isLoading: isAuditsOverviewLoading,
    isError,
    isSuccess: isAuditsOverviewSuccess,
  } = useSeoAuditQuery({
    queryCallback: SeoAudit.getAuditsOverview,
    queryKey: ["auditOverview"],
  });

  const {
    data: auditsData,
    isLoading: isAuditsLoading,
    isSuccess: isAuditsSuccess,
  } = useSeoAuditQuery({
    queryCallback: SeoAudit.getAllAudits,
    queryKey: ["audits"],
  });

  const auditsOverview = isAuditsOverviewSuccess
    ? auditOverviewData?.data
    : undefined;

  const audits: AuditListItem[] = isAuditsSuccess ? auditsData?.data : [];

  return {
    auditsOverview,
    isAuditsOverviewLoading,
    isAuditsLoading,
    isError,
    audits,
  };
};

export default UseGetAudits;

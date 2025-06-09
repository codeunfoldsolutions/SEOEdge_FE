import { SeoAudit } from "../SeoAuditAdapter";
import TanstackWrapper from "../utils/tanstack-wrapper";

const useSeoAuditQuery = TanstackWrapper.query;
const useSeoAuditMutation = TanstackWrapper.mutation;

const UseGetAudits = () => {
  // Additional queries for audits overview and all audits
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
    queryKey: ["allaudits" + new Date().toISOString()],
  });

  const {
    mutate: createNewAudit,
    data: createAuditData,
    isSuccess: isCreateAuditSuccess,
    isError: isCreateAuditError,
    isPending: isCreateAuditPending,
  } = useSeoAuditMutation({
    mutationCallback({ payload, params }) {
      return SeoAudit.createAudit(params || "");
    },
  });

  const auditsOverview = isAuditsOverviewSuccess
    ? auditOverviewData?.data
    : undefined;

  const audits = isAuditsSuccess ? auditsData?.data : [];

  return {
    auditsOverview,
    isAuditsOverviewLoading,
    isAuditsLoading,
    isError,
    audits,

    // add these to expose mutation to components
    createNewAudit,
    createAuditData,
    isCreateAuditSuccess,
    isCreateAuditError,
    isCreateAuditPending,
  };
};

export default UseGetAudits;

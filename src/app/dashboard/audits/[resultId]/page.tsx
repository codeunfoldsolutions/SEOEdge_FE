"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Download,
  FileText,
  Globe,
  Loader2,
  RefreshCw,
  Tag,
  ThumbsUp,
  Zap,
  ImageIcon,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CriticalIssues } from "@/components/audit/critical-issues";
import { ScoreOverview } from "@/components/audit/score-overview";
import { GuestCTA } from "@/components/audit/guest-cta";
import { Recommendations } from "@/components/audit/recommendations";
import LoadingFallback from "@/components/ui/loading-fallback";
import useGetAudits from "@/adapters/apis/useGetAudits";
import { AllAuditRecord } from "@/adapters/types/Seo/AuditAdapterTypes";

export default function Project() {
  const { resultId } = useParams() as { resultId: string };

  const { createNewAudit, isCreateAuditPending, audits, loadingAudits } =
    useGetAudits();

  const data = audits?.find(
    (item): item is AllAuditRecord => item.id === resultId
  );

  if (loadingAudits) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingFallback size="lg" variant="bars" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground">
          Project not found or data is unavailable.
        </p>
      </div>
    );
  }

  const handleCreateAudit = () => {
    createNewAudit({ payload: null, params: data.projectId.id });
  };

  const auditDetails = {
    pagesScanned: 48,
    isGuest: true,
  };

  const criticalIssues = [
    {
      name: "Missing Meta Descriptions",
      category: "SEO",
      icon: Tag,
      count: 12,
      impact: "High",
    },
    {
      name: "Slow Page Load Speed",
      category: "Performance",
      icon: Zap,
      count: 8,
      impact: "High",
    },
    {
      name: "Broken Links",
      category: "Technical",
      icon: LinkIcon,
      count: 15,
      impact: "Medium",
    },
    {
      name: "Missing Alt Tags",
      category: "Accessibility",
      icon: ImageIcon,
      count: 23,
      impact: "Medium",
    },
    {
      name: "Duplicate Content",
      category: "Content",
      icon: FileText,
      count: 4,
      impact: "Low",
    },
  ];

  const recommendations = [
    {
      title: "Fix Missing Meta Descriptions",
      description:
        "Add unique meta descriptions to 8 pages that are missing them",
      impact: "High",
      category: "SEO",
      effort: "Medium",
      priority: "High",
      status: "Open",
      details:
        "Meta descriptions are crucial for SEO as they appear in search results and influence click-through rates. Each page should have a unique, compelling meta description between 120-158 characters that accurately summarizes the page content and includes relevant keywords.",
    },
    // Add more items here...
  ];

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={26} className="text-gray" />
              <h1 className="text-2xl font-bold">
                {data.projectId.url.replace("https://", "")}
              </h1>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="ml-2">
                {new Date(data.createdAt).toLocaleDateString()}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Duration: {data.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText size={14} />
                  <span>Pages scanned: {auditDetails.pagesScanned}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={data.pdfUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    passHref
                  >
                    <Button variant="outline" size="icon">
                      <Download size={18} />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download PDF Report</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              onClick={handleCreateAudit}
              disabled={isCreateAuditPending}
              className="gap-1"
            >
              {isCreateAuditPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Audit...
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  <span>Run New Audit</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Score Overview */}
        <ScoreOverview data={data} />

        {/* Critical Issues */}
        <CriticalIssues issues={criticalIssues} showDetailedView={false} />

        {/* Tabs */}
        <Tabs defaultValue="seo" className="mb-8">
          <TabsList className="mb-4 grid grid-cols-5 md:w-auto w-full">
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="seo">
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="text-lg font-bold mb-4">SEO Analysis</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="meta-tags">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    <span>Meta Tags</span>
                    <AccordionTrigger className="hover:no-underline">
                      <Badge className="ml-2 bg-danger/20 text-danger border-danger/20">
                        Needs Improvement
                      </Badge>
                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Title Tags
                          </span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <Progress
                          value={85}
                          className="h-2"
                          indicatorClassName="bg-success"
                        />
                        <p className="text-xs text-gray mt-1">
                          12 pages with optimized titles, 3 need improvement
                        </p>
                      </div>
                      {/* Additional items... */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="p-4 border rounded">
              Performance content goes here
            </div>
          </TabsContent>

          <TabsContent value="accessibility">
            <div className="p-4 border rounded">
              Accessibility content goes here
            </div>
          </TabsContent>

          <TabsContent value="best-practices">
            <div className="p-4 border rounded">
              Best Practices content goes here
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="p-4 border rounded">Security content goes here</div>
          </TabsContent>
        </Tabs>

        {/* Guest CTA */}
        {auditDetails.isGuest && <GuestCTA />}

        {/* Recommendations */}
        <Recommendations recommendations={recommendations} />
      </div>
    </main>
  );
}

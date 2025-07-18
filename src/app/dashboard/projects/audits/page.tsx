"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  BookmarkPlus,
  Clock,
  Download,
  FileText,
  Globe,
  ImageIcon,
  LinkIcon,
  Loader2,
  RefreshCw,
  Share2,
  Tag,
  ThumbsUp,
  Zap,
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

// Import components
import { CriticalIssues } from "@/components/audit/critical-issues";
import { ScoreOverview } from "@/components/audit/score-overview";
import { GuestCTA } from "@/components/audit/guest-cta";
import { Recommendations } from "@/components/audit/recommendations";
import { SelectGroup } from "@radix-ui/react-select";
import { sl } from "date-fns/locale";
import useGetAudits from "@/adapters/apis/useGetAudits";
import LoadingFallback from "@/components/ui/loading-fallback";

export default function Project() {
  const [showSidebar, setshowSidebar] = useState(true);

  const { auditresult } = useParams() as { auditresult: string };

  const {
    createNewAudit,
    isCreateAuditPending,
    isCreateAuditSuccess,
    isCreateAuditError,
    createAuditData,
  } = useGetAudits();

  const handleCreateAudit = () => {
    createNewAudit({ payload: null, params: auditresult });
  };

  //////////////////////////////// get all audits for the project
  const { getSingleProjectAudits } = useGetAudits();

  const {
    data: auditData,
    isLoading: auditsLoading,
    isSuccess: auditsFetched,
    isError: auditsError,
  } = getSingleProjectAudits(auditresult);

  const data = auditsFetched ? auditData : undefined;

  const response = data?.data.find((item) => item.id === auditresult);

  console.log(response);

  ////////// // Mock data for the audit details
  const auditDetails = {
    url: "https://www.example.com",
    date: new Date().toLocaleString(),
    duration: "1m 42s",
    pagesScanned: 48,
    isGuest: true, // This would determine if the user is a guest or registered user
    auditsRemaining: 2, // For guest users
  };

  // Overall score and category scores
  const scores = {
    overall: 72,
    seo: 78,
    performance: 65,
    accessibility: 92,
    bestPractices: 81,
    security: 85,
  };

  // Critical issues found in the audit
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

  // Recommendations for the audit
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
    {
      title: "Optimize Images",
      description:
        "Compress and resize images to reduce page load time (potential savings: 800KB)",
      impact: "High",
      category: "Performance",
      effort: "Medium",
      priority: "High",
      status: "Open",
      details:
        "Large images are significantly impacting your page load times. Compress all images using a tool like TinyPNG or ImageOptim, resize images to the actual dimensions needed for display, and consider implementing lazy loading for images below the fold.",
    },
    {
      title: "Fix Broken Links",
      description: "Repair or remove 15 broken links found across the site",
      impact: "Medium",
      category: "Technical",
      effort: "Medium",
      priority: "Medium",
      status: "Open",
      details:
        "Broken links create a poor user experience and can negatively impact your SEO. Update or remove all broken links, and consider implementing a 301 redirect strategy for any pages that have been permanently moved or deleted.",
    },
    {
      title: "Add Alt Text to Images",
      description: "Add descriptive alt text to 23 images missing it",
      impact: "Medium",
      category: "Accessibility",
      effort: "Low",
      priority: "Medium",
      status: "Open",
      details:
        "Alt text is essential for accessibility and also provides SEO benefits. Add descriptive, keyword-rich alt text to all images that conveys the image content and purpose. Keep alt text concise (under 125 characters) and relevant to the page content.",
    },
    {
      title: "Implement Security Headers",
      description:
        "Add Content-Security-Policy and improve other security headers",
      impact: "Medium",
      category: "Security",
      effort: "High",
      priority: "Medium",
      status: "Open",
      details:
        "Implementing proper security headers protects your site from various attacks and demonstrates to search engines that your site is secure. Add Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, and Strict-Transport-Security headers to your server configuration.",
    },
  ];

  if (auditsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingFallback size="lg" variant="bars" />;
      </div>
    );
  }
  if (auditsError || response === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground">Some thing went wrong</p>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Audit Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={26} className="text-gray" />

              <h1 className="text-2xl font-bold">{auditresult}</h1>
            </div>

            <div className="flex  items-center gap-2 mt-2">
              <Badge className="ml-2">
                {new Date(response.createdAt).toLocaleDateString()}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Duration: {response.duration}</span>
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
                  <Button variant="outline" size="icon">
                    <Download size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download PDF Report</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Share2 size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share Results</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            <Button
              onClick={() => handleCreateAudit()}
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

            {/* <Button className="gap-1">
              <RefreshCw size={16} />
              <span>Run New Audit</span>
            </Button> */}
          </div>
        </div>

        {/* Overall Score */}
        <ScoreOverview data={response} />

        {/* Critical Issues */}
        <CriticalIssues issues={criticalIssues} showDetailedView={false} />

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="seo" className="mb-8">
          <TabsList className="mb-4 grid grid-cols-5 md:w-auto w-full">
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="seo">
            {/* SEO tab content */}
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

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Meta Descriptions
                          </span>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <Progress
                          value={65}
                          className="h-2"
                          indicatorClassName="bg-warning"
                        />
                        <p className="text-xs text-gray mt-1">
                          8 pages missing meta descriptions, 7 need improvement
                        </p>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <ThumbsUp size={16} className="text-primary" />
                          Recommendations
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>
                              Add unique meta descriptions to all pages (8
                              missing)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>
                              Optimize meta descriptions to be between 120-158
                              characters
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>
                              Include primary keywords in meta descriptions
                            </span>
                          </li>
                        </ul>
                      </div>

                      {auditDetails.isGuest && (
                        <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10 text-center">
                          <p className="text-sm text-gray mb-2">
                            Sign up to see affected pages and detailed
                            recommendations
                          </p>
                          <Button size="sm">Sign Up Now</Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Additional accordion items for SEO analysis */}
                {/* ... */}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            {/* Performance tab content */}
            {/* ... */}
          </TabsContent>

          <TabsContent value="accessibility">
            {/* Accessibility tab content */}
            {/* ... */}
          </TabsContent>

          <TabsContent value="best-practices">
            {/* Best Practices tab content */}
            {/* ... */}
          </TabsContent>

          <TabsContent value="security">
            {/* Security tab content */}
            {/* ... */}
          </TabsContent>
        </Tabs>

        {/* Call to Action for Guest Users */}
        {auditDetails.isGuest && <GuestCTA />}

        {/* Recommendations Summary */}
        <Recommendations recommendations={recommendations} />
      </div>
    </main>
  );
}

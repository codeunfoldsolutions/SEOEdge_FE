"use client";

import { useState } from "react";
import {
  BookmarkPlus,
  Clock,
  Download,
  FileText,
  Globe,
  ImageIcon,
  LinkIcon,
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
import { SeoAudit, useSeoAuditQuery } from "@/adapters/SeoAuditAdapter";
import { SelectGroup } from "@radix-ui/react-select";
import { sl } from "date-fns/locale";
import UseGetAudits from "@/adapters/apis/useGetAudits";

// interface ProjectPageProps {
//   params: {
//     project: string;
//   };
// }

export default async function AuditResults({
  params,
}: {
  params: Promise<{ resultId: string }>;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const { resultId } = await params;

  // const {
  //   data: createAuditData,
  //   isLoading: creatAuditLoading,
  //   isSuccess: createAuditSuccess,
  // } = useSeoAuditQuery({
  //   queryCallback: () => SeoAudit.createAudit(project),
  //   queryKey: ["createAudit"],
  // });

  // console.log(createAuditSuccess ? createAuditData : "did not work");

  // Audit details - would come from API in a real app
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

  const apiResponse = {
    message: "New Audit created successfully",
    data: {
      ownerId: "681e4cc2e6c62f089c634fdc",
      projectId: "6824c5fdf09379ba8608fad3",
      duration: "8433",
      type: "manual",
      status: "completed",
      criticalCount: 71,
      score: 0.76,
      categories: {
        performance: 0.97,
        accessibility: 0.93,
        bestPractices: 1,
        seo: 0.83,
      },
      audits: {
        "is-on-https": {
          score: 1,
          description:
            "All sites should be protected with HTTPS, even ones that don't handle sensitive data.",
        },
        "redirects-http": {
          score: 0,
          description:
            "Make sure that you redirect all HTTP traffic to HTTPS in order to enable secure web features for all your users.",
        },
        viewport: {
          score: 1,
          description:
            'A `<meta name="viewport">` not only optimizes your app for mobile screen sizes, but also prevents [a 300 millisecond delay to user input](https://developer.',
        },
        "first-contentful-paint": {
          score: 0.84,
          description:
            "First Contentful Paint marks the time at which the first text or image is painted.",
          displayValue: "2.0 s",
        },
        "first-meaningful-paint": {
          score: 0,
          description:
            "First Meaningful Paint measures when the primary content of a page is visible.",
        },
        speedIndex: {
          score: 0.99,
          description:
            "Speed Index shows how quickly the contents of a page are visibly populated.",
          displayValue: "2.0 s",
        },
        "errors-in-console": {
          score: 1,
          description:
            "Errors logged to the console indicate unresolved problems.",
        },
        interactive: {
          score: 0.97,
          description:
            "Time to Interactive is the amount of time it takes for the page to become fully interactive.",
          displayValue: "2.7 s",
        },
        "bootup-time": {
          score: 1,
          description:
            "Consider reducing the time spent parsing, compiling, and executing JS.",
          displayValue: "0.3 s",
        },
      },
      createdAt: "2025-06-05T05:54:38.465Z",
      updatedAt: "2025-06-05T05:54:38.465Z",
      id: "6841311ea75529e5fd7bb08d",
    },
    fake: [
      {
        ownerId: "681e4cc2e6c62f089c634fdc",
        url: "https://www.google.com",
        title: "Google",
        active: true,
        score: 0.76,
        description: "Some dummy description",
        criticalCount: 71,
        keywords: [],
        createdAt: "2025-05-14T16:34:05.644Z",
        updatedAt: "2025-06-05T05:54:38.627Z",
        id: "6824c5fdf09379ba8608fad3",
      },
    ],
  };

  return (
    <>
      {/* Header */}
      {/* <AuditHeader
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar}
        auditDetails={auditDetails}
      /> */}

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Audit Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Audit Results</h1>

              <div className="flex items-center gap-2">
                <Globe size={16} className="text-gray" />

                <p className="text-gray font-medium">{auditDetails.url}</p>
                <Badge className="ml-2">
                  {new Date(apiResponse.data.createdAt).toLocaleDateString()}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Duration: {apiResponse.data.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText size={14} />
                  <span>Pages scanned: {auditDetails.pagesScanned}</span>
                  <h1>Product: {resultId}</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <BookmarkPlus size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save Audit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}

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

              <TooltipProvider>
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
              </TooltipProvider>

              <Button className="gap-1">
                <RefreshCw size={16} />
                <span>Run New Audit</span>
              </Button>
            </div>
          </div>

          {/* Overall Score */}
          <ScoreOverview data={apiResponse.data} />

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
                            8 pages missing meta descriptions, 7 need
                            improvement
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
    </>
  );
}

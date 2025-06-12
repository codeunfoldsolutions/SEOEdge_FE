"use client";

import { useState } from "react";
import { Clock, FileText, ImageIcon, LinkIcon, Tag, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import { AuditHeader } from "@/components/audit/header";
import { ScoreOverview } from "@/components/audit/score-overview";
import { CriticalIssues } from "@/components/audit/critical-issues";
import { CompetitorComparison } from "@/components/audit/competitor-comparison";
import { PageAnalysis } from "@/components/audit/page-analysis";
import { Recommendations } from "@/components/audit/recommendations";

export default function PremiumAuditResults() {
  // State for various UI elements
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedAuditDate, setSelectedAuditDate] = useState(
    "Current (Aug 15, 2023)"
  );
  const [selectedCompareDate, setSelectedCompareDate] =
    useState("Jul 30, 2023");

  // Audit details - would come from API in a real app
  const auditDetails = {
    url: "https://www.example.com",
    date: "Aug 15, 2023",
    duration: "1m 42s",
    pagesScanned: 48,
    subscription: "Professional",
    team: [
      {
        name: "Darcy Liu",
        role: "Owner",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Alex Johnson",
        role: "Editor",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Maria Garcia",
        role: "Viewer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  };

  //////////////////////////////api response data//////////////////////////////

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

  // Overall score and category scores
  const scores = {
    overall: 72,
    seo: 78,
    performance: 65,
    accessibility: 92,
    bestPractices: 81,
    security: 85,
  };

  // Historical scores for comparison
  const historicalScores = [
    {
      date: "Aug 15, 2023",
      overall: 72,
      seo: 78,
      performance: 65,
      accessibility: 92,
      bestPractices: 81,
      security: 85,
    },
    {
      date: "Jul 30, 2023",
      overall: 68,
      seo: 75,
      performance: 62,
      accessibility: 90,
      bestPractices: 79,
      security: 82,
    },
    {
      date: "Jul 15, 2023",
      overall: 65,
      seo: 72,
      performance: 60,
      accessibility: 88,
      bestPractices: 77,
      security: 80,
    },
    {
      date: "Jun 30, 2023",
      overall: 63,
      seo: 70,
      performance: 58,
      accessibility: 85,
      bestPractices: 75,
      security: 78,
    },
  ];

  // Competitor data
  const competitors = [
    { name: "competitor1.com", score: 80 },
    { name: "competitor2.com", score: 75 },
    { name: "competitor3.com", score: 68 },
  ];

  // Critical issues found in the audit
  const criticalIssues = [
    {
      name: "Missing Meta Descriptions",
      category: "SEO",
      icon: Tag,
      count: 12,
      impact: "High",
      pages: [
        "Home",
        "About",
        "Products",
        "Blog",
        "Contact",
        "Services",
        "Team",
        "Careers",
        "FAQ",
        "Privacy Policy",
        "Terms of Service",
        "Sitemap",
      ],
    },
    {
      name: "Slow Page Load Speed",
      category: "Performance",
      icon: Zap,
      count: 8,
      impact: "High",
      pages: [
        "Products",
        "Blog",
        "Services",
        "Team",
        "Gallery",
        "Resources",
        "Downloads",
        "Support",
      ],
    },
    {
      name: "Broken Links",
      category: "Technical",
      icon: LinkIcon,
      count: 15,
      impact: "Medium",
      pages: [
        "Blog",
        "Resources",
        "Downloads",
        "Support",
        "Documentation",
        "Tutorials",
        "Case Studies",
        "Testimonials",
        "Partners",
        "Events",
        "News",
        "Gallery",
        "FAQ",
        "Contact",
        "Sitemap",
      ],
    },
    {
      name: "Missing Alt Tags",
      category: "Accessibility",
      icon: ImageIcon,
      count: 23,
      impact: "Medium",
      pages: [
        "Home",
        "Products",
        "Blog",
        "Gallery",
        "Team",
        "Testimonials",
        "Partners",
        "Events",
        "News",
        "Case Studies",
        "Resources",
        "Downloads",
        "Support",
        "Documentation",
        "Tutorials",
      ],
    },
    {
      name: "Duplicate Content",
      category: "Content",
      icon: FileText,
      count: 4,
      impact: "Low",
      pages: ["Products", "Services", "Blog", "Resources"],
    },
  ];

  // Page-level data
  const pageData = [
    { url: "/", title: "Home", score: 85, issues: 3, status: "Good" },
    { url: "/about", title: "About Us", score: 78, issues: 5, status: "Good" },
    {
      url: "/products",
      title: "Products",
      score: 62,
      issues: 8,
      status: "Needs Improvement",
    },
    { url: "/blog", title: "Blog", score: 55, issues: 12, status: "Poor" },
    {
      url: "/contact",
      title: "Contact Us",
      score: 90,
      issues: 1,
      status: "Excellent",
    },
    {
      url: "/services",
      title: "Services",
      score: 75,
      issues: 6,
      status: "Good",
    },
    { url: "/team", title: "Our Team", score: 82, issues: 4, status: "Good" },
    {
      url: "/careers",
      title: "Careers",
      score: 88,
      issues: 2,
      status: "Excellent",
    },
    { url: "/faq", title: "FAQ", score: 80, issues: 5, status: "Good" },
    {
      url: "/privacy-policy",
      title: "Privacy Policy",
      score: 95,
      issues: 0,
      status: "Excellent",
    },
  ];

  // Keywords data
  // const keywordsData = [
  //   { keyword: "SEO tools", position: 4, volume: 5400, difficulty: "High", change: "+2" },
  //   { keyword: "website audit", position: 7, volume: 3200, difficulty: "Medium", change: "+1" },
  //   { keyword: "SEO analysis", position: 12, volume: 4800, difficulty: "High", change: "-3" },
  //   { keyword: "page optimization", position: 15, volume: 2100, difficulty: "Medium", change: "0" },
  //   { keyword: "SEO performance", position: 9, volume: 1800, difficulty: "Low", change: "+5" },
  // ]

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

  // Toggle select all pages
  const toggleSelectAllPages = () => {
    if (selectedPages.length === pageData.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(pageData.map((page) => page.url));
    }
  };

  // Toggle select page
  const toggleSelectPage = (url: string) => {
    if (selectedPages.includes(url)) {
      setSelectedPages(selectedPages.filter((page) => page !== url));
    } else {
      setSelectedPages([...selectedPages, url]);
    }
  };

  // Get comparison data
  const getComparisonData = (metric: keyof typeof scores) => {
    const current = historicalScores[0][metric];
    const previous = historicalScores[1][metric];
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);

    return {
      current,
      previous,
      change,
      percentage,
      improved: change > 0,
    };
  };

  // Prepare comparison data for all metrics
  const comparisonData = compareMode
    ? {
        overall: getComparisonData("overall"),
        seo: getComparisonData("seo"),
        performance: getComparisonData("performance"),
        accessibility: getComparisonData("accessibility"),
        bestPractices: getComparisonData("bestPractices"),
        security: getComparisonData("security"),
      }
    : undefined;

  return (
    <>
      {/* Header */}
      <AuditHeader
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        compareMode={compareMode}
        setCompareMode={setCompareMode}
        selectedAuditDate={selectedAuditDate}
        setSelectedAuditDate={setSelectedAuditDate}
        selectedCompareDate={selectedCompareDate}
        setSelectedCompareDate={setSelectedCompareDate}
        historicalScores={historicalScores}
        auditDetails={auditDetails}
        isPremium={true}
      />

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Audit Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Audit Results for {auditDetails.url}
              </h1>
              <div className="flex items-center gap-2 text-gray">
                <Clock size={16} />
                <span>Last updated: {auditDetails.date}</span>
                {compareMode && (
                  <Badge variant="outline" className="ml-2">
                    Comparing with {selectedCompareDate}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Score Overview */}
          <ScoreOverview
            data={apiResponse.data}
            compareMode={compareMode}
            onCompare={() => setCompareMode(true)}
            comparisonData={comparisonData}
            selectedCompareDate={selectedCompareDate}
          />

          {/* Competitor Comparison */}
          <CompetitorComparison
            auditDetails={auditDetails}
            scores={scores}
            competitors={competitors}
          />

          {/* Main Tabs */}
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="mb-4 grid grid-cols-6 md:w-auto w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {/* Critical Issues */}
              <CriticalIssues issues={criticalIssues} />

              {/* Other overview content would go here */}
            </TabsContent>

            <TabsContent value="issues">{/* Issues tab content */}</TabsContent>

            <TabsContent value="pages">
              <PageAnalysis
                pageData={pageData}
                selectedPages={selectedPages}
                toggleSelectAllPages={toggleSelectAllPages}
                toggleSelectPage={toggleSelectPage}
              />
            </TabsContent>

            <TabsContent value="keywords">
              {/* Keywords tab content */}
            </TabsContent>

            <TabsContent value="recommendations">
              <Recommendations recommendations={recommendations} />
            </TabsContent>

            <TabsContent value="history">
              {/* History tab content */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}

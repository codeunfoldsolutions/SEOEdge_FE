"use client";

import { act, useState } from "react";
import { Tag, Zap, LinkIcon, ImageIcon, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import { DashboardHeader } from "@/components/dashboard/header";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { ProjectsGrid } from "@/components/dashboard/projects-grid";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CriticalIssues } from "@/components/dashboard/critical-issues";
import { OverviewMetrics } from "@/components/dashboard/overview-metrics";
import { AuditHistory } from "@/components/dashboard/audit-history";
import UseGetProjects from "@/adapters/apis/useGetProjects";

export default function Dashboard() {
  const [activeProject, setActiveProject] = useState("example.com");
  const { projects } = UseGetProjects();

  // Category metrics
  const categoryMetrics = [
    {
      title: "SEO",
      value: "78/100",
      change: "+4.2%",
      trend: "up",
      icon: "Search",
      progress: 78,
    },
    {
      title: "Performance",
      value: "65/100",
      change: "-0.8%",
      trend: "down",
      icon: "Zap",
      progress: 65,
    },
    {
      title: "Accessibility",
      value: "92/100",
      change: "+2.1%",
      trend: "up",
      icon: "Smartphone",
      progress: 92,
    },
    {
      title: "Security",
      value: "85/100",
      change: "+5.4%",
      trend: "up",
      icon: "Shield",
      progress: 85,
    },
  ];

  // Critical issues
  const criticalIssues = [
    {
      name: "Missing Meta Descriptions",
      category: "SEO",
      icon: Tag,
      count: 12,
    },
    {
      name: "Slow Page Load Speed",
      category: "Performance",
      icon: Zap,
      count: 8,
    },
    { name: "Broken Links", category: "Technical", icon: LinkIcon, count: 15 },
    {
      name: "Missing Alt Tags",
      category: "Accessibility",
      icon: ImageIcon,
      count: 23,
    },
    {
      name: "Duplicate Content",
      category: "Content",
      icon: FileText,
      count: 4,
    },
  ];

  // Audit history
  const auditHistory = [
    { date: "Aug 15, 2023", score: 78, issues: 42, change: "+3" },
    { date: "Jul 30, 2023", score: 75, issues: 48, change: "+5" },
    { date: "Jul 15, 2023", score: 70, issues: 56, change: "-2" },
    { date: "Jun 30, 2023", score: 72, issues: 51, change: "+7" },
    { date: "Jun 15, 2023", score: 65, issues: 64, change: "+0" },
  ];

  return (
    <>
      {/* Header */}
      <DashboardHeader />

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <WelcomeSection userName="Darcy" />

          {/* Project Cards */}
          <ProjectsGrid projects={projects} activeProject={activeProject} />

          {/* Tabs for Active Project */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-4 bg-primary-blue/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {/* SEO Score Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <PerformanceChart
                    title="SEO Performance"
                    subtitle={`Score trend for ${activeProject}`}
                  />
                </div>

                {/* Critical Issues */}
                <div className="lg:col-span-1">
                  <CriticalIssues issues={criticalIssues} />
                </div>
              </div>

              {/* SEO Category Scores */}
              <OverviewMetrics metrics={categoryMetrics} />
            </TabsContent>

            <TabsContent value="issues">
              {/* Issues tab content would go here */}
            </TabsContent>

            <TabsContent value="performance">
              {/* Performance tab content would go here */}
            </TabsContent>

            <TabsContent value="seo">
              {/* SEO tab content would go here */}
            </TabsContent>

            <TabsContent value="content">
              {/* Content tab content would go here */}
            </TabsContent>
          </Tabs>

          {/* Audit History */}
          <AuditHistory audits={auditHistory} />
        </div>
      </main>
    </>
  );
}

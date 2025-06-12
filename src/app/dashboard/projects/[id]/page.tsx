"use client";

// import type { Metadata } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProjectAuditList } from "@/components/projects/project-audit-list";
import { ProjectProgressChart } from "@/components/projects/project-progress-chart";
import { ProjectScoreChart } from "@/components/projects/project-score-chart";

const projectData = {
  id: "proj_123456",
  url: "https://example.com",
  name: "Example Website",
  status: "active", // or "paused"
  createdAt: "2025-01-15T10:30:00Z",
  lastAuditAt: "2025-04-10T14:45:00Z",
  totalAudits: 12,
  averageScore: 76,
  audits: [
    {
      id: "audit_001",
      date: "2025-04-10T14:45:00Z",
      score: 78,
      issues: { critical: 2, moderate: 5, minor: 8 },
    },
    {
      id: "audit_002",
      date: "2025-03-15T09:20:00Z",
      score: 75,
      issues: { critical: 3, moderate: 6, minor: 7 },
    },
    {
      id: "audit_003",
      date: "2025-02-20T11:10:00Z",
      score: 72,
      issues: { critical: 4, moderate: 7, minor: 9 },
    },
    {
      id: "audit_004",
      date: "2025-01-25T16:30:00Z",
      score: 68,
      issues: { critical: 5, moderate: 8, minor: 10 },
    },
  ],
  scoreHistory: [
    { date: "Jan 2025", score: 68 },
    { date: "Feb 2025", score: 72 },
    { date: "Mar 2025", score: 75 },
    { date: "Apr 2025", score: 78 },
  ],
};

// export const metadata: Metadata = {
//   title: "Project Details | SEO Audit Tool",
//   description: "View detailed information about your SEO project",
// };

const ProjectPage = () => {
  const { id } = useParams() as { id: string };
  const isActive = true;

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className=" max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{id}</h1>
              {isActive ? (
                <Badge className="bg-success">Active</Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-warning border-warning"
                >
                  Paused
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <span>{`https://${id}.com`}</span>
              <a
                href={`https://${projectData.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Visit website</span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={isActive ? "outline" : "default"}>
              {isActive ? (
                <>
                  <PauseCircle className="mr-2 h-4 w-4" /> Pause Project
                </>
              ) : (
                <>
                  <PlayCircle className="mr-2 h-4 w-4" /> Resume Project
                </>
              )}
            </Button>
            <Button>Run New Audit</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Score</CardTitle>
              <CardDescription>Overall project performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <ProjectScoreChart score={projectData.averageScore} />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">
                      {projectData.averageScore}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      out of 100
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  {projectData.averageScore >= 80 ? (
                    <Badge className="bg-success">Good</Badge>
                  ) : projectData.averageScore >= 60 ? (
                    <Badge className="bg-warning">Needs Improvement</Badge>
                  ) : (
                    <Badge variant="destructive">Critical</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Project Stats</CardTitle>
              <CardDescription>Key project metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Created</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(projectData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last Audit</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(projectData.lastAuditAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Audits</span>
                  </div>
                  <span className="text-sm font-medium">
                    {projectData.totalAudits}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Latest Issues</CardTitle>
              <CardDescription>From most recent audit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical Issues</span>
                  <Badge variant="destructive">
                    {projectData.audits[0].issues.critical}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Moderate Issues</span>
                  <Badge className="bg-warning0">
                    {projectData.audits[0].issues.moderate}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Minor Issues</span>
                  <Badge className="bg-success">
                    {projectData.audits[0].issues.minor}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/projects/${id}${projectData.audits[0].id}`}>
                  View Latest Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="audits" className="w-full">
          <TabsList>
            <TabsTrigger value="audits">Audit History</TabsTrigger>
            <TabsTrigger value="progress">Progress Over Time</TabsTrigger>
          </TabsList>
          <TabsContent value="audits" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Audit History</h2>
              <Button>Export History</Button>
            </div>
            <Separator />
            <ProjectAuditList projectId={id} audits={projectData.audits} />
          </TabsContent>
          <TabsContent value="progress" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Score Progress</h2>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 rounded-md border border-input bg-background text-sm">
                  <option value="3months">Last 3 months</option>
                  <option value="6months">Last 6 months</option>
                  <option value="1year">Last year</option>
                  <option value="all">All time</option>
                </select>
              </div>
            </div>
            <Separator />
            <div className="h-[400px] w-full">
              <ProjectProgressChart data={projectData.scoreHistory} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProjectPage;

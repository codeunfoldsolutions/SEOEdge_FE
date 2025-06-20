"use client";

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
import { ProjectQuery } from "@/adapters/apis/useGetProjects";

import useGetAudits from "@/adapters/apis/useGetAudits";
import { SingleProjectResponse } from "@/adapters/types/Seo/ProjectAdapterTypes";
import LoadingFallback from "@/components/ui/loading-fallback";

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////

const scoreHistory = [
  { date: "2023-01-01", score: 75 },
  { date: "2023-02-01", score: 80 },
  { date: "2023-03-01", score: 78 },
  { date: "2023-04-01", score: 82 },
  { date: "2023-05-01", score: 85 },
  { date: "2023-06-01", score: 88 },
  { date: "2023-07-01", score: 90 },
];

/////////////////////////////////////////////
///////////////////////////////////////////

const ProjectPage = () => {
  const { id } = useParams() as { id: string };
  const isActive = true;
  const { getSingleProjectAudits } = useGetAudits();

  const {
    data: auditData,
    isLoading: auditsLoading,
    isSuccess: auditsFetched,
  } = getSingleProjectAudits(id);

  const { data, isLoading: projectDataLoading } =
    ProjectQuery<SingleProjectResponse>(
      `/project/${id}`,
      `singleproject-${id}`
    );

  const audit =
    auditsFetched && auditData && Array.isArray(auditData.data)
      ? auditData.data
      : [];
  const latestAudit = audit && audit.length > 0 ? audit[0] : null;

  const projectData = data?.data[0];

  if (projectDataLoading || auditsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingFallback size="lg" variant="bars" />;
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground">
          Project not found or data is unavailable.
        </p>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className=" max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {projectData.url.replace("https://", "")}
              </h1>
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
              <span>{`${projectData.url}`}</span>
              <a
                href={projectData.url}
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
                  <ProjectScoreChart score={projectData.score * 100} />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">
                      {projectData.score * 100}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      out of 100
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  {projectData.score >= 80 ? (
                    <Badge className="bg-success">Good</Badge>
                  ) : projectData.score >= 60 ? (
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
                    {new Date(projectData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last Audit</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(projectData.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Audits</span>
                  </div>
                  <span className="text-sm font-medium">
                    {projectData.auditsCount}
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
                  <span className="text-sm">Score</span>
                  <Badge className="bg-warning">
                    {latestAudit ? latestAudit.score * 100 : "N/A"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical Issues</span>
                  <Badge variant="destructive">
                    {latestAudit &&
                    typeof latestAudit.criticalCount === "number"
                      ? latestAudit.criticalCount
                      : "N/A"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Performance</span>
                  <Badge className="bg-success">
                    {latestAudit &&
                    latestAudit.categories &&
                    typeof latestAudit.categories.performance === "number"
                      ? latestAudit.categories.performance * 100
                      : "N/A"}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
                disabled={!latestAudit}
              >
                <Link
                  href={latestAudit ? `/projects/${id}${latestAudit.id}` : "#"}
                  tabIndex={!latestAudit ? -1 : undefined}
                  aria-disabled={!latestAudit}
                >
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
            <h2 className="text-xl font-semibold">Audit History</h2>

            <Separator />
            <ProjectAuditList Id={id} audits={audit} />
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
              <ProjectProgressChart data={scoreHistory} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProjectPage;

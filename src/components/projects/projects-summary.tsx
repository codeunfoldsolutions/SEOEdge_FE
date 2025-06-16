"use client";

import { Globe, AlertCircle, CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectOverviewProps {
  overview?: {
    totalProjects: number;
    activeProjects: number;
    totalIssues: number;
    averageScore: number;
  };
  isLoading: boolean;
}

export function ProjectsSummary({ overview, isLoading }: ProjectOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary">
            <Globe size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Total Projects</p>
            <p className="text-2xl font-bold">{overview?.totalProjects}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-success/10 w-10 h-10 rounded-full flex items-center justify-center text-success">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Active Projects</p>
            <p className="text-2xl font-bold">{overview?.activeProjects}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-danger/10 w-10 h-10 rounded-full flex items-center justify-center text-danger">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Total Issues</p>
            <p className="text-2xl font-bold">{overview?.totalIssues}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-warning/10 w-10 h-10 rounded-full flex items-center justify-center text-warning">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Average Score</p>

            <p className="text-2xl font-bold">
              {" "}
              {overview?.averageScore.toFixed(1)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

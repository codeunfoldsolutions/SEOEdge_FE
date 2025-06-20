"use client";

import type React from "react";

import { Globe, Download, Calendar, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  auditDetails: {
    url: string;
    date: string;
    duration: string;
    pagesScanned: number;
    subscription?: string;
    team?: Array<{
      name: string;
      role: string;
      avatar: string;
    }>;
  };
  scores: {
    overall: number;
    seo: number;
    performance: number;
    accessibility: number;
    bestPractices: number;
    security: number;
  };
  criticalIssues: Array<{
    name: string;
    category: string;
    icon: React.ElementType;
    count: number;
    impact: string;
  }>;
}

export function ProjectViewSidebar({
  auditDetails,
  scores,
  criticalIssues,
}: SidebarProps) {
  return (
    <div className="w-[280px] border-r border-border flex flex-col bg-sidebar">
      <div className="p-4 border-b border-border">
        <div>
          <Image src={"/seoedge logo.png"} width={140} height={40} alt="Logo" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-1">Project</h2>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-gray" />
            <p className="text-gray font-medium text-sm truncate">
              {auditDetails.url}
            </p>
          </div>

          <div className="space-y-1 text-sm mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray">Date:</span>
              <span>{auditDetails.date}</span>
            </div>

            {auditDetails.subscription && (
              <div className="flex items-center justify-between">
                <span className="text-gray">Plan:</span>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/10"
                >
                  {auditDetails.subscription}
                </Badge>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Overall Score</h3>
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  scores.overall >= 80
                    ? "bg-success"
                    : scores.overall >= 60
                    ? "bg-warning"
                    : "bg-danger"
                }`}
              >
                {scores.overall}
              </div>
              <div>
                <p className="font-medium">
                  {scores.overall >= 80
                    ? "Good"
                    : scores.overall >= 60
                    ? "Average"
                    : "Poor"}
                </p>
                <p className="text-xs text-gray">out of 100</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-sm font-medium mb-2">Category Scores</h3>
            <div className="space-y-3">
              {Object.entries({
                seo: {
                  score: scores.seo,
                  icon: "Search",
                  color: "text-primary",
                },
                performance: {
                  score: scores.performance,
                  icon: "Zap",
                  color: "text-warning",
                },
                accessibility: {
                  score: scores.accessibility,
                  icon: "Smartphone",
                  color: "text-success",
                },
                bestPractices: {
                  score: scores.bestPractices,
                  icon: "Check",
                  color: "text-info",
                },
                security: {
                  score: scores.security,
                  icon: "Shield",
                  color: "text-primary",
                },
              }).map(([key, { score, icon, color }]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1 text-xs">
                    <div className="flex items-center gap-1">
                      <span className={color}>
                        {/* We'll use a simple span since we can't dynamically import icons */}
                        {icon}
                      </span>
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </div>
                    <span>{score}/100</span>
                  </div>
                  <Progress
                    value={score}
                    className="h-1.5"
                    indicatorClassName={
                      score >= 80
                        ? "bg-success"
                        : score >= 60
                        ? "bg-warning"
                        : "bg-danger"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="justify-start text-xs h-8"
          >
            <Download size={14} className="mr-1" />
            Download PDF Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start text-xs h-8"
          >
            <Calendar size={14} className="mr-1" />
            Schedule Audits
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start text-xs h-8"
          >
            <HelpCircle size={14} className="mr-1" />
            Get Help
          </Button>
        </div>
      </div>
    </div>
  );
}

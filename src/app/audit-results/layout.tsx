"use client";

import type React from "react";

import { useState } from "react";
import { AuditSidebar } from "@/components/audit/sidebar";

// This is a shared layout for all audit results pages
export default function AuditResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar] = useState(true);

  // Shared audit details for the sidebar
  const auditDetails = {
    url: "https://www.example.com",
    date: new Date().toLocaleString(),
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
      icon: () => null,
      count: 12,
      impact: "High",
    },
    {
      name: "Slow Page Load Speed",
      category: "Performance",
      icon: () => null,
      count: 8,
      impact: "High",
    },
    {
      name: "Broken Links",
      category: "Technical",
      icon: () => null,
      count: 15,
      impact: "Medium",
    },
    {
      name: "Missing Alt Tags",
      category: "Accessibility",
      icon: () => null,
      count: 23,
      impact: "Medium",
    },
    {
      name: "Duplicate Content",
      category: "Content",
      icon: () => null,
      count: 4,
      impact: "Low",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - shared across all audit results pages */}
      {showSidebar && (
        <AuditSidebar
          auditDetails={auditDetails}
          scores={scores}
          criticalIssues={criticalIssues}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}

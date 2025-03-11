"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { AuditsTable } from "@/components/audits/audits-table";
import { AuditsFilterBar } from "@/components/audits/audits-filter-bar";
import { AuditsSummary } from "@/components/audits/audits-summary";
import { ScheduleAuditModal } from "@/components/modals/schedule-audit-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AuditsPage() {
  const [activeProject, setActiveProject] = useState("example.com");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample projects
  const projects = [
    { name: "example.com", lastAudit: "2 hours ago", score: 78 },
    { name: "myshop.com", lastAudit: "1 day ago", score: 65 },
    { name: "blog.example.com", lastAudit: "3 days ago", score: 92 },
  ];

  // Sample audits data
  const audits = [
    {
      id: 1,
      project: "example.com",
      date: "Aug 15, 2023",
      time: "10:30 AM",
      score: 78,
      previousScore: 75,
      status: "completed",
      issues: 42,
      duration: "1m 42s",
      change: "+3",
      type: "manual",
    },
    {
      id: 2,
      project: "myshop.com",
      date: "Aug 14, 2023",
      time: "3:15 PM",
      score: 65,
      previousScore: 70,
      status: "completed",
      issues: 58,
      duration: "2m 10s",
      change: "-5",
      type: "scheduled",
    },
    {
      id: 3,
      project: "blog.example.com",
      date: "Aug 12, 2023",
      time: "9:45 AM",
      score: 92,
      previousScore: 87,
      status: "completed",
      issues: 8,
      duration: "1m 20s",
      change: "+5",
      type: "manual",
    },
    {
      id: 4,
      project: "example.com",
      date: "Aug 10, 2023",
      time: "2:30 PM",
      score: 75,
      previousScore: 72,
      status: "completed",
      issues: 48,
      duration: "1m 38s",
      change: "+3",
      type: "scheduled",
    },
    {
      id: 5,
      project: "example.com",
      date: "Aug 15, 2023",
      time: "11:45 AM",
      score: null,
      previousScore: 78,
      status: "running",
      issues: null,
      duration: "0m 45s",
      change: null,
      type: "manual",
    },
  ];

  // Filter audits based on status, project, and search query
  const filteredAudits = audits.filter((audit) => {
    const matchesStatus =
      statusFilter === "all" || audit.status === statusFilter;
    const matchesProject =
      projectFilter === "all" || audit.project === projectFilter;
    const matchesSearch = audit.project
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesProject && matchesSearch;
  });

  return (
    <>
      <DashboardHeader
        activeProject={activeProject}
        projects={projects}
        onProjectChange={setActiveProject}
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Audits</h1>
              <p className="text-gray">View and manage your SEO audits</p>
            </div>
            <div className="flex items-center gap-2">
              <ScheduleAuditModal />
              <Button size="sm" className="gap-1">
                <Plus size={14} />
                <span>Run New Audit</span>
              </Button>
            </div>
          </div>

          {/* Summary stats */}
          <AuditsSummary audits={audits} />

          {/* Filters */}
          <AuditsFilterBar
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            projectFilter={projectFilter}
            onProjectChange={setProjectFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            projects={projects}
          />

          {/* Audits table */}
          <AuditsTable audits={filteredAudits} />
        </div>
      </main>
    </>
  );
}

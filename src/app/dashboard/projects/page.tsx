"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ProjectsTable } from "@/components/projects/projects-table";
import { ProjectsSummary } from "@/components/projects/projects-summary";
import { ProjectFilters } from "@/components/projects/project-filters";
import { AddProjectModal } from "@/components/modals/add-project-modal";
import UseGetProjects from "@/adapters/apis/useGetProjects";
// import { ProjectListItem } from "@/adapters/types/Seo/ProjectAdapterTypes";

// import { SeoProject, useSeoProjectQuery } from "@/adapters/SeoProjectAdapter";

export default function ProjectsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { overview, projects, isOverviewLoading } = UseGetProjects();

  // Fetch projects from the server or API
  // const {
  //   data: overviewData,
  //   isLoading: isOverviewLoading,
  //   isError,
  //   isSuccess: isOverviewSuccess,
  // } = useSeoProjectQuery({
  //   queryCallback: SeoProject.getProjectOverview,
  //   queryKey: ["overview"],
  // });

  // const {
  //   data: projectsData,
  //   isLoading: isProjectsLoading,
  //   isSuccess: isProjectsSuccess,
  // } = useSeoProjectQuery({
  //   queryCallback: SeoProject.getAllProject,
  //   queryKey: ["projects"],
  // });

  // const overview = isOverviewSuccess ? overviewData.data : undefined;

  // const projects: ProjectListItem[] = isProjectsSuccess
  //   ? projectsData.data
  //   : [];

  // Filter projects based on status and search query

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      filterStatus === "all" || project.url === filterStatus;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <DashboardHeader />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and add project button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Projects</h1>
              <p className="text-gray">
                Manage all your websites and SEO projects
              </p>
            </div>
            <AddProjectModal />
          </div>

          {/* Summary stats */}
          <ProjectsSummary isLoading={isOverviewLoading} overview={overview} />

          {/* Filters */}
          <ProjectFilters
            statusFilter={filterStatus}
            onStatusChange={setFilterStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Projects table */}
          <ProjectsTable projects={filteredProjects} />
        </div>
      </main>
    </>
  );
}

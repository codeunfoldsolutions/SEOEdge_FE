"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { ProjectsTable } from "@/components/projects/projects-table"
import { ProjectsSummary } from "@/components/projects/projects-summary"
import { ProjectFilters } from "@/components/projects/project-filters"
import { AddProjectModal } from "@/components/modals/add-project-modal"

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState("example.com")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample projects for demonstration
  const projects = [
    {
      id: 1,
      name: "example.com",
      url: "https://example.com",
      lastAudit: "2 hours ago",
      score: 78,
      status: "active",
      issues: 15,
      type: "business",
    },
    {
      id: 2,
      name: "myshop.com",
      url: "https://myshop.com",
      lastAudit: "1 day ago",
      score: 65,
      status: "active",
      issues: 28,
      type: "ecommerce",
    },
    {
      id: 3,
      name: "blog.example.com",
      url: "https://blog.example.com",
      lastAudit: "3 days ago",
      score: 92,
      status: "active",
      issues: 4,
      type: "blog",
    },
    {
      id: 4,
      name: "portfolio.example.com",
      url: "https://portfolio.example.com",
      lastAudit: "7 days ago",
      score: 88,
      status: "paused",
      issues: 8,
      type: "business",
    },
    {
      id: 5,
      name: "app.example.com",
      url: "https://app.example.com",
      lastAudit: "14 days ago",
      score: 45,
      status: "paused",
      issues: 32,
      type: "webapp",
    },
  ]

  // Filter projects based on status and search query
  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.url.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <>
      <DashboardHeader activeProject={activeProject} projects={projects} onProjectChange={setActiveProject} />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and add project button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Projects</h1>
              <p className="text-gray">Manage all your websites and SEO projects</p>
            </div>
            <AddProjectModal />
          </div>

          {/* Summary stats */}
          <ProjectsSummary projects={projects} />

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
  )
}


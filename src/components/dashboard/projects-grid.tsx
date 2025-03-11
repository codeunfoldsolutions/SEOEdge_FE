"use client"

import { ProjectCard } from "@/components/dashboard/project-card"
import { AddProjectCard } from "@/components/dashboard/add-project-card"

interface ProjectsGridProps {
  projects: Array<{
    name: string
    lastAudit: string
    score: number
  }>
  activeProject: string
}

export function ProjectsGrid({ projects, activeProject }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} isActive={project.name === activeProject} />
      ))}
      <AddProjectCard />
    </div>
  )
}


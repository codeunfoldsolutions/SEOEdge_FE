"use client";

import { ProjectCard } from "@/components/dashboard/project-card";
import { AddProjectCard } from "@/components/dashboard/add-project-card";

// interface ProjectsGridProps {
//   projects: Array<{
//     url: string;
//     lastAudit: string;
//     score: number;
//   }>;
//   activeProject: string;
// }
type ProjectSummary = {
  url: string;
  updatedAt: string;
  score: number;
};

interface ProjectsGridProps {
  projects: ProjectSummary[];
  activeProject: string;
}

export function ProjectsGrid({ projects, activeProject }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.url}
          project={project}
          isActive={project.url === activeProject}
        />
      ))}
      <AddProjectCard />
    </div>
  );
}

"use client"

import { Clock, Download } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  project: {
    name: string
    lastAudit: string
    score: number
  }
  isActive: boolean
}

export function ProjectCard({ project, isActive }: ProjectCardProps) {
  return (
    <Card className={`border ${isActive ? "border-primary" : "border-border"}`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <h3 className="text-base font-medium">{project.name}</h3>
          <p className="text-xs text-gray flex items-center mt-1">
            <Clock size={12} className="mr-1" /> Last audit: {project.lastAudit}
          </p>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
            project.score >= 80 ? "bg-success" : project.score >= 60 ? "bg-warning" : "bg-danger"
          }`}
        >
          {project.score}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Progress
          value={project.score}
          className="h-1.5"
          indicatorClassName={project.score >= 80 ? "bg-success" : project.score >= 60 ? "bg-warning" : "bg-danger"}
        />
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
          View Details
        </Button>
        <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
          <Download size={14} className="mr-1" /> PDF
        </Button>
      </CardFooter>
    </Card>
  )
}


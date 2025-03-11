"use client"

import { Filter, SearchIcon, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AuditsFilterBarProps {
  statusFilter: string
  onStatusChange: (status: string) => void
  projectFilter: string
  onProjectChange: (project: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  projects: Array<{ name: string }>
}

export function AuditsFilterBar({
  statusFilter,
  onStatusChange,
  projectFilter,
  onProjectChange,
  searchQuery,
  onSearchChange,
  projects,
}: AuditsFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
      <div className="relative w-full sm:w-auto max-w-sm">
        <Input
          placeholder="Search audits..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray">
          <SearchIcon size={16} />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Tabs defaultValue={statusFilter} onValueChange={onStatusChange} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="running">Running</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={projectFilter} onValueChange={onProjectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.name} value={project.name}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Audits</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>All Types</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
              <DropdownMenuItem>Scheduled</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>All Scores</DropdownMenuItem>
              <DropdownMenuItem>Good (80-100)</DropdownMenuItem>
              <DropdownMenuItem>Average (60-79)</DropdownMenuItem>
              <DropdownMenuItem>Poor (0-59)</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" className="h-10 w-10">
          <Calendar size={16} />
        </Button>
      </div>
    </div>
  )
}


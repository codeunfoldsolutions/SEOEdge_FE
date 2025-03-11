"use client"

import { Filter, Download, Grid, List } from "lucide-react"
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

interface ProjectFiltersProps {
  statusFilter: string
  onStatusChange: (status: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ProjectFilters({ statusFilter, onStatusChange, searchQuery, onSearchChange }: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
      <div className="relative w-full sm:w-auto max-w-sm">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray">
          <Search size={16} />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Tabs defaultValue={statusFilter} onValueChange={onStatusChange} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Projects</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>All Types</DropdownMenuItem>
              <DropdownMenuItem>Business</DropdownMenuItem>
              <DropdownMenuItem>E-commerce</DropdownMenuItem>
              <DropdownMenuItem>Blog</DropdownMenuItem>
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
          <Download size={16} />
        </Button>

        <div className="hidden sm:flex border rounded-md">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-r-none">
            <Grid size={16} />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 border-0 rounded-l-none">
            <List size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

import { Search } from "lucide-react"


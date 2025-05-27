"use client";

import {
  Globe,
  MoreHorizontal,
  ChevronRight,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface ProjectsTableProps {
  projects: Array<{
    url: string;
    title: string;
    active: boolean;
    score: number;
    createdAt: string;
    updatedAt: string;
    id: string;
  }>;
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="rounded-md border bg-white overflow-hidden mt-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary-blue hover:bg-primary-blue">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>
              <div className="flex items-center text-white font-bold">
                Project
                <ArrowUpDown size={14} className="ml-1" />
              </div>
            </TableHead>
            <TableHead className="text-white font-bold">Score</TableHead>
            <TableHead className="text-white font-bold">Issues</TableHead>
            <TableHead className="text-white font-bold">Last Audit</TableHead>
            <TableHead className="text-white font-bold">Status</TableHead>
            <TableHead className="text-right text-white font-bold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-primary-blue/10">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 w-9 h-9 rounded-full flex items-center justify-center text-primary">
                    <Globe size={18} />
                  </div>
                  <div>
                    <div className="font-medium">{project.url}</div>
                    <div className="text-sm text-gray">{project.url}</div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                      project.score <= 80
                        ? "bg-red-600"
                        : project.score >= 60
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {project.score}
                  </div>
                  <Progress
                    value={project.score}
                    className="h-1.5 w-12 ml-1"
                    indicatorClassName={
                      project.score <= 80
                        ? "bg-success"
                        : project.score >= 60
                        ? "bg-warning"
                        : "bg-danger"
                    }
                  />
                </div>
              </TableCell>
              <TableCell>
                {project.score > 0 ? (
                  <Badge
                    variant="outline"
                    className="bg-danger/10 text-danger border-danger/10"
                  >
                    {project.score} issues
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success border-success/10"
                  >
                    No issues
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(project.updatedAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    project.active
                      ? "bg-success/10 text-success border-success/10"
                      : "bg-gray/10 text-gray border-gray/10"
                  }
                >
                  {project.active ? "Active" : "Paused"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      View <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Search size={14} className="mr-2" />
                        <span>Run Audit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Globe size={14} className="mr-2" />
                        <span>Visit Website</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span className="text-danger">Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

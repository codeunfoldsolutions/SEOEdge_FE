"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Audit = {
  id: string;
  date: string;
  score: number;
  issues: {
    critical: number;
    moderate: number;
    minor: number;
  };
};

interface ProjectAuditListProps {
  projectId: string;
  audits: Audit[];
}

export function ProjectAuditList({ projectId, audits }: ProjectAuditListProps) {
  const [sortField, setSortField] = useState<"date" | "score">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: "date" | "score") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedAudits = [...audits].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortDirection === "asc" ? a.score - b.score : b.score - a.score;
    }
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("date")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Date
                {sortField === "date" ? (
                  sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )
                ) : (
                  <ArrowUpDown className="h-4 w-4 opacity-50" />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("score")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Score
                {sortField === "score" ? (
                  sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )
                ) : (
                  <ArrowUpDown className="h-4 w-4 opacity-50" />
                )}
              </Button>
            </TableHead>
            <TableHead>Issues</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAudits.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell className="font-medium">
                {new Date(audit.date).toLocaleDateString()} at{" "}
                {new Date(audit.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{audit.score}</span>
                  {audit.score >= 80 ? (
                    <Badge className="bg-success">Good</Badge>
                  ) : audit.score >= 60 ? (
                    <Badge className="bg-warning">Needs Improvement</Badge>
                  ) : (
                    <Badge variant="destructive">Critical</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">
                    {audit.issues.critical} Critical
                  </Badge>
                  <Badge className="bg-warning">
                    {audit.issues.moderate} Moderate
                  </Badge>
                  <Badge className="bg-success text-xs">
                    {audit.issues.minor} Minor
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/projects/${projectId}/audits/${audit.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

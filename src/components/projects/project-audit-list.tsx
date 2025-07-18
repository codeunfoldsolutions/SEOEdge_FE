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
import { SingleAuditRecord } from "@/adapters/types/Seo/AuditAdapterTypes";

interface ProjectAuditListProps {
  Id: string;
  audits: SingleAuditRecord[];
}

export function ProjectAuditList({ Id, audits }: ProjectAuditListProps) {
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
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
                {new Date(audit.createdAt).toLocaleDateString()} at{" "}
                {new Date(audit.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{audit.score * 100}</span>
                  {audit.score * 100 >= 80 ? (
                    <Badge className="bg-success">Good</Badge>
                  ) : audit.score * 100 >= 60 ? (
                    <Badge className="bg-warning">Needs Improvement</Badge>
                  ) : (
                    <Badge variant="destructive">Critical</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">
                    {audit.criticalCount} Critical
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/dashboard/audits/${audit.id}`}>
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

"use client";

import { useState } from "react";
import { MoreHorizontal, ChevronRight, Download, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { AllAuditRecord } from "@/adapters/types/Seo/AuditAdapterTypes";

// interface AuditsTableProps {
//   audits: Array<AllAuditRecord>
// }
const audits = [
  {
    id: 1,
    project: "example.com",
    date: "Aug 15, 2023",
    time: "10:30 AM",
    score: 78,
    previousScore: 75,
    status: "completed",
    issues: 42,
    duration: "1m 42s",
    change: "+3",
    type: "manual",
  },
  {
    id: 2,
    project: "myshop.com",
    date: "Aug 14, 2023",
    time: "3:15 PM",
    score: 65,
    previousScore: 70,
    status: "completed",
    issues: 58,
    duration: "2m 10s",
    change: "-5",
    type: "scheduled",
  },
  {
    id: 3,
    project: "blog.example.com",
    date: "Aug 12, 2023",
    time: "9:45 AM",
    score: 92,
    previousScore: 87,
    status: "completed",
    issues: 8,
    duration: "1m 20s",
    change: "+5",
    type: "manual",
  },
  {
    id: 4,
    project: "example.com",
    date: "Aug 10, 2023",
    time: "2:30 PM",
    score: 75,
    previousScore: 72,
    status: "completed",
    issues: 48,
    duration: "1m 38s",
    change: "+3",
    type: "scheduled",
  },
  {
    id: 5,
    project: "example.com",
    date: "Aug 15, 2023",
    time: "11:45 AM",
    score: null,
    previousScore: 78,
    status: "running",
    issues: null,
    duration: "0m 45s",
    change: null,
    type: "manual",
  },
];

export function AuditsTable() {
  const [selectedAudits, setSelectedAudits] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedAudits.length === audits.length) {
      setSelectedAudits([]);
    } else {
      setSelectedAudits(audits.map((audit) => audit.id));
    }
  };

  const toggleSelectAudit = (id: number) => {
    if (selectedAudits.includes(id)) {
      setSelectedAudits(selectedAudits.filter((auditId) => auditId !== id));
    } else {
      setSelectedAudits([...selectedAudits, id]);
    }
  };

  return (
    <div className="rounded-md border bg-white overflow-hidden mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedAudits.length === audits.length && audits.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Issues</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell>
                <Checkbox
                  checked={selectedAudits.includes(audit.id)}
                  onCheckedChange={() => toggleSelectAudit(audit.id)}
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">{audit.project}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{audit.date}</div>
                <div className="text-xs text-gray">{audit.time}</div>
              </TableCell>
              <TableCell>
                {audit.score !== null ? (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                        audit.score >= 80
                          ? "bg-success"
                          : audit.score >= 60
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {audit.score}
                    </div>
                    {audit.change && (
                      <Badge
                        className={
                          audit.change.startsWith("+")
                            ? "bg-success/20 text-success border-success/10"
                            : audit.change.startsWith("-")
                            ? "bg-danger/20 text-danger border-danger/10"
                            : "bg-gray/20 text-gray border-gray/10"
                        }
                      >
                        {audit.change}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <Badge>Pending</Badge>
                )}
              </TableCell>
              <TableCell>
                {audit.issues !== null ? (
                  <Badge
                    variant="outline"
                    className="bg-danger/10 text-danger border-danger/10"
                  >
                    {audit.issues} issues
                  </Badge>
                ) : (
                  <span className="text-gray">-</span>
                )}
              </TableCell>
              <TableCell>{audit.duration}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {audit.type === "manual" ? "Manual" : "Scheduled"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    audit.status === "completed"
                      ? "bg-success/10 text-success border-success/10"
                      : audit.status === "running"
                      ? "bg-primary/10 text-primary border-primary/10"
                      : "bg-gray/10 text-gray border-gray/10"
                  }
                >
                  {audit.status === "completed"
                    ? "Completed"
                    : audit.status === "running"
                    ? "Running"
                    : "Failed"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {audit.status === "completed" && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/audit-results/${audit.id}`}>
                        View <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {audit.status === "completed" && (
                        <>
                          <DropdownMenuItem>
                            <Download size={14} className="mr-2" />
                            <span>Download PDF</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/audits/compare?ids=${audit.id}`}
                            >
                              <BarChart size={14} className="mr-2" />
                              <span>Compare</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem>
                        <span className="text-danger">Delete</span>
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

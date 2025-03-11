"use client"

import { useState } from "react"
import { MoreHorizontal, ChevronRight, Download, BarChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

interface AuditsTableProps {
  audits: Array<{
    id: number
    project: string
    date: string
    time: string
    score: number | null
    previousScore: number | null
    status: string
    issues: number | null
    duration: string
    change: string | null
    type: string
  }>
}

export function AuditsTable({ audits }: AuditsTableProps) {
  const [selectedAudits, setSelectedAudits] = useState<number[]>([])

  const toggleSelectAll = () => {
    if (selectedAudits.length === audits.length) {
      setSelectedAudits([])
    } else {
      setSelectedAudits(audits.map((audit) => audit.id))
    }
  }

  const toggleSelectAudit = (id: number) => {
    if (selectedAudits.includes(id)) {
      setSelectedAudits(selectedAudits.filter((auditId) => auditId !== id))
    } else {
      setSelectedAudits([...selectedAudits, id])
    }
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedAudits.length === audits.length && audits.length > 0}
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
                        audit.score >= 80 ? "bg-success" : audit.score >= 60 ? "bg-warning" : "bg-danger"
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
                  <Badge variant="outline" className="bg-danger/10 text-danger border-danger/10">
                    {audit.issues} issues
                  </Badge>
                ) : (
                  <span className="text-gray">-</span>
                )}
              </TableCell>
              <TableCell>{audit.duration}</TableCell>
              <TableCell>
                <Badge variant="outline">{audit.type === "manual" ? "Manual" : "Scheduled"}</Badge>
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
                  {audit.status === "completed" ? "Completed" : audit.status === "running" ? "Running" : "Failed"}
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
                            <Link href={`/dashboard/audits/compare?ids=${audit.id}`}>
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
  )
}


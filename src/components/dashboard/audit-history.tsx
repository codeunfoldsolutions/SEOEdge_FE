"use client"

import { Calendar, History, Download, Send, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AuditHistoryProps {
  audits: Array<{
    date: string
    score: number
    issues: number
    change: string
  }>
}

export function AuditHistory({ audits }: AuditHistoryProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold mb-1">Audit History</h2>
          <p className="text-gray text-sm">Previous audits for your website</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar size={14} />
            <span>Schedule</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <History size={14} />
            <span>Compare</span>
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Issues</TableHead>
            <TableHead>Change</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.map((audit, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{audit.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={audit.score >= 80 ? "text-success" : audit.score >= 60 ? "text-warning" : "text-danger"}
                  >
                    {audit.score}/100
                  </span>
                  <Progress
                    value={audit.score}
                    className="h-1.5 w-16"
                    indicatorClassName={
                      audit.score >= 80 ? "bg-success" : audit.score >= 60 ? "bg-warning" : "bg-danger"
                    }
                  />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-danger/10 text-danger border-danger/10">
                  {audit.issues} issues
                </Badge>
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    Number.parseInt(audit.change) > 0
                      ? "bg-success/20 text-success"
                      : Number.parseInt(audit.change) < 0
                        ? "bg-danger/20 text-danger"
                        : "bg-gray/20 text-gray"
                  }`}
                >
                  {audit.change}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Send size={14} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4 text-sm">
        <div>Showing 5 items per page</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft size={16} />
          </Button>
          <Button variant="default" size="icon" className="h-8 w-8">
            1
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            2
          </Button>
          <div className="px-2">...</div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            4
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}


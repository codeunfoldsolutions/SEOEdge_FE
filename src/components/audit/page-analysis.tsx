"use client"

import { Filter, Download, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PageAnalysisProps {
  pageData: Array<{
    url: string
    title: string
    score: number
    issues: number
    status: string
  }>
  selectedPages: string[]
  toggleSelectAllPages: () => void
  toggleSelectPage: (url: string) => void
}

export function PageAnalysis({ pageData, selectedPages, toggleSelectAllPages, toggleSelectPage }: PageAnalysisProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold mb-1">Page Analysis</h2>
          <p className="text-gray text-sm">Detailed analysis of all pages</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search pages..." className="w-64 h-9" />
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={14} />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download size={14} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox checked={selectedPages.length === pageData.length} onCheckedChange={toggleSelectAllPages} />
            </TableHead>
            <TableHead>Page</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Issues</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((page, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={selectedPages.includes(page.url)}
                  onCheckedChange={() => toggleSelectPage(page.url)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-xs text-gray">{page.url}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={page.score >= 80 ? "text-success" : page.score >= 60 ? "text-warning" : "text-danger"}
                  >
                    {page.score}/100
                  </span>
                  <Progress
                    value={page.score}
                    className="h-1.5 w-16"
                    indicatorClassName={page.score >= 80 ? "bg-success" : page.score >= 60 ? "bg-warning" : "bg-danger"}
                  />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-danger/10 text-danger border-danger/10">
                  {page.issues} issues
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    page.status === "Excellent"
                      ? "bg-success/20 text-success"
                      : page.status === "Good"
                        ? "bg-success/20 text-success"
                        : page.status === "Needs Improvement"
                          ? "bg-warning/20 text-warning"
                          : "bg-danger/20 text-danger"
                  }
                >
                  {page.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPages.length > 0 && (
        <div className="flex items-center justify-between mt-4 p-3 bg-muted rounded-lg">
          <span className="text-sm">{selectedPages.length} pages selected</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Flag size={14} className="mr-1" />
              Mark as Fixed
            </Button>
            <Button variant="outline" size="sm">
              <Download size={14} className="mr-1" />
              Export Selected
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


"use client"

import type React from "react"

import { AlertCircle, Info, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CriticalIssuesProps {
  issues: Array<{
    name: string
    category: string
    icon: React.ElementType
    count: number
    impact: string
    pages?: string[]
  }>
  showDetailedView?: boolean
}

export function CriticalIssues({ issues, showDetailedView = true }: CriticalIssuesProps) {
  const totalIssues = issues.reduce((total, issue) => total + issue.count, 0)

  return (
    <div className="bg-white rounded-lg p-6 border border-border mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="text-danger" />
          <h2 className="text-lg font-bold">Critical Issues</h2>
        </div>
        <Badge variant="outline" className="bg-danger/10 text-danger border-danger/10">
          {totalIssues} Issues Found
        </Badge>
      </div>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                issue.impact === "High"
                  ? "bg-danger/10 text-danger"
                  : issue.impact === "Medium"
                    ? "bg-warning/10 text-warning"
                    : "bg-success/10 text-success"
              }`}
            >
              <issue.icon size={20} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{issue.name}</h3>
                <Badge
                  className={
                    issue.impact === "High"
                      ? "bg-danger/20 text-danger border-danger/20"
                      : issue.impact === "Medium"
                        ? "bg-warning/20 text-warning border-warning/20"
                        : "bg-success/20 text-success border-success/20"
                  }
                >
                  {issue.impact} Impact
                </Badge>
              </div>

              <p className="text-sm text-gray mb-2">
                {issue.count} {issue.count === 1 ? "instance" : "instances"} found
              </p>

              {showDetailedView && issue.pages && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {issue.pages.slice(0, 5).map((page, pageIndex) => (
                    <Badge key={pageIndex} variant="outline" className="text-xs">
                      {page}
                    </Badge>
                  ))}
                  {issue.pages.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{issue.pages.length - 5} more
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray">
                  <Info size={14} />
                  <span>Category: {issue.category}</span>
                </div>

                <Button variant="ghost" size="sm" className="text-primary">
                  View Details <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


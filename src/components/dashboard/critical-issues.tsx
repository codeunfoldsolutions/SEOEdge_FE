"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

interface CriticalIssuesProps {
  issues: Array<{
    name: string
    category: string
    icon: React.ElementType
    count: number
  }>
}

export function CriticalIssues({ issues }: CriticalIssuesProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Critical Issues</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center text-danger">
                <issue.icon size={16} />
              </div>
              <div>
                <p className="font-medium text-sm">{issue.name}</p>
                <p className="text-xs text-gray">{issue.category}</p>
              </div>
            </div>
            <Badge className="bg-danger/20 text-danger border-danger/20">{issue.count}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}


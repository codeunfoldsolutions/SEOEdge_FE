"use client"

import { FileCheck, Clock, AlertCircle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AuditsSummaryProps {
  audits: Array<{
    id: number
    status: string
    duration: string
    issues: number | null
    score: number | null
    previousScore: number | null
  }>
}

export function AuditsSummary({ audits }: AuditsSummaryProps) {
  // Calculate summary statistics
  const totalAudits = audits.length
  const completedAudits = audits.filter((a) => a.status === "completed").length
  const avgDuration = audits
    .filter((a) => a.status === "completed")
    .map((a) => {
      const [min, sec] = a.duration.replace(/[ms]/g, "").split(" ")
      return Number.parseInt(min) * 60 + Number.parseInt(sec)
    })
    .reduce((sum, duration, _, arr) => sum + duration / arr.length, 0)

  // Format duration as mm:ss
  const formattedDuration = `${Math.floor(avgDuration / 60)}m ${Math.round(avgDuration % 60)}s`

  // Calculate total issues
  const totalIssues = audits.filter((a) => a.issues !== null).reduce((sum, audit) => sum + (audit.issues || 0), 0)

  // Calculate average improvement
  const auditsWithChange = audits.filter(
    (a) => a.score !== null && a.previousScore !== null && a.status === "completed",
  )

  const avgImprovement =
    auditsWithChange.length > 0
      ? auditsWithChange.reduce((sum, audit) => sum + ((audit.score || 0) - (audit.previousScore || 0)), 0) /
        auditsWithChange.length
      : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary">
            <FileCheck size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Total Audits</p>
            <p className="text-2xl font-bold">{totalAudits}</p>
            <p className="text-xs text-gray">{completedAudits} completed</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Avg. Duration</p>
            <p className="text-2xl font-bold">{formattedDuration}</p>
            <p className="text-xs text-gray">per audit</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-danger/10 w-10 h-10 rounded-full flex items-center justify-center text-danger">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Total Issues</p>
            <p className="text-2xl font-bold">{totalIssues}</p>
            <p className="text-xs text-gray">across all audits</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div
            className={`${avgImprovement >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"} w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Avg. Improvement</p>
            <p className="text-2xl font-bold">
              {avgImprovement > 0 ? "+" : ""}
              {avgImprovement.toFixed(1)}
            </p>
            <p className="text-xs text-gray">score points</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


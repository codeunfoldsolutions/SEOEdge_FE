"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AuditsComparisonTableProps {
  audits: Array<{
    id: number
    project: string
    date: string
    score: number
    issues: number
    duration: string
    metrics: {
      seo: number
      performance: number
      accessibility: number
      bestPractices: number
      security: number
    }
  }>
}

export function AuditsComparisonTable({ audits }: AuditsComparisonTableProps) {
  // Ensure we have at least 2 audits to compare
  if (audits.length < 2) {
    return null
  }

  // Sort audits by date (newest first)
  const sortedAudits = [...audits].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Calculate differences between the newest and oldest audit
  const newest = sortedAudits[0]
  const oldest = sortedAudits[sortedAudits.length - 1]

  const differences = {
    score: newest.score - oldest.score,
    issues: oldest.issues - newest.issues, // Reversed so positive is good (fewer issues)
    seo: newest.metrics.seo - oldest.metrics.seo,
    performance: newest.metrics.performance - oldest.metrics.performance,
    accessibility: newest.metrics.accessibility - oldest.metrics.accessibility,
    bestPractices: newest.metrics.bestPractices - oldest.metrics.bestPractices,
    security: newest.metrics.security - oldest.metrics.security,
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Detailed Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Metric</TableHead>
              {sortedAudits.map((audit) => (
                <TableHead key={audit.id}>{audit.date}</TableHead>
              ))}
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Overall Score</TableCell>
              {sortedAudits.map((audit) => (
                <TableCell key={`score-${audit.id}`}>
                  <Badge
                    className={`${
                      audit.score >= 80
                        ? "bg-success/20 text-success"
                        : audit.score >= 60
                          ? "bg-warning/20 text-warning"
                          : "bg-danger/20 text-danger"
                    }`}
                  >
                    {audit.score}/100
                  </Badge>
                </TableCell>
              ))}
              <TableCell>
                <div className={`flex items-center gap-1 ${differences.score >= 0 ? "text-success" : "text-danger"}`}>
                  {differences.score >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>
                    {differences.score > 0 ? "+" : ""}
                    {differences.score} points
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Issues Count</TableCell>
              {sortedAudits.map((audit) => (
                <TableCell key={`issues-${audit.id}`}>
                  <Badge variant="outline" className="bg-danger/10 text-danger border-danger/10">
                    {audit.issues} issues
                  </Badge>
                </TableCell>
              ))}
              <TableCell>
                <div className={`flex items-center gap-1 ${differences.issues >= 0 ? "text-success" : "text-danger"}`}>
                  {differences.issues >= 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                  <span>
                    {differences.issues > 0 ? "-" : "+"}
                    {Math.abs(differences.issues)} issues
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">SEO Score</TableCell>
              {sortedAudits.map((audit) => (
                <TableCell key={`seo-${audit.id}`}>{audit.metrics.seo}%</TableCell>
              ))}
              <TableCell>
                <div className={`flex items-center gap-1 ${differences.seo >= 0 ? "text-success" : "text-danger"}`}>
                  {differences.seo >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>
                    {differences.seo > 0 ? "+" : ""}
                    {differences.seo}%
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Performance Score</TableCell>
              {sortedAudits.map((audit) => (
                <TableCell key={`perf-${audit.id}`}>{audit.metrics.performance}%</TableCell>
              ))}
              <TableCell>
                <div
                  className={`flex items-center gap-1 ${differences.performance >= 0 ? "text-success" : "text-danger"}`}
                >
                  {differences.performance >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>
                    {differences.performance > 0 ? "+" : ""}
                    {differences.performance}%
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Accessibility Score</TableCell>
              {sortedAudits.map((audit) => (
                <TableCell key={`acc-${audit.id}`}>{audit.metrics.accessibility}%</TableCell>
              ))}
              <TableCell>
                <div
                  className={`flex items-center gap-1 ${differences.accessibility >= 0 ? "text-success" : "text-danger"}`}
                >
                  {differences.accessibility >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>
                    {differences.accessibility > 0 ? "+" : ""}
                    {differences.accessibility}%
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Best Practices Score</TableCell>
              {sortedAudits.map((audit) => (
                <TableCell key={`bp-${audit.id}`}>{audit.metrics.bestPractices}%</TableCell>
              ))}
              <TableCell>
                <div
                  className={`flex items-center gap-1 ${differences.bestPractices >= 0 ? "text-success" : "text-danger"}`}
                >
                  {differences.bestPractices >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>
                    {differences.bestPractices > 0 ? "+" : ""}
                    {differences.bestPractices}%
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Security Score</TableCell>
              {sortedAudits.map((audit) => (
                <TableCell key={`sec-${audit.id}`}>{audit.metrics.security}%</TableCell>
              ))}
              <TableCell>
                <div
                  className={`flex items-center gap-1 ${differences.security >= 0 ? "text-success" : "text-danger"}`}
                >
                  {differences.security >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>
                    {differences.security > 0 ? "+" : ""}
                    {differences.security}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


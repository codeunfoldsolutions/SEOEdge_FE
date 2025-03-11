"use client"

import { Plus, MoreHorizontal, Eye, RefreshCw, ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CompetitorComparisonProps {
  auditDetails: {
    url: string
  }
  scores: {
    overall: number
    seo: number
    performance: number
    accessibility: number
    bestPractices: number
    security: number
  }
  competitors: Array<{
    name: string
    score: number
  }>
}

export function CompetitorComparison({ auditDetails, scores, competitors }: CompetitorComparisonProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-border mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Competitor Comparison</h2>
        <Button variant="outline" size="sm">
          <Plus size={14} className="mr-1" />
          Add Competitor
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Website</TableHead>
              <TableHead>Overall Score</TableHead>
              <TableHead>SEO</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Accessibility</TableHead>
              <TableHead>Best Practices</TableHead>
              <TableHead>Security</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-primary/5">
              <TableCell className="font-medium">{auditDetails.url}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      scores.overall >= 80
                        ? "bg-success/20 text-success"
                        : scores.overall >= 60
                          ? "bg-warning/20 text-warning"
                          : "bg-danger/20 text-danger"
                    }
                  >
                    {scores.overall}
                  </Badge>
                  <span className="text-xs text-gray">Your site</span>
                </div>
              </TableCell>
              <TableCell>{scores.seo}</TableCell>
              <TableCell>{scores.performance}</TableCell>
              <TableCell>{scores.accessibility}</TableCell>
              <TableCell>{scores.bestPractices}</TableCell>
              <TableCell>{scores.security}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>

            {competitors.map((competitor, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{competitor.name}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      competitor.score >= 80
                        ? "bg-success/20 text-success"
                        : competitor.score >= 60
                          ? "bg-warning/20 text-warning"
                          : "bg-danger/20 text-danger"
                    }
                  >
                    {competitor.score}
                  </Badge>
                </TableCell>
                <TableCell>{Math.round(competitor.score * 0.9 + Math.random() * 10)}</TableCell>
                <TableCell>{Math.round(competitor.score * 0.8 + Math.random() * 15)}</TableCell>
                <TableCell>{Math.round(competitor.score * 1.1 - Math.random() * 5)}</TableCell>
                <TableCell>{Math.round(competitor.score * 0.95 + Math.random() * 8)}</TableCell>
                <TableCell>{Math.round(competitor.score * 1.05 - Math.random() * 10)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye size={14} className="mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw size={14} className="mr-2" />
                        Update Data
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink size={14} className="mr-2" />
                        Visit Website
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-danger">
                        <Trash2 size={14} className="mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


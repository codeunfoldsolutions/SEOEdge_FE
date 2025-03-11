"use client"

import type React from "react"

import { Search, Zap, Smartphone, Check, Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ScoreOverviewProps {
  scores: {
    overall: number
    seo: number
    performance: number
    accessibility: number
    bestPractices: number
    security: number
  }
  compareMode?: boolean
  onCompare?: () => void
  comparisonData?: {
    overall: { improved: boolean; percentage: string; change: number }
    seo: { improved: boolean; percentage: string }
    performance: { improved: boolean; percentage: string }
    accessibility: { improved: boolean; percentage: string }
    bestPractices: { improved: boolean; percentage: string }
    security: { improved: boolean; percentage: string }
  }
  selectedCompareDate?: string
}

export function ScoreOverview({
  scores,
  compareMode = false,
  onCompare,
  comparisonData,
  selectedCompareDate,
}: ScoreOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-1 bg-white rounded-lg p-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Overall Score</h2>
          {compareMode && comparisonData && (
            <Badge
              className={comparisonData.overall.improved ? "bg-success/20 text-success" : "bg-danger/20 text-danger"}
            >
              {comparisonData.overall.improved ? "+" : ""}
              {comparisonData.overall.percentage}%
            </Badge>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />

              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={scores.overall >= 80 ? "#10b981" : scores.overall >= 60 ? "#f59e0b" : "#ef4444"}
                strokeWidth="10"
                strokeDasharray={`${(2 * Math.PI * 45 * scores.overall) / 100} ${(2 * Math.PI * 45 * (100 - scores.overall)) / 100}`}
                strokeDashoffset={2 * Math.PI * 45 * 0.25}
                transform="rotate(-90 50 50)"
              />

              {/* Score text */}
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
                fontWeight="bold"
                fill={scores.overall >= 80 ? "#10b981" : scores.overall >= 60 ? "#f59e0b" : "#ef4444"}
              >
                {scores.overall}
              </text>

              <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#64748b">
                out of 100
              </text>
            </svg>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium mb-1">
              {scores.overall >= 80 ? "Excellent" : scores.overall >= 60 ? "Good" : "Needs Improvement"}
            </p>
            <p className="text-sm text-gray">
              Your website is performing{" "}
              {scores.overall >= 80 ? "very well" : scores.overall >= 60 ? "adequately" : "below average"} compared to
              similar websites.
            </p>

            {compareMode && comparisonData && selectedCompareDate && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">
                  {comparisonData.overall.improved ? "Improved" : "Decreased"} by{" "}
                  {Math.abs(comparisonData.overall.change)} points
                </p>
                <p className="text-xs text-gray">Since {selectedCompareDate}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Category Scores</h2>
          {!compareMode && onCompare && (
            <Button variant="outline" size="sm" onClick={onCompare}>
              <History size={14} className="mr-1" />
              Compare with Previous
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <CategoryScore
            title="SEO"
            icon={<Search size={16} className="text-primary" />}
            score={scores.seo}
            description="Meta tags, headings, content quality, and keyword optimization"
            compareMode={compareMode}
            comparisonData={comparisonData?.seo}
          />

          <CategoryScore
            title="Performance"
            icon={<Zap size={16} className="text-warning" />}
            score={scores.performance}
            description="Page speed, resource optimization, and server response time"
            compareMode={compareMode}
            comparisonData={comparisonData?.performance}
          />

          <CategoryScore
            title="Accessibility"
            icon={<Smartphone size={16} className="text-success" />}
            score={scores.accessibility}
            description="Alt tags, ARIA attributes, color contrast, and keyboard navigation"
            compareMode={compareMode}
            comparisonData={comparisonData?.accessibility}
          />

          <CategoryScore
            title="Best Practices"
            icon={<Check size={16} className="text-info" />}
            score={scores.bestPractices}
            description="HTML standards, JavaScript usage, and responsive design"
            compareMode={compareMode}
            comparisonData={comparisonData?.bestPractices}
          />

          <CategoryScore
            title="Security"
            icon={<Shield size={16} className="text-primary" />}
            score={scores.security}
            description="HTTPS implementation, secure headers, and vulnerability checks"
            compareMode={compareMode}
            comparisonData={comparisonData?.security}
          />
        </div>
      </div>
    </div>
  )
}

interface CategoryScoreProps {
  title: string
  icon: React.ReactNode
  score: number
  description: string
  compareMode?: boolean
  comparisonData?: { improved: boolean; percentage: string }
}

function CategoryScore({ title, icon, score, description, compareMode, comparisonData }: CategoryScoreProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{score}/100</span>
          {compareMode && comparisonData && (
            <Badge className={comparisonData.improved ? "bg-success/20 text-success" : "bg-danger/20 text-danger"}>
              {comparisonData.improved ? "+" : ""}
              {comparisonData.percentage}%
            </Badge>
          )}
        </div>
      </div>
      <Progress
        value={score}
        className="h-2"
        indicatorClassName={score >= 80 ? "bg-success" : score >= 60 ? "bg-warning" : "bg-danger"}
      />
      <p className="text-xs text-gray mt-1">{description}</p>
    </div>
  )
}

// Import this component where needed
import { History } from "lucide-react"


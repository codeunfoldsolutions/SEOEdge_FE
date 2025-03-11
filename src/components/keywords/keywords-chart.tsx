"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface KeywordsChartProps {
  keywords: Array<{
    keyword: string
    trend: (number | null)[]
  }>
}

export function KeywordsChart({ keywords }: KeywordsChartProps) {
  const [timeRange, setTimeRange] = useState("30d")

  // Get top 5 keywords by trend improvement (simplified for demo)
  const keywordsToShow = keywords.slice(0, 5)

  // Define colors for lines
  const colors = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"]

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Keyword Ranking Trends</CardTitle>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">
            Main Keywords <ChevronDown size={14} className="ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          {/* Main chart area */}
          <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
            {/* Grid lines */}
            <g>
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`grid-${i}`}
                  x1="0"
                  y1={75 * i}
                  x2="800"
                  y2={75 * i}
                  stroke="#e2e8f0"
                  strokeDasharray="5,5"
                />
              ))}
            </g>

            {/* Trend lines (inverted Y axis since lower rank numbers are better) */}
            {keywordsToShow.map((keyword, idx) => {
              // Convert trend data to path
              const data = keyword.trend.filter((pos) => pos !== null) as number[]
              const points = data
                .map((pos, i) => {
                  const x = (i / (data.length - 1)) * 800
                  // Scale y: 0 = pos 1, 300 = pos 30
                  const y = Math.min((pos / 30) * 300, 300)
                  return `${x},${y}`
                })
                .join(" ")

              return (
                <polyline
                  key={`trend-${idx}`}
                  points={points}
                  fill="none"
                  stroke={colors[idx % colors.length]}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            })}
          </svg>

          {/* Y-axis labels (inverted for rankings) */}
          <div className="absolute top-0 left-0 h-full flex flex-col justify-between py-3 text-xs text-gray">
            <div>1</div>
            <div>10</div>
            <div>20</div>
            <div>30</div>
            <div>50+</div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray mt-2 px-8">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
            <span>This Week</span>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center mt-8 gap-4 flex-wrap">
            {keywordsToShow.map((keyword, idx) => (
              <div key={`legend-${idx}`} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                ></div>
                <span className="text-xs">{keyword.keyword}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { Search, Zap, Smartphone, Shield } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OverviewMetricsProps {
  metrics: Array<{
    title: string
    value: string
    change: string
    trend: string
    icon: string
    progress: number
  }>
}

export function OverviewMetrics({ metrics }: OverviewMetricsProps) {
  // Map icon strings to components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="text-primary" />
      case "Zap":
        return <Zap className="text-warning" />
      case "Smartphone":
        return <Smartphone className="text-success" />
      case "Shield":
        return <Shield className="text-info" />
      default:
        return <Search className="text-primary" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              {getIcon(metric.icon)}
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold mb-1">{metric.value}</CardTitle>
            <div className="flex items-center mb-2">
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  metric.trend === "up" ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                }`}
              >
                {metric.change}
              </span>
              <span className="text-xs text-gray ml-2">
                {metric.trend === "up" ? "Higher" : "Lower"} than last audit
              </span>
            </div>
            {metric.progress && (
              <Progress
                value={metric.progress}
                className="h-1.5"
                indicatorClassName={
                  metric.progress >= 80 ? "bg-success" : metric.progress >= 60 ? "bg-warning" : "bg-danger"
                }
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


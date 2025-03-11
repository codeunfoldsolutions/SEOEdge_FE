"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuditsComparisonChartProps {
  audits: Array<{
    id: number
    project: string
    date: string
    score: number
    metrics: {
      seo: number
      performance: number
      accessibility: number
      bestPractices: number
      security: number
    }
    issues_by_category: {
      seo: number
      performance: number
      accessibility: number
      bestPractices: number
      security: number
    }
  }>
}

export function AuditsComparisonChart({ audits }: AuditsComparisonChartProps) {
  // Get unique colors for the audits
  const colors = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444"]

  // Ensure we have at least 2 audits to compare
  if (audits.length < 2) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-center text-gray">Please select at least two audits to compare</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mb-8">
      <Tabs defaultValue="scores" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="scores">Overall Scores</TabsTrigger>
          <TabsTrigger value="categories">Category Scores</TabsTrigger>
          <TabsTrigger value="issues">Issues by Category</TabsTrigger>
        </TabsList>

        <TabsContent value="scores">
          <Card>
            <CardHeader>
              <CardTitle>Overall Score Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] relative">
                {/* Simplified bar chart */}
                <div className="flex h-full items-end justify-around gap-6 pt-10">
                  {audits.map((audit, index) => (
                    <div key={audit.id} className="flex flex-col items-center">
                      <div
                        className="w-20 rounded-t-md text-center text-white font-medium"
                        style={{
                          height: `${audit.score * 2}px`,
                          backgroundColor: colors[index % colors.length],
                        }}
                      >
                        <div className="pt-2">{audit.score}</div>
                      </div>
                      <div className="mt-2 text-xs text-center w-24">
                        <div className="font-medium">{audit.date}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Y-axis */}
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between py-5 text-xs text-gray">
                  <div>100</div>
                  <div>75</div>
                  <div>50</div>
                  <div>25</div>
                  <div>0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Category Scores Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* SEO */}
                <div>
                  <h3 className="font-medium mb-2">SEO</h3>
                  <div className="flex items-center gap-2">
                    {audits.map((audit, index) => (
                      <div key={`seo-${audit.id}`} className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>{audit.date}</span>
                          <span>{audit.metrics.seo}%</span>
                        </div>
                        <div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: colors[index % colors.length], width: `${audit.metrics.seo}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance */}
                <div>
                  <h3 className="font-medium mb-2">Performance</h3>
                  <div className="flex items-center gap-2">
                    {audits.map((audit, index) => (
                      <div key={`perf-${audit.id}`} className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>{audit.date}</span>
                          <span>{audit.metrics.performance}%</span>
                        </div>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: colors[index % colors.length],
                            width: `${audit.metrics.performance}%`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accessibility */}
                <div>
                  <h3 className="font-medium mb-2">Accessibility</h3>
                  <div className="flex items-center gap-2">
                    {audits.map((audit, index) => (
                      <div key={`acc-${audit.id}`} className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>{audit.date}</span>
                          <span>{audit.metrics.accessibility}%</span>
                        </div>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: colors[index % colors.length],
                            width: `${audit.metrics.accessibility}%`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Practices */}
                <div>
                  <h3 className="font-medium mb-2">Best Practices</h3>
                  <div className="flex items-center gap-2">
                    {audits.map((audit, index) => (
                      <div key={`bp-${audit.id}`} className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>{audit.date}</span>
                          <span>{audit.metrics.bestPractices}%</span>
                        </div>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: colors[index % colors.length],
                            width: `${audit.metrics.bestPractices}%`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security */}
                <div>
                  <h3 className="font-medium mb-2">Security</h3>
                  <div className="flex items-center gap-2">
                    {audits.map((audit, index) => (
                      <div key={`sec-${audit.id}`} className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>{audit.date}</span>
                          <span>{audit.metrics.security}%</span>
                        </div>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: colors[index % colors.length],
                            width: `${audit.metrics.security}%`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] relative">
                {/* Simplified grouped bar chart */}
                <div className="grid grid-cols-5 h-full gap-4">
                  {/* SEO */}
                  <div className="flex flex-col gap-2 items-center justify-end">
                    {audits.map((audit, index) => (
                      <div key={`seo-issue-${audit.id}`} className="w-full">
                        <div
                          className="rounded-t-sm text-center text-white text-xs font-medium py-1"
                          style={{
                            height: `${audit.issues_by_category.seo * 4}px`,
                            backgroundColor: colors[index % colors.length],
                          }}
                        >
                          {audit.issues_by_category.seo}
                        </div>
                      </div>
                    ))}
                    <div className="text-xs font-medium mt-2">SEO</div>
                  </div>

                  {/* Performance */}
                  <div className="flex flex-col gap-2 items-center justify-end">
                    {audits.map((audit, index) => (
                      <div key={`perf-issue-${audit.id}`} className="w-full">
                        <div
                          className="rounded-t-sm text-center text-white text-xs font-medium py-1"
                          style={{
                            height: `${audit.issues_by_category.performance * 4}px`,
                            backgroundColor: colors[index % colors.length],
                          }}
                        >
                          {audit.issues_by_category.performance}
                        </div>
                      </div>
                    ))}
                    <div className="text-xs font-medium mt-2">Performance</div>
                  </div>

                  {/* Accessibility */}
                  <div className="flex flex-col gap-2 items-center justify-end">
                    {audits.map((audit, index) => (
                      <div key={`acc-issue-${audit.id}`} className="w-full">
                        <div
                          className="rounded-t-sm text-center text-white text-xs font-medium py-1"
                          style={{
                            height: `${audit.issues_by_category.accessibility * 4}px`,
                            backgroundColor: colors[index % colors.length],
                          }}
                        >
                          {audit.issues_by_category.accessibility}
                        </div>
                      </div>
                    ))}
                    <div className="text-xs font-medium mt-2">Accessibility</div>
                  </div>

                  {/* Best Practices */}
                  <div className="flex flex-col gap-2 items-center justify-end">
                    {audits.map((audit, index) => (
                      <div key={`bp-issue-${audit.id}`} className="w-full">
                        <div
                          className="rounded-t-sm text-center text-white text-xs font-medium py-1"
                          style={{
                            height: `${audit.issues_by_category.bestPractices * 4}px`,
                            backgroundColor: colors[index % colors.length],
                          }}
                        >
                          {audit.issues_by_category.bestPractices}
                        </div>
                      </div>
                    ))}
                    <div className="text-xs font-medium mt-2">Best Practices</div>
                  </div>

                  {/* Security */}
                  <div className="flex flex-col gap-2 items-center justify-end">
                    {audits.map((audit, index) => (
                      <div key={`sec-issue-${audit.id}`} className="w-full">
                        <div
                          className="rounded-t-sm text-center text-white text-xs font-medium py-1"
                          style={{
                            height: `${audit.issues_by_category.security * 4}px`,
                            backgroundColor: colors[index % colors.length],
                          }}
                        >
                          {audit.issues_by_category.security}
                        </div>
                      </div>
                    ))}
                    <div className="text-xs font-medium mt-2">Security</div>
                  </div>
                </div>

                {/* Y-axis */}
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between py-5 text-xs text-gray">
                  <div>30</div>
                  <div>20</div>
                  <div>10</div>
                  <div>0</div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center mt-4 gap-4">
                {audits.map((audit, index) => (
                  <div key={`legend-${audit.id}`} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-xs">{audit.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


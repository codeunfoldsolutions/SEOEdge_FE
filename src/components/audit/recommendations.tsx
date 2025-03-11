"use client"

import { Filter, Download, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RecommendationsProps {
  recommendations: Array<{
    title: string
    description: string
    impact: string
    category: string
    effort: string
    priority: string
    status: string
    details: string
  }>
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold mb-1">Recommendations</h2>
          <p className="text-gray text-sm">Prioritized actions to improve your SEO performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={14} />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download size={14} />
            <span>Export Action Plan</span>
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {recommendations.map((recommendation, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 text-left ml-2">
                  <p className="font-medium">{recommendation.title}</p>
                  <p className="text-xs text-gray">{recommendation.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge
                    className={
                      recommendation.impact === "High"
                        ? "bg-danger/20 text-danger border-danger/20"
                        : recommendation.impact === "Medium"
                          ? "bg-warning/20 text-warning border-warning/20"
                          : "bg-success/20 text-success border-success/20"
                    }
                  >
                    {recommendation.impact} Impact
                  </Badge>

                  <Badge variant="outline">{recommendation.category}</Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-12 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Priority</p>
                    <Badge
                      className={
                        recommendation.priority === "High"
                          ? "bg-danger/20 text-danger border-danger/20"
                          : recommendation.priority === "Medium"
                            ? "bg-warning/20 text-warning border-warning/20"
                            : "bg-success/20 text-success border-success/20"
                      }
                    >
                      {recommendation.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Effort</p>
                    <Badge variant="outline">{recommendation.effort}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Select defaultValue={recommendation.status}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Ignored">Ignored</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Details</p>
                  <p className="text-sm text-gray">{recommendation.details}</p>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Flag size={14} className="mr-1" />
                    Mark as Fixed
                  </Button>
                  <Button size="sm">View Affected Pages</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}


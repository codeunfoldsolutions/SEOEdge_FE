"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface AuditsComparisonSelectorProps {
  audits: Array<{
    id: number
    project: string
    date: string
    time: string
    score: number | null
  }>
  selectedAudits: number[]
  setSelectedAudits: (audits: number[]) => void
}

export function AuditsComparisonSelector({ audits, selectedAudits, setSelectedAudits }: AuditsComparisonSelectorProps) {
  const toggleAudit = (id: number) => {
    if (selectedAudits.includes(id)) {
      // Remove audit if already selected
      if (selectedAudits.length > 2) {
        setSelectedAudits(selectedAudits.filter((auditId) => auditId !== id))
      }
    } else {
      // Add audit if not selected (max 4)
      if (selectedAudits.length < 4) {
        setSelectedAudits([...selectedAudits, id])
      }
    }
  }

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium mb-2">Select Audits to Compare (2-4)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {audits
          .filter((audit) => audit.score !== null)
          .map((audit) => (
            <Card
              key={audit.id}
              className={`cursor-pointer transition-all ${
                selectedAudits.includes(audit.id) ? "border-primary ring-1 ring-primary" : "hover:border-primary/50"
              }`}
              onClick={() => toggleAudit(audit.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{audit.project}</div>
                    <div className="text-xs text-gray">
                      {audit.date} • {audit.time}
                    </div>
                  </div>
                  {audit.score !== null && (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                        audit.score >= 80 ? "bg-success" : audit.score >= 60 ? "bg-warning" : "bg-danger"
                      }`}
                    >
                      {audit.score}
                    </div>
                  )}
                </div>
                {selectedAudits.includes(audit.id) && (
                  <Badge className="bg-primary/20 text-primary border-primary/10 w-full justify-center mt-2">
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}


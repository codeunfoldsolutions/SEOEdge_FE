"use client"

import { Search, Award, TrendingUp, BarChart2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface KeywordsSummaryProps {
  totalKeywords: number
  rankingKeywords: number
  top10Keywords: number
  improvedKeywords: number
}

export function KeywordsSummary({
  totalKeywords,
  rankingKeywords,
  top10Keywords,
  improvedKeywords,
}: KeywordsSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary">
            <Search size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Total Keywords</p>
            <p className="text-2xl font-bold">{totalKeywords}</p>
            <p className="text-xs text-gray">{rankingKeywords} ranking</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-success/10 w-10 h-10 rounded-full flex items-center justify-center text-success">
            <Award size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Top 10 Rankings</p>
            <p className="text-2xl font-bold">{top10Keywords}</p>
            <p className="text-xs text-gray">
              {Math.round((top10Keywords / rankingKeywords) * 100) || 0}% of ranking keywords
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Improving Keywords</p>
            <p className="text-2xl font-bold">{improvedKeywords}</p>
            <p className="text-xs text-gray">
              {Math.round((improvedKeywords / rankingKeywords) * 100) || 0}% of keywords improved
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-warning/10 w-10 h-10 rounded-full flex items-center justify-center text-warning">
            <BarChart2 size={20} />
          </div>
          <div>
            <p className="text-sm text-gray">Avg. Position</p>
            <p className="text-2xl font-bold">12.4</p>
            <p className="text-xs text-gray">+2.1 positions improved</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


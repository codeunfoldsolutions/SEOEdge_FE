"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Minus,
  BarChart2,
  LineChart,
  ArrowUpDown,
  SearchIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkline } from "@/components/keywords/sparkline"

interface KeywordsTableProps {
  keywords: Array<{
    id: number
    keyword: string
    position: number | null
    previousPosition: number | null
    volume: number
    difficulty: string
    cpc: number
    status: string
    group: string
    trend: (number | null)[]
  }>
}

export function KeywordsTable({ keywords }: KeywordsTableProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([])

  const toggleSelectAll = () => {
    if (selectedKeywords.length === keywords.length) {
      setSelectedKeywords([])
    } else {
      setSelectedKeywords(keywords.map((keyword) => keyword.id))
    }
  }

  const toggleSelectKeyword = (id: number) => {
    if (selectedKeywords.includes(id)) {
      setSelectedKeywords(selectedKeywords.filter((keywordId) => keywordId !== id))
    } else {
      setSelectedKeywords([...selectedKeywords, id])
    }
  }

  const getDiffIndicator = (current: number | null, previous: number | null) => {
    if (current === null || previous === null) return null
    const diff = previous - current

    if (diff > 0) {
      return (
        <div className="flex items-center text-success">
          <ChevronUp size={16} />
          <span>+{diff}</span>
        </div>
      )
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-danger">
          <ChevronDown size={16} />
          <span>{diff}</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-gray">
          <Minus size={16} />
          <span>0</span>
        </div>
      )
    }
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedKeywords.length === keywords.length && keywords.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Keyword
                <ArrowUpDown size={14} className="ml-1 text-gray" />
              </div>
            </TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>CPC ($)</TableHead>
            <TableHead>Group</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywords.map((keyword) => (
            <TableRow key={keyword.id}>
              <TableCell>
                <Checkbox
                  checked={selectedKeywords.includes(keyword.id)}
                  onCheckedChange={() => toggleSelectKeyword(keyword.id)}
                />
              </TableCell>
              <TableCell>
                <div className="font-medium max-w-[180px] truncate">{keyword.keyword}</div>
              </TableCell>
              <TableCell>
                {keyword.position ? (
                  <Badge
                    className={
                      keyword.position <= 3
                        ? "bg-success/20 text-success border-success/10"
                        : keyword.position <= 10
                          ? "bg-primary/20 text-primary border-primary/10"
                          : keyword.position <= 20
                            ? "bg-warning/20 text-warning border-warning/10"
                            : "bg-danger/20 text-danger border-danger/10"
                    }
                  >
                    {keyword.position}
                  </Badge>
                ) : (
                  <Badge variant="outline">Not ranking</Badge>
                )}
              </TableCell>
              <TableCell>{getDiffIndicator(keyword.position, keyword.previousPosition)}</TableCell>
              <TableCell>
                {keyword.trend.some((pos) => pos !== null) ? (
                  <Sparkline data={keyword.trend} />
                ) : (
                  <span className="text-gray">No data</span>
                )}
              </TableCell>
              <TableCell>{keyword.volume.toLocaleString()}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    keyword.difficulty === "High"
                      ? "bg-danger/10 text-danger border-danger/10"
                      : keyword.difficulty === "Medium"
                        ? "bg-warning/10 text-warning border-warning/10"
                        : "bg-success/10 text-success border-success/10"
                  }
                >
                  {keyword.difficulty}
                </Badge>
              </TableCell>
              <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant="outline">{keyword.group.charAt(0).toUpperCase() + keyword.group.slice(1)}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <SearchIcon size={14} className="mr-2" />
                        <span>Check Ranking</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LineChart size={14} className="mr-2" />
                        <span>View History</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart2 size={14} className="mr-2" />
                        <span>SERP Analysis</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span className="text-danger">Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


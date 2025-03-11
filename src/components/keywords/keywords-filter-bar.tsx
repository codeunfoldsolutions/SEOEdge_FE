"use client"

import { Filter, Download, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface KeywordsFilterBarProps {
  groupFilter: string
  onGroupChange: (group: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  keywordGroups: string[]
}

export function KeywordsFilterBar({
  groupFilter,
  onGroupChange,
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  keywordGroups,
}: KeywordsFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
      <div className="relative w-full sm:w-auto max-w-sm">
        <Input
          placeholder="Search keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray">
          <Search size={16} />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Tabs defaultValue={statusFilter} onValueChange={onStatusChange} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 relative">
              <Tag size={16} />
              {groupFilter !== "all" && <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Keyword Groups</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => onGroupChange("all")}
                className={groupFilter === "all" ? "bg-muted" : ""}
              >
                All Groups
              </DropdownMenuItem>
              {keywordGroups.map((group) => (
                <DropdownMenuItem
                  key={group}
                  onClick={() => onGroupChange(group)}
                  className={groupFilter === group ? "bg-muted" : ""}
                >
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Keywords</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>All Positions</DropdownMenuItem>
              <DropdownMenuItem>Top 3</DropdownMenuItem>
              <DropdownMenuItem>Top 10</DropdownMenuItem>
              <DropdownMenuItem>11-20</DropdownMenuItem>
              <DropdownMenuItem>21-50</DropdownMenuItem>
              <DropdownMenuItem>51-100</DropdownMenuItem>
              <DropdownMenuItem>Not Ranking</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>All Difficulties</DropdownMenuItem>
              <DropdownMenuItem>Low</DropdownMenuItem>
              <DropdownMenuItem>Medium</DropdownMenuItem>
              <DropdownMenuItem>High</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" className="h-10 w-10">
          <Download size={16} />
        </Button>
      </div>
    </div>
  )
}

import { Search } from "lucide-react"


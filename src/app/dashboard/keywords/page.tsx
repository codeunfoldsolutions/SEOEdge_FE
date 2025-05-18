"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { KeywordsTable } from "@/components/keywords/keywords-table";
import { KeywordsFilterBar } from "@/components/keywords/keywords-filter-bar";
import { KeywordsSummary } from "@/components/keywords/keywords-summary";
import { KeywordsChart } from "@/components/keywords/keywords-chart";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

export default function KeywordsPage() {
  const [groupFilter, setGroupFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample keywords data
  const keywords = [
    {
      id: 1,
      keyword: "seo tools",
      project: "example.com",
      position: 4,
      previousPosition: 6,
      volume: 5400,
      difficulty: "High",
      cpc: 3.75,
      status: "tracking",
      group: "main",
      trend: [6, 6, 5, 4, 4, 4],
    },
    {
      id: 2,
      keyword: "website audit",
      project: "example.com",
      position: 7,
      previousPosition: 8,
      volume: 3200,
      difficulty: "Medium",
      cpc: 2.5,
      status: "tracking",
      group: "main",
      trend: [9, 8, 8, 7, 8, 7],
    },
    {
      id: 3,
      keyword: "seo analysis",
      project: "example.com",
      position: 12,
      previousPosition: 9,
      volume: 4800,
      difficulty: "High",
      cpc: 4.2,
      status: "tracking",
      group: "main",
      trend: [10, 9, 10, 11, 12, 12],
    },
    {
      id: 4,
      keyword: "page optimization",
      project: "example.com",
      position: 15,
      previousPosition: 15,
      volume: 2100,
      difficulty: "Medium",
      cpc: 1.8,
      status: "tracking",
      group: "secondary",
      trend: [18, 17, 16, 15, 15, 15],
    },
    {
      id: 5,
      keyword: "seo performance",
      project: "example.com",
      position: 9,
      previousPosition: 14,
      volume: 1800,
      difficulty: "Low",
      cpc: 1.5,
      status: "tracking",
      group: "secondary",
      trend: [16, 14, 12, 10, 9, 9],
    },
    {
      id: 6,
      keyword: "keyword research",
      project: "example.com",
      position: 22,
      previousPosition: 25,
      volume: 6200,
      difficulty: "High",
      cpc: 5.1,
      status: "tracking",
      group: "research",
      trend: [28, 27, 26, 25, 23, 22],
    },
    {
      id: 7,
      keyword: "competitive analysis",
      project: "example.com",
      position: 18,
      previousPosition: 22,
      volume: 2900,
      difficulty: "Medium",
      cpc: 2.8,
      status: "tracking",
      group: "research",
      trend: [24, 23, 21, 20, 19, 18],
    },
    {
      id: 8,
      keyword: "seo metrics",
      project: "example.com",
      position: 8,
      previousPosition: 10,
      volume: 1200,
      difficulty: "Low",
      cpc: 1.7,
      status: "tracking",
      group: "secondary",
      trend: [12, 11, 10, 9, 8, 8],
    },
    {
      id: 9,
      keyword: "rank tracking tool",
      project: "example.com",
      position: null,
      previousPosition: null,
      volume: 3800,
      difficulty: "High",
      cpc: 3.9,
      status: "monitoring",
      group: "opportunities",
      trend: [null, null, null, null, null, null],
    },
    {
      id: 10,
      keyword: "technical seo audit",
      project: "example.com",
      position: null,
      previousPosition: null,
      volume: 4100,
      difficulty: "Medium",
      cpc: 3.4,
      status: "monitoring",
      group: "opportunities",
      trend: [null, null, null, null, null, null],
    },
  ];

  // Filter keywords based on group, status, and search query
  const filteredKeywords = keywords.filter((keyword) => {
    const matchesGroup = groupFilter === "all" || keyword.group === groupFilter;
    const matchesStatus =
      statusFilter === "all" || keyword.status === statusFilter;
    const matchesSearch = keyword.keyword
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesGroup && matchesStatus && matchesSearch;
  });

  // Calculate summary statistics
  const totalKeywords = keywords.length;
  const rankingKeywords = keywords.filter((k) => k.position !== null).length;
  const top10Keywords = keywords.filter(
    (k) => k.position !== null && k.position <= 10
  ).length;
  const improvedKeywords = keywords.filter(
    (k) =>
      k.position !== null &&
      k.previousPosition !== null &&
      k.position < k.previousPosition
  ).length;

  return (
    <>
      <DashboardHeader />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Keywords</h1>
              <p className="text-gray">
                Track your keyword rankings and discover opportunities
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Upload size={14} />
                <span>Import Keywords</span>
              </Button>
              <Button size="sm" className="gap-1">
                <Plus size={14} />
                <span>Add Keywords</span>
              </Button>
            </div>
          </div>

          {/* Summary stats */}
          <KeywordsSummary
            totalKeywords={totalKeywords}
            rankingKeywords={rankingKeywords}
            top10Keywords={top10Keywords}
            improvedKeywords={improvedKeywords}
          />

          {/* Keywords chart */}
          <KeywordsChart
            keywords={keywords.filter(
              (k) => k.position !== null && k.group === "main"
            )}
          />

          {/* Filters */}
          <KeywordsFilterBar
            groupFilter={groupFilter}
            onGroupChange={setGroupFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            keywordGroups={["main", "secondary", "research", "opportunities"]}
          />

          {/* Keywords table */}
          <KeywordsTable keywords={filteredKeywords} />
        </div>
      </main>
    </>
  );
}

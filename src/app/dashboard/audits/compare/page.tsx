"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { AuditsComparisonChart } from "@/components/audits/audits-comparison-chart";
import { AuditsComparisonTable } from "@/components/audits/audits-comparison-table";
import { AuditsComparisonSelector } from "@/components/audits/audits-comparison-selector";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuditsComparePage() {
  const searchParams = useSearchParams();
  const [selectedAudits, setSelectedAudits] = useState<number[]>([]);

  // Sample audits data

  const audits = useMemo(() => {
    return [
      {
        id: 1,
        project: "example.com",
        date: "Aug 15, 2023",
        time: "10:30 AM",
        score: 78,
        status: "completed",
        issues: 42,
        duration: "1m 42s",
        metrics: {
          seo: 85,
          performance: 70,
          accessibility: 90,
          bestPractices: 75,
          security: 70,
        },
        issues_by_category: {
          seo: 15,
          performance: 8,
          accessibility: 4,
          bestPractices: 10,
          security: 5,
        },
      },
      {
        id: 2,
        project: "example.com",
        date: "Aug 1, 2023",
        time: "9:15 AM",
        score: 72,
        status: "completed",
        issues: 51,
        duration: "1m 38s",
        metrics: {
          seo: 80,
          performance: 65,
          accessibility: 85,
          bestPractices: 70,
          security: 60,
        },
        issues_by_category: {
          seo: 18,
          performance: 12,
          accessibility: 6,
          bestPractices: 10,
          security: 5,
        },
      },
      {
        id: 3,
        project: "example.com",
        date: "Jul 15, 2023",
        time: "2:45 PM",
        score: 68,
        status: "completed",
        issues: 58,
        duration: "1m 45s",
        metrics: {
          seo: 75,
          performance: 60,
          accessibility: 80,
          bestPractices: 68,
          security: 57,
        },
        issues_by_category: {
          seo: 20,
          performance: 15,
          accessibility: 8,
          bestPractices: 12,
          security: 3,
        },
      },
      {
        id: 4,
        project: "example.com",
        date: "Jul 1, 2023",
        time: "11:30 AM",
        score: 62,
        status: "completed",
        issues: 65,
        duration: "1m 50s",
        metrics: {
          seo: 70,
          performance: 55,
          accessibility: 75,
          bestPractices: 60,
          security: 50,
        },
        issues_by_category: {
          seo: 23,
          performance: 18,
          accessibility: 10,
          bestPractices: 9,
          security: 5,
        },
      },
    ];
  }, []);

  // Set the selected audits based on URL params
  useEffect(() => {
    const ids = searchParams.get("ids");
    if (ids) {
      const auditsToCompare = ids.split(",").map((id) => Number.parseInt(id));
      setSelectedAudits(auditsToCompare);
    } else {
      // Default to the two most recent audits
      setSelectedAudits([audits[0].id, audits[1].id]);
    }
  }, [searchParams, audits]);

  // Filter to only show the selected audits
  const selectedAuditsData = audits.filter((audit) =>
    selectedAudits.includes(audit.id)
  );

  return (
    <>
      <DashboardHeader />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/audits">
                  <ArrowLeft size={16} className="mr-1" />
                  Back to Audits
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold mb-1">Compare Audits</h1>
                <p className="text-gray">
                  Compare metrics and issues between audit reports
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download size={14} />
                <span>Export as PDF</span>
              </Button>
            </div>
          </div>

          {/* Audit selection */}
          <AuditsComparisonSelector
            audits={audits}
            selectedAudits={selectedAudits}
            setSelectedAudits={setSelectedAudits}
          />

          {/* Comparison charts */}
          <AuditsComparisonChart audits={selectedAuditsData} />

          {/* Comparison tables */}
          <AuditsComparisonTable audits={selectedAuditsData} />
        </div>
      </main>
    </>
  );
}

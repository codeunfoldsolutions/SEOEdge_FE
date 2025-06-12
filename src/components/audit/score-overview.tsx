"use client";

import { Search, Zap, Smartphone, Check, Shield, History } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ScoreOverviewProps {
  data: {
    ownerId: string;
    projectId: string;
    duration: string;
    type: string;
    status: string;
    criticalCount: number;
    score: number;
    categories: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    };
    audits: {
      [key: string]: {
        score: number;
        description: string;
        displayValue?: string;
      };
    };

    createdAt: string;
    updatedAt: string;
    id: string;
  };
  compareMode?: boolean;
  onCompare?: () => void;
  comparisonData?: {
    overall: { improved: boolean; percentage: string; change: number };
    seo: { improved: boolean; percentage: string };
    performance: { improved: boolean; percentage: string };
    accessibility: { improved: boolean; percentage: string };
    bestPractices: { improved: boolean; percentage: string };
    security: { improved: boolean; percentage: string };
  };
  selectedCompareDate?: string;
}

export function ScoreOverview({
  data,
  compareMode = false,
  onCompare,
  comparisonData,
  selectedCompareDate,
}: ScoreOverviewProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const scorePercent = data.score * 100;
  const progress = data.score * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-1 bg-white rounded-lg p-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Overall Score</h2>
          {compareMode && comparisonData && (
            <Badge
              className={
                comparisonData.overall.improved
                  ? "bg-success/20 text-success"
                  : "bg-danger/20 text-danger"
              }
            >
              {comparisonData.overall.improved ? "+" : ""}
              {comparisonData.overall.percentage}%
            </Badge>
          )}
        </div>

        <div className="flex flex-row  lg:flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />

              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={
                  scorePercent >= 80
                    ? "#10b981"
                    : scorePercent >= 60
                    ? "#f59e0b"
                    : "#ef4444"
                }
                strokeWidth="10"
                strokeDasharray={`${progress} ${circumference - progress}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />

              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
                fontWeight="bold"
                fill={
                  scorePercent >= 80
                    ? "#10b981"
                    : scorePercent >= 60
                    ? "#f59e0b"
                    : "#ef4444"
                }
              >
                {Math.round(scorePercent)}
              </text>

              <text
                x="50"
                y="65"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#64748b"
              >
                out of 100
              </text>
            </svg>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium mb-1">
              {data.score * 100 >= 80
                ? "Excellent"
                : data.score * 100 >= 60
                ? "Good"
                : "Needs Improvement"}
            </p>
            <p className="text-sm text-gray">
              Your website is performing{" "}
              {data.score * 100 >= 80
                ? "very well"
                : data.score * 100 >= 60
                ? "adequately"
                : "below average"}{" "}
              compared to similar websites.
            </p>

            {compareMode && comparisonData && selectedCompareDate && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">
                  {comparisonData.overall.improved ? "Improved" : "Decreased"}{" "}
                  by {Math.abs(comparisonData.overall.change)} points
                </p>
                <p className="text-xs text-gray">Since {selectedCompareDate}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Category Scores</h2>
          {!compareMode && onCompare && (
            <Button variant="outline" size="sm" onClick={onCompare}>
              <History size={14} className="mr-1" />
              Compare with Previous
            </Button>
          )}
        </div>

        <div className="space-y-4 ">
          {Object.entries(data.audits).map(
            (
              [key, audit]: [
                string,
                { score: number; description: string; displayValue?: string }
              ],
              index
            ) => (
              <CategoryScore
                key={key}
                title={key.charAt(0).toUpperCase() + key.slice(1)}
                // icon={
                //   key === "seo" ? (
                //     <Search size={16} className="text-primary" />
                //   ) : key === "performance" ? (
                //     <Zap size={16} className="text-primary" />
                //   ) : key === "accessibility" ? (
                //     <Smartphone size={16} className="text-primary" />
                //   ) : key === "bestPractices" ? (
                //     <Check size={16} className="text-primary" />
                //   ) : key === "security" ? (
                //     <Shield size={16} className="text-primary" />
                //   ) : (
                //     <Search size={16} className="text-primary" />
                //   )
                // }
                score={audit.score}
                description={audit.description}
                compareMode={compareMode}
                comparisonData={
                  comparisonData
                    ? (
                        comparisonData as {
                          [key: string]: {
                            improved: boolean;
                            percentage: string;
                          };
                        }
                      )[key]
                    : undefined
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

interface CategoryScoreProps {
  title: string;
  // icon: React.ReactNode;
  score: number;
  description: string;
  compareMode?: boolean;
  comparisonData?: { improved: boolean; percentage: string };
}

function CategoryScore({
  title,
  score,
  description,
  compareMode,
  comparisonData,
}: CategoryScoreProps) {
  const scorePercentage = Math.round(score * 100);

  return (
    <div className="  border shadow rounded-lg p-4 bg-white ">
      <div className="flex  justify-between mb-1">
        <div className="flex items-center gap-2">
          {/* {icon} */}
          <span className="text-sm font-bold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{scorePercentage}/100</span>
          {compareMode && comparisonData && (
            <Badge
              className={
                comparisonData.improved
                  ? "bg-success/20 text-success"
                  : "bg-danger/20 text-danger"
              }
            >
              {comparisonData.improved ? "+" : ""}
              {comparisonData.percentage}%
            </Badge>
          )}
        </div>
      </div>
      <Progress
        value={scorePercentage}
        className="h-2"
        indicatorClassName={
          scorePercentage >= 80
            ? "bg-success"
            : scorePercentage >= 60
            ? "bg-warning"
            : "bg-danger"
        }
      />
      <p className="text-xs text-gray mt-1">{description}</p>
    </div>
  );
}

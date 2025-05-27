"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface PerformanceChartProps {
  title: string;
  subtitle: string;
}

export function PerformanceChart({ title, subtitle }: PerformanceChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-border">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold mb-1">{title}</h2>
          <p className="text-gray text-sm">{subtitle}</p>
        </div>
        <Button variant="outline" size="sm">
          Monthly <ChevronDown size={14} className="ml-1" />
        </Button>
      </div>

      {/* Chart */}
      <div className="h-[250px] relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        {/* Chart visualization */}
        <div className="ml-10 h-full relative">
          {/* Line chart - simplified representation */}
          <svg
            className="w-full h-full"
            viewBox="0 0 600 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C50,120 100,130 150,90 C200,50 250,40 300,60 C350,80 400,30 450,20 C500,10 550,30 600,20"
              fill="none"
              stroke="#326cdb"
              strokeWidth="3"
            />
          </svg>

          {/* Highlighted point */}
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="bg-[#1d1f2c] text-white px-3 py-1 rounded text-sm font-medium mb-2 whitespace-nowrap">
                Score: 40/100
              </div>
              <div className="w-4 h-4 rounded-full bg-white border-4 border-primary mx-auto"></div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
          </div>
        </div>
      </div>
    </div>
  );
}

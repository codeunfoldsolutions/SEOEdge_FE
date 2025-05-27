"use client";

import { RefreshCw, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomeSection({ userName }: { userName: string }) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome Back {userName}</h1>
        <p className="text-gray">
          Here&apos;s an overview of your SEO performance and audit results
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw size={14} />
          <span>Run New Audit</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-1">
          <Calendar size={16} className="mr-1" />
          Last 30 Days
          <ChevronDown size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}

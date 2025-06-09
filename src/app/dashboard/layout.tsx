"use client";

import type React from "react";
import { DashboardSidebar } from "@/partials/sidebar";

const subscription = {
  plan: "Professional",
  auditsRemaining: 42,
  nextBillingDate: "Nov 15, 2023",
  features: [
    "Unlimited Projects",
    "PDF Reports",
    "Email Sharing",
    "Scheduled Audits",
  ],
};

import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebar =
    pathname.startsWith("/dashboard/projects/") ||
    pathname.startsWith("/dashboard/audits/");

  return (
    <div className="flex h-screen bg-background">
      {/* Dashboard Sidebar - shared across all dashboard pages */}
      {!hideSidebar && <DashboardSidebar subscription={subscription} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}

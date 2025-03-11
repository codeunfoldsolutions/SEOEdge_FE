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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Dashboard Sidebar - shared across all dashboard pages */}
      <DashboardSidebar subscription={subscription} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}

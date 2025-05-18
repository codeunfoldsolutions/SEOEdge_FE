"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { ProfileSettings } from "@/components/settings/profile-settings";
// import { TeamSettings } from "@/components/settings/team-settings"
// import { NotificationSettings } from "@/components/settings/notification-settings"
// import { BillingSettings } from "@/components/settings/billing-settings";
// import { ApiSettings } from "@/components/settings/api-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Sample projects
  const projects = [
    { name: "example.com", lastAudit: "2 hours ago", score: 78 },
    { name: "myshop.com", lastAudit: "1 day ago", score: 65 },
    { name: "blog.example.com", lastAudit: "3 days ago", score: 92 },
  ];

  // Sample user data
  const userData = {
    name: "Darcy Liu",
    email: "darcy.liu@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Owner",
    company: "Acme Inc",
    timezone: "Pacific/Auckland",
    language: "English",
  };

  // Sample team data
  // const teamData = [
  //   {
  //     id: 1,
  //     name: "Darcy Liu",
  //     email: "darcy.liu@example.com",
  //     role: "Owner",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     dateAdded: "Jan 10, 2023",
  //   },
  //   {
  //     id: 2,
  //     name: "Alex Johnson",
  //     email: "alex.johnson@example.com",
  //     role: "Admin",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     dateAdded: "Feb 15, 2023",
  //   },
  //   {
  //     id: 3,
  //     name: "Maria Garcia",
  //     email: "maria.garcia@example.com",
  //     role: "Editor",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     dateAdded: "Mar 22, 2023",
  //   },
  //   {
  //     id: 4,
  //     name: "Sam Chen",
  //     email: "sam.chen@example.com",
  //     role: "Viewer",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     dateAdded: "Apr 5, 2023",
  //   },
  // ];

  // Sample subscription data
  // const subscriptionData = {
  //   plan: "Professional",
  //   price: 99,
  //   billingCycle: "monthly",
  //   nextBillingDate: "November 15, 2023",
  //   paymentMethod: "Visa ending in 4242",
  //   features: [
  //     "Unlimited projects",
  //     "500 keywords tracking",
  //     "Weekly automated audits",
  //     "Team collaboration",
  //     "PDF reports",
  //     "Email support",
  //   ],
  //   usage: {
  //     projects: { used: 5, limit: "Unlimited" },
  //     keywords: { used: 248, limit: 500 },
  //     audits: { used: 12, remaining: 30 },
  //     teamMembers: { used: 4, limit: 10 },
  //   },
  // };

  // Sample notification settings
  // const notificationSettings = {
  //   email: {
  //     auditCompletions: true,
  //     weeklyReports: true,
  //     keywordAlerts: true,
  //     teamChanges: false,
  //     billingUpdates: true,
  //     productNews: false,
  //   },
  //   inApp: {
  //     auditCompletions: true,
  //     keywordAlerts: true,
  //     teamChanges: true,
  //     billingUpdates: true,
  //     productNews: true,
  //   },
  // };

  // Sample API keys
  // const apiKeys = [
  //   {
  //     id: "api_123456",
  //     name: "Production API Key",
  //     lastUsed: "2 hours ago",
  //     createdAt: "Aug 15, 2023",
  //     permissions: ["read", "write"],
  //   },
  //   {
  //     id: "api_789012",
  //     name: "Reporting API Key",
  //     lastUsed: "5 days ago",
  //     createdAt: "Jul 20, 2023",
  //     permissions: ["read"],
  //   },
  // ];

  return (
    <>
      <DashboardHeader />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Settings</h1>
            <p className="text-gray">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Settings Tabs */}
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Active Tab Content */}
          <div className="mt-6">
            {activeTab === "profile" && <ProfileSettings userData={userData} />}

            {/* {activeTab === "team" && <TeamSettings teamData={teamData} />} */}

            {/* {activeTab === "notifications" && <NotificationSettings settings={notificationSettings} />} */}

            {/* {activeTab === "billing" && (
              <BillingSettings subscription={subscriptionData} />
            )} */}

            {/* {activeTab === "api" && <ApiSettings apiKeys={apiKeys} />} */}
          </div>
        </div>
      </main>
    </>
  );
}

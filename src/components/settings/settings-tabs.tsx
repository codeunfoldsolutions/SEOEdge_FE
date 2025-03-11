"use client"

import { User, Users, Bell, CreditCard, Key } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User size={16} />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="team" className="flex items-center gap-2">
          <Users size={16} />
          <span className="hidden sm:inline">Team</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell size={16} />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard size={16} />
          <span className="hidden sm:inline">Billing</span>
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2">
          <Key size={16} />
          <span className="hidden sm:inline">API</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}


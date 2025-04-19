"use client";
import {
  BarChart3,
  Globe,
  Search,
  // LineChart,
  // Shield,
  FileText,
  Settings,
  HelpCircle,
  Target,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  subscription: {
    plan: string;
    auditsRemaining: number;
    nextBillingDate: string;
  };
}

export function DashboardSidebar({ subscription }: SidebarProps) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const lastSegment = segments[segments.length - 1];

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      name: "projects",
      label: "Projects",
      icon: Globe,
      href: "/dashboard/projects",
    },
    {
      name: "audits",
      label: "Audits",
      icon: Search,
      href: "/dashboard/audits",
    },
    // {
    //   name: "keywords",
    //   label: "Keywords",
    //   icon: LineChart,
    //   href: "/dashboard/keywords",
    // },
    // {
    //   name: "competitors",
    //   label: "Competitors",
    //   icon: Shield,
    //   href: "/dashboard/competitors",
    // },
    {
      name: "reports",
      label: "Reports",
      icon: FileText,
      href: "/dashboard/reports",
    },
    {
      name: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const supportItems = [
    { name: "help", label: "Help", icon: HelpCircle, href: "#" },
    { name: "feedback", label: "Feedback", icon: Target, href: "#" },
  ];

  return (
    <div className="w-[190px] border-r border-border flex flex-col bg-sidebar-background">
      <div className="p-4 border-b border-border">
        <Link href="/dashboard">
          <div className="flex justify-center">
            <Image
              src={"/seoedge logo.png"}
              width={140}
              height={40}
              alt="Logo"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col flex-1">
        <div className="p-4">
          <p className="text-xs text-gray uppercase font-medium mb-3">
            GENERAL MENU
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-md ${
                  lastSegment.includes(item.name)
                    ? "bg-primary-blue text-primary-white"
                    : "text-foreground hover:bg-primary-blue/10"
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 mt-4">
          <p className="text-xs text-gray uppercase font-medium mb-3">
            SUBSCRIPTION
          </p>
          <div className="bg-primary-blue text-primary-white rounded-md p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">{subscription.plan}</span>
              <Badge
                variant="outline"
                className="bg-secondry-blue  border-primary/10 text-xs text-primary-white"
              >
                Active
              </Badge>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span>Audits Remaining:</span>
                <span className="font-medium">
                  {subscription.auditsRemaining}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Next Billing:</span>
                <span className="font-medium">
                  {subscription.nextBillingDate}
                </span>
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            {supportItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 p-2 rounded-md text-foreground hover:bg-muted"
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-danger hover:text-danger hover:bg-danger/10"
          >
            <LogOut size={18} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowLeft,
  PanelLeft,
  BookmarkPlus,
  Download,
  Share2,
  RefreshCw,
  Bell,
  ChevronDown,
  User,
  Settings,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import AddAuditDialog from "../audits/add-audit-dialog";

interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  compareMode?: boolean;
  setCompareMode?: (compare: boolean) => void;
  selectedAuditDate?: string;
  setSelectedAuditDate?: (date: string) => void;
  selectedCompareDate?: string;
  setSelectedCompareDate?: (date: string) => void;
  historicalScores?: Array<{
    date: string;
    overall: number;
    seo: number;
    performance: number;
    accessibility: number;
    bestPractices: number;
    security: number;
  }>;
  auditDetails: {
    url: string;
  };
  isPremium?: boolean;
}

export function AuditHeader({
  showSidebar,
  setShowSidebar,
  compareMode = false,
  setCompareMode,
  selectedAuditDate,
  setSelectedAuditDate,
  selectedCompareDate,
  setSelectedCompareDate,
  historicalScores = [],
  auditDetails,
  isPremium = false,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-border flex items-center px-4 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          className="h-8 w-8"
        >
          <PanelLeft size={18} />
        </Button>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm text-gray"
          >
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </Link>
          <span className="text-gray">/</span>
          <span className="font-medium text-sm">Audit Results</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {isPremium &&
            setCompareMode &&
            setSelectedAuditDate &&
            setSelectedCompareDate && (
              <div className="flex items-center gap-2">
                <Select
                  value={selectedAuditDate}
                  onValueChange={setSelectedAuditDate}
                >
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <SelectValue placeholder="Select audit date" />
                  </SelectTrigger>
                  <SelectContent>
                    {historicalScores.map((score, index) => (
                      <SelectItem
                        key={index}
                        value={
                          index === 0 ? `Current (${score.date})` : score.date
                        }
                      >
                        {index === 0 ? `Current (${score.date})` : score.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {compareMode && (
                  <>
                    <span className="text-xs text-gray">vs</span>
                    <Select
                      value={selectedCompareDate}
                      onValueChange={setSelectedCompareDate}
                    >
                      <SelectTrigger className="w-[180px] h-8 text-xs">
                        <SelectValue placeholder="Select comparison date" />
                      </SelectTrigger>
                      <SelectContent>
                        {historicalScores.slice(1).map((score, index) => (
                          <SelectItem key={index} value={score.date}>
                            {score.date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setCompareMode(!compareMode)}
                >
                  {compareMode ? "Exit Compare" : "Compare"}
                </Button>
              </div>
            )}

          <Separator orientation="vertical" className="h-8" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <BookmarkPlus size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save Audit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Download size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download PDF Report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Share2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Results</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AddAuditDialog url={auditDetails.url} />

          <Separator orientation="vertical" className="h-8" />

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell size={16} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src="/placeholder.svg?height=24&width=24"
                    alt="User"
                  />
                  <AvatarFallback>DL</AvatarFallback>
                </Avatar>
                <span className="text-sm">Darcy Liu</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User size={14} className="mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={14} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users size={14} className="mr-2" />
                Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle size={14} className="mr-2" />
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut size={14} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

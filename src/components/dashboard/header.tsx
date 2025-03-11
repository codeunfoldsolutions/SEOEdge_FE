"use client";

import Image from "next/image";
import { ArrowRight, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface HeaderProps {
  activeProject: string;
  projects: Array<{ name: string }>;
  onProjectChange?: (project: string) => void;
}

export function DashboardHeader({
  activeProject,
  projects,
  onProjectChange,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-border flex items-center px-4 bg-white">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Enter website URL to audit"
            defaultValue="https://www.example.com"
            className="pr-24 bg-white"
          />
          <Link href={`/audit-results`}>
            <Button
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-medium "
            >
              Run Quick Audit <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Select defaultValue={activeProject} onValueChange={onProjectChange}>
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.name} value={project.name}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <div className="w-8 h-8 rounded-full bg-[#f0f1f3] overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

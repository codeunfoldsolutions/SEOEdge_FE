"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AddProjectModal({ showIcon = true, text = "Add Project" }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 cursor-pointer">
          {showIcon && <Plus size={14} />}
          <span>{text}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Add a new website to track SEO performance and run audits.
          </DialogDescription>
        </DialogHeader>

        {/* <Tabs defaultValue="website" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="website">
              <Globe size={14} className="mr-2" />
              Website URL
            </TabsTrigger>
            <TabsTrigger value="file">
              <Upload size={14} className="mr-2" />
              Import Sitemap
            </TabsTrigger>
            <TabsTrigger value="csv">
              <Database size={14} className="mr-2" />
              Import CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="website" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input id="website-url" placeholder="https://example.com" />
              <p className="text-xs text-gray">Enter the full URL including https://</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="My Website" />
            </div>

            <div className="space-y-2">
              <Label>Project Type</Label>
              <RadioGroup defaultValue="business" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business">Business</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="blog" id="blog" />
                  <Label htmlFor="blog">Blog</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ecommerce" id="ecommerce" />
                  <Label htmlFor="ecommerce">E-commerce</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Project Notes (Optional)</Label>
              <Textarea id="notes" placeholder="Add any notes about this project" />
            </div>
          </TabsContent>

          <TabsContent value="file" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sitemap-url">Sitemap URL</Label>
              <Input id="sitemap-url" placeholder="https://example.com/sitemap.xml" />
            </div>

            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="h-10 w-10 text-gray mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">Upload Sitemap XML File</p>
              <p className="text-xs text-gray mb-3">Drag and drop or click to upload</p>
              <Button size="sm" variant="outline">
                Select File
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray">
                Upload a CSV file with URLs to monitor. The file should have a column named &quot;url&quot; with each URL on a
                separate row.
              </p>
            </div>

            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Database className="h-10 w-10 text-gray mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">Upload CSV File</p>
              <p className="text-xs text-gray mb-3">Drag and drop or click to upload</p>
              <Button size="sm" variant="outline">
                Select File
              </Button>
            </div>

            <div className="mt-2">
              <a href="#" className="text-xs text-primary underline">
                Download CSV template
              </a>
            </div>
          </TabsContent>
        </Tabs> */}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website-url">Website URL</Label>
            <Input id="website-url" placeholder="https://example.com" />
            <p className="text-xs text-gray">
              Enter the full URL including https://
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input id="project-name" placeholder="My Website" />
          </div>

          <div className="space-y-2">
            <Label>Project Type</Label>
            <RadioGroup defaultValue="business" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">Business</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blog" id="blog" />
                <Label htmlFor="blog">Blog</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ecommerce" id="ecommerce" />
                <Label htmlFor="ecommerce">E-commerce</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Project Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this project"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Add Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import {
  SeoProject,
  useSeoProjectMutation,
} from "@/adapters/SeoProjectAdapter";

import { ProjectCreate } from "@/adapters/types/Seo/ProjectAdapterTypes";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define create project schema
const ProjectSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Description title is required"),
  type: z.enum(["blog", "ecommerce", "business", "other"]),
});

export function AddProjectModal() {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | number | null>(null);

  const form = useForm<ProjectCreate>({
    resolver: zodResolver(ProjectSchema),
  });

  const createProjectMutation = useSeoProjectMutation({
    mutationCallback: SeoProject.createProject,
    onSuccess: () => {
      form.reset();
      setOpen(false);
    },
    onError: (error) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create Project. Please try again.";
      setFormError(errorMessage);
    },
  });

  const submitForm = async (data: ProjectCreate) => {
    await createProjectMutation.mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 cursor-pointer">
          {<Plus size={14} />}
          <span>Add Project</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Add a new website to track SEO performance and run audits.
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {formError}
              </div>
            )}

            {/* URL input */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1e1e1e]">
                    Website URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                      className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                    />
                  </FormControl>
                  <p className="text-xs text-gray">
                    Enter the full URL including https://
                  </p>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            {/* Title input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1e1e1e]">
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="My Website"
                      {...field}
                      className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            {/* Project Type input */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1e1e1e]">
                    Project Type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-4"
                    >
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
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            {/* Project Notes input */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1e1e1e]">
                    Project Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about this project"
                      {...field}
                      className="w-full p-3 pl-4 border border-[#e4e4e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20 focus:border-[#4285f4] transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

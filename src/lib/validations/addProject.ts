import { z } from "zod";

export const addProjectSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(10, "Description title is required"),
  type: z.enum(["blog", "ecommerce", "business", "other"]),
});

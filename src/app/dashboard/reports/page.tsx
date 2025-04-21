"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  FileText,
  ImageIcon,
  Info,
  Link2,
  List,
  Lock,
  MoveRight,
  Smartphone,
  Tag,
  XCircle,
  Gauge,
  Code,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { OverallScoreChart } from "../../../components/seo-charts/overall-score-chart";
import { MetaTagsChart } from "../../../components/seo-charts/meta-tags-chart";
import { PageSpeedChart } from "../../../components/seo-charts/page-speed-chart";
import { MobileFriendlinessChart } from "../../../components/seo-charts/mobile-friendliness-chart";
import { BacklinksChart } from "../../../components/seo-charts/backlinks-chart";
import { DashboardHeader } from "@/components/dashboard/header";

export default function SeoReport() {
  const [activeProject, setActiveProject] = useState("https://example.com");

  const projects = [
    { name: "example.com", lastAudit: "2 hours ago", score: 78 },
    { name: "myshop.com", lastAudit: "1 day ago", score: 65 },
    { name: "blog.example.com", lastAudit: "3 days ago", score: 92 },
  ];

  const urls = [
    "https://example.com",
    "https://example.com/about",
    "https://example.com/services",
    "https://example.com/blog",
    "https://example.com/contact",
  ];

  return (
    <>
      <DashboardHeader
        activeProject={activeProject}
        projects={projects}
        onProjectChange={setActiveProject}
      />

      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Overall SEO Score</CardTitle>
            <CardDescription>
              Your website scores 72/100 - Good, but needs improvement
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="lg:py-4 flex flex-col justify-between items-start ">
                <div className="text-center">
                  <Badge className="bg-amber-500">Needs Improvement</Badge>
                </div>
                <div className="relative w-full h-48">
                  <OverallScoreChart />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">72</span>
                    <span className="text-sm text-muted-foreground">
                      out of 100
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Meta Tags</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Heading Structure
                    </span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">URL Structure</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Image Optimization
                    </span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Mobile Friendliness
                    </span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Page Speed</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Content Quality</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Last updated: April 19, 2025
                </span>
              </div>
              <div className="flex gap-2">
                <Button>View Critical Issues</Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Tabs defaultValue="issues">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="issues">Issues & Recommendations</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="space-y-6 pt-6">
            <h2 className="text-2xl font-bold">Critical Issues</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-lg">Page Speed Issues</CardTitle>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Your page load time exceeds 3 seconds on mobile devices,
                    which can significantly impact user experience and search
                    rankings.
                  </p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Optimize image sizes and use WebP format</li>
                      <li>Implement lazy loading for below-the-fold content</li>
                      <li>Minimize render-blocking JavaScript</li>
                      <li>Enable browser caching</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Detailed Analysis{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-lg">
                      Image Optimization
                    </CardTitle>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    12 images are missing alt tags and 8 images are oversized,
                    affecting both accessibility and page load times.
                  </p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Add descriptive alt tags to all images</li>
                      <li>Compress images to reduce file sizes</li>
                      <li>Use responsive image techniques</li>
                      <li>Convert images to WebP format</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Affected Images <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8">Moderate Issues</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-amber-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-lg">
                      Meta Description Issues
                    </CardTitle>
                  </div>
                  <Badge className="bg-amber-500">Moderate</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    3 pages have meta descriptions that exceed the recommended
                    length, and 2 pages have duplicate meta descriptions.
                  </p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Keep meta descriptions under 160 characters</li>
                      <li>Create unique descriptions for each page</li>
                      <li>Include relevant keywords naturally</li>
                      <li>Make descriptions compelling for users</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Affected Pages <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-amber-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-lg">Heading Structure</CardTitle>
                  </div>
                  <Badge className="bg-amber-500">Moderate</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Inconsistent heading hierarchy on 5 pages, with some pages
                    skipping H2 headings or using multiple H1 tags.
                  </p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Use only one H1 tag per page</li>
                      <li>Maintain proper heading hierarchy (H1 → H2 → H3)</li>
                      <li>Include keywords in headings where natural</li>
                      <li>
                        Make headings descriptive of the content that follows
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Heading Structure{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8">Minor Issues</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">Schema Markup</CardTitle>
                  </div>
                  <Badge className="bg-green-500">Minor</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Missing schema markup for product pages and blog articles,
                    which could enhance rich snippets in search results.
                  </p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Add Product schema to product pages</li>
                      <li>Implement Article schema for blog posts</li>
                      <li>Add Organization schema to homepage</li>
                      <li>Validate schema using Google's testing tool</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Schema Recommendations{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">Internal Linking</CardTitle>
                  </div>
                  <Badge className="bg-green-500">Minor</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Some important pages have fewer than 3 internal links
                    pointing to them, reducing their visibility to search
                    engines.
                  </p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Add more internal links to key pages</li>
                      <li>Use descriptive anchor text for links</li>
                      <li>Create a logical site structure</li>
                      <li>Consider adding a related content section</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Internal Link Map{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6 pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="meta-tags">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5" />
                    <span>Meta Tags Analysis</span>
                    <Badge className="ml-2">85%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Performance Overview
                      </h3>
                      <div className="h-64">
                        <MetaTagsChart />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Title Tags (90%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">
                            Meta Descriptions (75%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm">Canonical Tags (95%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">Keywords (80%)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Detailed Findings
                      </h3>
                      <ScrollArea className="h-80 rounded-md border p-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Title Tags</h4>
                            <p className="text-sm text-muted-foreground">
                              Most title tags are well-optimized, but 2 pages
                              have titles exceeding the recommended 60 character
                              limit.
                            </p>
                            <div className="mt-2">
                              <div className="text-xs text-muted-foreground">
                                Pages with issues:
                              </div>
                              <ul className="text-xs list-disc pl-5 mt-1">
                                <li>
                                  https://example.com/blog/top-10-strategies-for-improving-your-website-conversion-rate-in-2025
                                  (82 characters)
                                </li>
                                <li>
                                  https://example.com/services/comprehensive-digital-marketing-solutions-for-small-businesses
                                  (75 characters)
                                </li>
                              </ul>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <div>
                            <h4 className="font-medium">Meta Descriptions</h4>
                            <p className="text-sm text-muted-foreground">
                              3 pages have meta descriptions that exceed the
                              recommended length, and 2 pages have duplicate
                              meta descriptions.
                            </p>
                            <div className="mt-2">
                              <div className="text-xs text-muted-foreground">
                                Pages with issues:
                              </div>
                              <ul className="text-xs list-disc pl-5 mt-1">
                                <li>
                                  https://example.com/about (description too
                                  long: 185 characters)
                                </li>
                                <li>
                                  https://example.com/services (description too
                                  long: 172 characters)
                                </li>
                                <li>
                                  https://example.com/blog/post-1 (duplicate
                                  description)
                                </li>
                                <li>
                                  https://example.com/blog/post-2 (duplicate
                                  description)
                                </li>
                              </ul>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <div>
                            <h4 className="font-medium">Canonical Tags</h4>
                            <p className="text-sm text-muted-foreground">
                              Canonical tags are properly implemented across
                              most pages, with only 1 page missing a canonical
                              tag.
                            </p>
                            <div className="mt-2">
                              <div className="text-xs text-muted-foreground">
                                Pages with issues:
                              </div>
                              <ul className="text-xs list-disc pl-5 mt-1">
                                <li>
                                  https://example.com/blog/category/news
                                  (missing canonical tag)
                                </li>
                              </ul>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <div>
                            <h4 className="font-medium">Keywords</h4>
                            <p className="text-sm text-muted-foreground">
                              Keyword usage is generally good, but some pages
                              could benefit from more strategic keyword
                              placement.
                            </p>
                            <div className="mt-2">
                              <div className="text-xs text-muted-foreground">
                                Pages with issues:
                              </div>
                              <ul className="text-xs list-disc pl-5 mt-1">
                                <li>
                                  https://example.com/services (primary keyword
                                  not in H1)
                                </li>
                                <li>
                                  https://example.com/blog (low keyword density
                                  for target terms)
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="heading-structure">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <List className="h-5 w-5" />
                    <span>Heading Structure</span>
                    <Badge className="ml-2">70%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm">
                      Heading structure analysis examines the hierarchy and
                      organization of your page headings (H1-H6), which are
                      important for both SEO and user experience.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Issues Found
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-medium">
                                Multiple H1 Tags
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              2 pages have multiple H1 tags, which can confuse
                              search engines about the main topic of the page.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-medium">
                                Skipped Heading Levels
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              3 pages skip from H1 directly to H3, missing the
                              H2 level in the hierarchy.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                Missing Keywords in Headings
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Several key pages don't include target keywords in
                              their heading structure.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                Overly Long Headings
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              4 pages have H1 or H2 headings that exceed 60
                              characters, making them less effective.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Use a Single H1 Tag
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Ensure each page has exactly one H1 tag that
                              clearly describes the page's main topic.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Maintain Proper Hierarchy
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Follow a logical heading structure (H1 → H2 → H3)
                              without skipping levels.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Include Target Keywords
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Naturally incorporate relevant keywords in your
                              headings, especially H1 and H2 tags.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Keep Headings Concise
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Aim for headings under 60 characters that clearly
                              describe the content that follows.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Page Examples
                      </h3>
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              https://example.com/services
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                                  H1
                                </div>
                                <div>
                                  <p className="text-sm">Our Services</p>
                                  <p className="text-xs text-muted-foreground">
                                    Issue: Missing target keyword "digital
                                    marketing"
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                                  H3
                                </div>
                                <div>
                                  <p className="text-sm">Web Development</p>
                                  <p className="text-xs text-muted-foreground">
                                    Issue: Skipped H2 level
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                                  H3
                                </div>
                                <div>
                                  <p className="text-sm">
                                    Search Engine Optimization
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Issue: Skipped H2 level
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              https://example.com/about
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                                  H1
                                </div>
                                <div>
                                  <p className="text-sm">About Our Company</p>
                                  <p className="text-xs text-muted-foreground">
                                    Issue: None
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  H2
                                </div>
                                <div>
                                  <p className="text-sm">Our Mission</p>
                                  <p className="text-xs text-muted-foreground">
                                    Issue: None
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  H2
                                </div>
                                <div>
                                  <p className="text-sm">Our Team</p>
                                  <p className="text-xs text-muted-foreground">
                                    Issue: None
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="url-structure">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Link2 className="h-5 w-5" />
                    <span>URL Structure</span>
                    <Badge className="ml-2">90%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm">
                      URL structure analysis examines how your URLs are
                      formatted, including length, readability, keyword usage,
                      and parameters.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Strengths</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Clean URL Structure
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Most URLs follow a clean, hierarchical structure
                              that is easy for users and search engines to
                              understand.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Keyword Inclusion
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Most URLs include relevant keywords that
                              accurately describe the page content.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Consistent Format
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              URLs follow a consistent format across the site,
                              enhancing user experience and crawlability.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Areas for Improvement
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                URL Parameters
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Some pages use unnecessary URL parameters that
                              could cause duplicate content issues.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                Overly Long URLs
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              A few blog post URLs are excessively long and
                              could be shortened for better usability.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">URL Examples</h3>
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Good URL Examples
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              <li className="text-sm">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                    https://example.com/services/web-development
                                  </code>
                                </div>
                              </li>
                              <li className="text-sm">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                    https://example.com/blog/seo-best-practices-2025
                                  </code>
                                </div>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              URLs Needing Improvement
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              <li className="text-sm">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                    https://example.com/blog/category/news?page=1&sort=date
                                  </code>
                                </div>
                                <p className="text-xs text-muted-foreground ml-6 mt-1">
                                  Recommendation: Use path-based pagination
                                  instead of parameters
                                </p>
                              </li>
                              <li className="text-sm">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                    https://example.com/blog/top-10-strategies-for-improving-your-website-conversion-rate-in-2025
                                  </code>
                                </div>
                                <p className="text-xs text-muted-foreground ml-6 mt-1">
                                  Recommendation: Shorten to
                                  "website-conversion-strategies-2025"
                                </p>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="image-optimization">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5" />
                    <span>Image Optimization</span>
                    <Badge className="ml-2">65%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm">
                      Image optimization analysis examines how well your images
                      are optimized for both search engines and user experience,
                      including alt tags, file sizes, and formats.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Critical Issues
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-medium">
                                Missing Alt Tags
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              12 images are missing alt tags, which impacts both
                              accessibility and SEO.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-medium">
                                Oversized Images
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              8 images exceed 500KB in size, significantly
                              impacting page load times.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                Non-Descriptive Alt Text
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Several images have generic alt text like "image"
                              or "photo" that doesn't describe the content.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                Outdated Image Formats
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Most images use JPG or PNG formats instead of more
                              efficient WebP or AVIF formats.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Add Alt Tags to All Images
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Ensure every image has a descriptive alt tag that
                              accurately describes the image content.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Compress Images
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Aim for image file sizes under 200KB for large
                              images and under 50KB for thumbnails.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Use Modern Image Formats
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Convert images to WebP format, which offers better
                              compression and quality than JPG or PNG.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Implement Responsive Images
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Use srcset and sizes attributes to serve different
                              image sizes based on device screen size.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Image Examples
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">
                                  hero-image.jpg
                                </span>
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  1.2MB
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Issues:</span>{" "}
                                Missing alt tag, oversized
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">
                                  team-photo.png
                                </span>
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  850KB
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Alt tag:</span>{" "}
                                "image"
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Issues:</span>{" "}
                                Non-descriptive alt tag, oversized
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">
                                  product-thumbnail.jpg
                                </span>
                                <Badge className="bg-green-500 text-xs">
                                  120KB
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Alt tag:</span>{" "}
                                "Premium wireless headphones with noise
                                cancellation"
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Issues:</span>{" "}
                                None (good example)
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mobile-friendliness">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5" />
                    <span>Mobile Friendliness</span>
                    <Badge className="ml-2">80%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Performance Overview
                      </h3>
                      <div className="h-64">
                        <MobileFriendlinessChart />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">
                            Responsive Design (95%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">Touch Elements (75%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm">Font Sizes (85%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">
                            Viewport Configuration (90%)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Key Findings</h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div>
                            <h4 className="font-medium">Strengths</h4>
                            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                              <li>
                                Responsive design adapts well to different
                                screen sizes
                              </li>
                              <li>
                                Proper viewport configuration on most pages
                              </li>
                              <li>Good font readability on mobile devices</li>
                              <li>No horizontal scrolling issues</li>
                            </ul>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="font-medium">
                              Areas for Improvement
                            </h4>
                            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                              <li>
                                Some touch elements are too close together (less
                                than 48px apart)
                              </li>
                              <li>
                                Contact form inputs are too small on mobile
                                devices
                              </li>
                              <li>
                                Some images overflow their containers on small
                                screens
                              </li>
                              <li>
                                Menu navigation could be improved for touch
                                interactions
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <h3 className="text-lg font-medium mt-6 mb-4">
                        Recommendations
                      </h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-muted rounded-full p-1.5 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Increase Touch Target Sizes
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Ensure all interactive elements are at least
                                48px × 48px and have adequate spacing between
                                them.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-muted rounded-full p-1.5 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Optimize Form Elements
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Increase the size of form inputs and ensure
                                labels are visible when focusing on inputs.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-muted rounded-full p-1.5 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Fix Image Scaling
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Ensure all images use proper responsive
                                techniques to scale correctly on all devices.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="page-speed">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5" />
                    <span>Page Speed</span>
                    <Badge className="ml-2">60%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Performance Metrics
                      </h3>
                      <div className="h-64">
                        <PageSpeedChart />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">
                            Largest Contentful Paint (4.2s)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">
                            First Input Delay (120ms)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">
                            Cumulative Layout Shift (0.15)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">
                            First Contentful Paint (1.8s)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Critical Issues
                      </h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                Render-Blocking Resources
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Multiple JavaScript and CSS files are blocking
                                the rendering of your page.
                              </p>
                              <div className="mt-2 text-xs">
                                <span className="font-medium">Impact:</span>{" "}
                                High
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-start gap-3">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                Unoptimized Images
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Large, uncompressed images are significantly
                                slowing down page load times.
                              </p>
                              <div className="mt-2 text-xs">
                                <span className="font-medium">Impact:</span>{" "}
                                High
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                Excessive DOM Size
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Your homepage has over 1,500 DOM elements, which
                                can slow down rendering and interactions.
                              </p>
                              <div className="mt-2 text-xs">
                                <span className="font-medium">Impact:</span>{" "}
                                Medium
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                Missing Browser Caching
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Static assets don't have proper cache headers,
                                causing unnecessary reloads.
                              </p>
                              <div className="mt-2 text-xs">
                                <span className="font-medium">Impact:</span>{" "}
                                Medium
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <h3 className="text-lg font-medium mt-6 mb-4">
                        Top Recommendations
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                          <span className="text-sm">
                            Optimize and compress all images
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            2
                          </div>
                          <span className="text-sm">
                            Defer non-critical JavaScript and CSS
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            3
                          </div>
                          <span className="text-sm">
                            Implement proper browser caching
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            4
                          </div>
                          <span className="text-sm">
                            Reduce DOM size by simplifying page structure
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            5
                          </div>
                          <span className="text-sm">
                            Enable text compression (GZIP or Brotli)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="backlinks">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Link2 className="h-5 w-5" />
                    <span>Backlink Analysis</span>
                    <Badge className="ml-2">75%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Backlink Overview
                      </h3>
                      <div className="h-64">
                        <BacklinksChart />
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">245</div>
                              <div className="text-sm text-muted-foreground">
                                Total Backlinks
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">78</div>
                              <div className="text-sm text-muted-foreground">
                                Referring Domains
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">65%</div>
                              <div className="text-sm text-muted-foreground">
                                DoFollow Links
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-2xl font-bold">35</div>
                              <div className="text-sm text-muted-foreground">
                                High Authority Links
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Top Referring Domains
                      </h3>
                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-3 text-sm font-medium">
                                    Domain
                                  </th>
                                  <th className="text-left p-3 text-sm font-medium">
                                    Authority
                                  </th>
                                  <th className="text-left p-3 text-sm font-medium">
                                    Links
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-3 text-sm">
                                    example-partner.com
                                  </td>
                                  <td className="p-3 text-sm">85/100</td>
                                  <td className="p-3 text-sm">24</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-3 text-sm">
                                    industry-blog.com
                                  </td>
                                  <td className="p-3 text-sm">78/100</td>
                                  <td className="p-3 text-sm">18</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-3 text-sm">news-site.org</td>
                                  <td className="p-3 text-sm">72/100</td>
                                  <td className="p-3 text-sm">15</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-3 text-sm">
                                    tech-forum.net
                                  </td>
                                  <td className="p-3 text-sm">65/100</td>
                                  <td className="p-3 text-sm">12</td>
                                </tr>
                                <tr>
                                  <td className="p-3 text-sm">
                                    social-media.com
                                  </td>
                                  <td className="p-3 text-sm">60/100</td>
                                  <td className="p-3 text-sm">9</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>

                      <h3 className="text-lg font-medium mt-6 mb-4">
                        Backlink Quality Analysis
                      </h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div>
                            <h4 className="font-medium">Strengths</h4>
                            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                              <li>Good diversity of referring domains</li>
                              <li>Several high-authority backlinks</li>
                              <li>Natural anchor text distribution</li>
                              <li>Low toxic backlink profile</li>
                            </ul>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="font-medium">
                              Areas for Improvement
                            </h4>
                            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                              <li>Limited industry-specific backlinks</li>
                              <li>
                                Few backlinks to deep pages (mostly homepage
                                links)
                              </li>
                              <li>Competitor sites have 2-3x more backlinks</li>
                              <li>Limited recent backlink acquisition</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <h3 className="text-lg font-medium mt-6 mb-4">
                        Recommendations
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-muted rounded-full p-1.5 mt-0.5">
                            <MoveRight className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Create Link-Worthy Content
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Develop original research, infographics, or guides
                              that naturally attract backlinks.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-muted rounded-full p-1.5 mt-0.5">
                            <MoveRight className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Guest Posting Strategy
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Contribute guest posts to relevant industry
                              publications to build authoritative backlinks.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-muted rounded-full p-1.5 mt-0.5">
                            <MoveRight className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Competitor Backlink Analysis
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Identify and target sites linking to competitors
                              but not to your site.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content-quality">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <span>Content Quality</span>
                    <Badge className="ml-2">75%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm">
                      Content quality analysis examines the relevance, depth,
                      readability, and engagement factors of your website
                      content.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Content Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Readability Score
                              </span>
                              <span className="text-sm font-medium">
                                72/100
                              </span>
                            </div>
                            <Progress value={72} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Keyword Optimization
                              </span>
                              <span className="text-sm font-medium">
                                80/100
                              </span>
                            </div>
                            <Progress value={80} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Content Depth
                              </span>
                              <span className="text-sm font-medium">
                                65/100
                              </span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Engagement Metrics
                              </span>
                              <span className="text-sm font-medium">
                                70/100
                              </span>
                            </div>
                            <Progress value={70} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Freshness
                              </span>
                              <span className="text-sm font-medium">
                                85/100
                              </span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Key Findings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Regular Content Updates
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Blog is updated consistently with fresh content,
                              which is positive for SEO.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">
                                Good Keyword Integration
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Most content naturally incorporates target
                              keywords without keyword stuffing.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                Content Depth Issues
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Several key pages have thin content (under 500
                              words) that doesn't fully address user intent.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">
                                Readability Challenges
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Some content uses complex sentences and industry
                              jargon that may be difficult for average readers.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Content Recommendations
                      </h3>
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Expand Thin Content
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">
                              Identify and expand pages with less than 500 words
                              to provide more comprehensive information that
                              fully addresses user queries.
                            </p>
                            <div className="mt-3">
                              <h4 className="text-sm font-medium">
                                Priority Pages:
                              </h4>
                              <ul className="text-sm list-disc pl-5 mt-1">
                                <li>
                                  https://example.com/services/web-development
                                  (320 words)
                                </li>
                                <li>
                                  https://example.com/services/seo (280 words)
                                </li>
                                <li>
                                  https://example.com/about/team (350 words)
                                </li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Improve Readability
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">
                              Simplify complex sentences, break up long
                              paragraphs, and reduce industry jargon to improve
                              content accessibility.
                            </p>
                            <div className="mt-3">
                              <h4 className="text-sm font-medium">
                                Readability Tips:
                              </h4>
                              <ul className="text-sm list-disc pl-5 mt-1">
                                <li>
                                  Aim for a Flesch reading ease score of 60-70
                                </li>
                                <li>
                                  Use shorter paragraphs (3-4 sentences maximum)
                                </li>
                                <li>
                                  Include more subheadings to break up content
                                </li>
                                <li>
                                  Define technical terms when they first appear
                                </li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Enhance Content Engagement
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">
                              Add more engaging elements to increase time on
                              page and reduce bounce rates.
                            </p>
                            <div className="mt-3">
                              <h4 className="text-sm font-medium">
                                Engagement Elements to Add:
                              </h4>
                              <ul className="text-sm list-disc pl-5 mt-1">
                                <li>Relevant images and infographics</li>
                                <li>Video content where appropriate</li>
                                <li>
                                  Interactive elements (quizzes, calculators)
                                </li>
                                <li>Internal links to related content</li>
                                <li>Clear calls-to-action</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="schema-markup">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5" />
                    <span>Schema Markup</span>
                    <Badge className="ml-2">65%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm">
                      Schema markup analysis examines the structured data
                      implementation on your website, which helps search engines
                      understand your content and can enable rich snippets in
                      search results.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Current Implementation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium">
                                Organization Schema
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <p className="text-xs text-muted-foreground">
                                  Properly implemented on homepage
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                BreadcrumbList Schema
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <p className="text-xs text-muted-foreground">
                                  Implemented across all pages
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Product Schema
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <p className="text-xs text-muted-foreground">
                                  Missing on product pages
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Article Schema
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <p className="text-xs text-muted-foreground">
                                  Missing on blog articles
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                FAQ Schema
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <p className="text-xs text-muted-foreground">
                                  Missing on FAQ pages
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                LocalBusiness Schema
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <p className="text-xs text-muted-foreground">
                                  Implemented but missing required properties
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                1
                              </div>
                              <h4 className="text-sm font-medium">
                                Add Product Schema
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-8 mt-1">
                              Implement Product schema on all product pages to
                              enable rich product snippets in search results,
                              including price, availability, and ratings.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                2
                              </div>
                              <h4 className="text-sm font-medium">
                                Add Article Schema
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-8 mt-1">
                              Implement Article schema on all blog posts to
                              improve visibility in search results and enable
                              features like publication date and author
                              information.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                3
                              </div>
                              <h4 className="text-sm font-medium">
                                Complete LocalBusiness Schema
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-8 mt-1">
                              Add missing properties to LocalBusiness schema,
                              including opening hours, address, and telephone
                              number.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                4
                              </div>
                              <h4 className="text-sm font-medium">
                                Add FAQ Schema
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-8 mt-1">
                              Implement FAQ schema on pages with frequently
                              asked questions to enable FAQ rich snippets in
                              search results.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                5
                              </div>
                              <h4 className="text-sm font-medium">
                                Validate All Schema
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-8 mt-1">
                              Use Google's Structured Data Testing Tool to
                              validate all schema implementations and fix any
                              errors.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Schema Implementation Example
                      </h3>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Product Schema Example
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted p-4 rounded-md overflow-x-auto">
                            <pre className="text-xs">
                              {`<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Premium Wireless Headphones",
  "image": "https://example.com/images/headphones.jpg",
  "description": "High-quality wireless headphones with noise cancellation",
  "brand": {
    "@type": "Brand",
    "name": "ExampleBrand"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/headphones",
    "priceCurrency": "USD",
    "price": "149.99",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "89"
  }
}
</script>`}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5" />
                    <span>Security Assessment</span>
                    <Badge className="ml-2">85%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm">
                      Security assessment examines the security measures
                      implemented on your website, which can impact both user
                      trust and search engine rankings.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Security Checklist
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">
                                  HTTPS Implementation
                                </span>
                              </div>
                              <Badge className="bg-green-500">Passed</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">
                                  SSL Certificate Valid
                                </span>
                              </div>
                              <Badge className="bg-green-500">Passed</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">
                                  HTTP to HTTPS Redirection
                                </span>
                              </div>
                              <Badge className="bg-green-500">Passed</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">
                                  Content Security Policy
                                </span>
                              </div>
                              <Badge className="bg-green-500">Passed</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <span className="text-sm">
                                  X-Content-Type-Options
                                </span>
                              </div>
                              <Badge className="bg-amber-500">Missing</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <span className="text-sm">X-Frame-Options</span>
                              </div>
                              <Badge className="bg-amber-500">Missing</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-sm">Mixed Content</span>
                              </div>
                              <Badge variant="destructive">Found</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Security Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <h4 className="text-sm font-medium">
                                Fix Mixed Content Issues
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              3 pages contain mixed content (HTTP resources
                              loaded on HTTPS pages), which can trigger browser
                              security warnings.
                            </p>
                            <div className="mt-2 ml-6">
                              <span className="text-xs font-medium">
                                Affected Pages:
                              </span>
                              <ul className="text-xs list-disc pl-5 mt-1">
                                <li>
                                  https://example.com/blog/article-1 (image src)
                                </li>
                                <li>https://example.com/about (iframe src)</li>
                                <li>
                                  https://example.com/contact (script src)
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <h4 className="text-sm font-medium">
                                Add Security Headers
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Implement missing security headers to improve
                              security posture and prevent common attacks.
                            </p>
                            <div className="mt-2 ml-6">
                              <span className="text-xs font-medium">
                                Headers to Add:
                              </span>
                              <ul className="text-xs list-disc pl-5 mt-1">
                                <li>X-Content-Type-Options: nosniff</li>
                                <li>X-Frame-Options: SAMEORIGIN</li>
                                <li>
                                  Referrer-Policy:
                                  strict-origin-when-cross-origin
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <h4 className="text-sm font-medium">
                                Maintain Current Security Measures
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6 mt-1">
                              Continue maintaining HTTPS implementation and
                              valid SSL certificate, which are correctly
                              configured.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">
                        SEO Impact of Security
                      </h3>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm">
                            Website security is an important factor for both
                            user trust and search engine rankings. Google has
                            confirmed that HTTPS is a ranking signal, and
                            security issues can negatively impact your site's
                            visibility.
                          </p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-3">
                              <div className="bg-muted rounded-full p-1.5 mt-0.5">
                                <Info className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">
                                  HTTPS as a Ranking Factor
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Google uses HTTPS as a ranking signal, giving
                                  a slight boost to secure sites.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="bg-muted rounded-full p-1.5 mt-0.5">
                                <Info className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">
                                  User Trust Signals
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Security issues can lead to browser warnings
                                  that increase bounce rates and reduce user
                                  trust.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="bg-muted rounded-full p-1.5 mt-0.5">
                                <Info className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">
                                  Security and Core Web Vitals
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Security issues can indirectly impact Core Web
                                  Vitals metrics, affecting overall page
                                  experience signals.
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="benchmarks" className="space-y-6 pt-6">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Industry Benchmarks</h2>
                <p className="text-muted-foreground">
                  Compare your website's performance against industry averages
                  and top competitors to identify areas for improvement.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        SEO Score Comparison
                      </CardTitle>
                      <CardDescription>
                        Your score vs. industry average
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Your Score
                            </span>
                            <span className="text-sm font-medium">72/100</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Industry Average
                            </span>
                            <span className="text-sm font-medium">68/100</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Top Competitor
                            </span>
                            <span className="text-sm font-medium">85/100</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Page Speed</CardTitle>
                      <CardDescription>
                        Mobile load time comparison
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Your Site
                            </span>
                            <span className="text-sm font-medium">4.2s</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Industry Average
                            </span>
                            <span className="text-sm font-medium">3.8s</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Google Recommendation
                            </span>
                            <span className="text-sm font-medium">
                              &lt; 2.5s
                            </span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Backlink Profile
                      </CardTitle>
                      <CardDescription>
                        Referring domains comparison
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Your Site
                            </span>
                            <span className="text-sm font-medium">
                              78 domains
                            </span>
                          </div>
                          <Progress value={39} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Industry Average
                            </span>
                            <span className="text-sm font-medium">
                              120 domains
                            </span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Top Competitor
                            </span>
                            <span className="text-sm font-medium">
                              200 domains
                            </span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Competitor Analysis</h2>
                <p className="text-muted-foreground">
                  See how your website compares to your top competitors across
                  key SEO metrics.
                </p>

                <Card className="mt-6">
                  <CardContent className="p-0">
                    <div className="overflow-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 text-sm font-medium">
                              Metric
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Your Site
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Competitor A
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Competitor B
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Competitor C
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4 text-sm font-medium">
                              Domain Authority
                            </td>
                            <td className="p-4 text-sm">35/100</td>
                            <td className="p-4 text-sm">48/100</td>
                            <td className="p-4 text-sm">42/100</td>
                            <td className="p-4 text-sm">39/100</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm font-medium">
                              Page Speed (Mobile)
                            </td>
                            <td className="p-4 text-sm">4.2s</td>
                            <td className="p-4 text-sm">3.1s</td>
                            <td className="p-4 text-sm">3.8s</td>
                            <td className="p-4 text-sm">4.5s</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm font-medium">
                              Backlinks
                            </td>
                            <td className="p-4 text-sm">245</td>
                            <td className="p-4 text-sm">620</td>
                            <td className="p-4 text-sm">380</td>
                            <td className="p-4 text-sm">290</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm font-medium">
                              Referring Domains
                            </td>
                            <td className="p-4 text-sm">78</td>
                            <td className="p-4 text-sm">195</td>
                            <td className="p-4 text-sm">142</td>
                            <td className="p-4 text-sm">95</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm font-medium">
                              Indexed Pages
                            </td>
                            <td className="p-4 text-sm">120</td>
                            <td className="p-4 text-sm">350</td>
                            <td className="p-4 text-sm">180</td>
                            <td className="p-4 text-sm">210</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm font-medium">
                              Content Length (Avg.)
                            </td>
                            <td className="p-4 text-sm">850 words</td>
                            <td className="p-4 text-sm">1,250 words</td>
                            <td className="p-4 text-sm">950 words</td>
                            <td className="p-4 text-sm">780 words</td>
                          </tr>
                          <tr>
                            <td className="p-4 text-sm font-medium">
                              Schema Markup
                            </td>
                            <td className="p-4 text-sm">Partial</td>
                            <td className="p-4 text-sm">Comprehensive</td>
                            <td className="p-4 text-sm">Comprehensive</td>
                            <td className="p-4 text-sm">Partial</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Keyword Gap Analysis
                </h2>
                <p className="text-muted-foreground">
                  Identify keywords your competitors rank for that your site is
                  missing.
                </p>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Top Keyword Opportunities</CardTitle>
                    <CardDescription>
                      Keywords your competitors rank for that you don't
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 text-sm font-medium">
                              Keyword
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Search Volume
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Difficulty
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Competitor Ranking
                            </th>
                            <th className="text-left p-4 text-sm font-medium">
                              Opportunity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4 text-sm">
                              "digital marketing strategy template"
                            </td>
                            <td className="p-4 text-sm">5,400</td>
                            <td className="p-4 text-sm">Medium</td>
                            <td className="p-4 text-sm">Competitor A (#3)</td>
                            <td className="p-4 text-sm">
                              <Badge className="bg-green-500">High</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm">
                              "small business SEO guide"
                            </td>
                            <td className="p-4 text-sm">3,200</td>
                            <td className="p-4 text-sm">Medium</td>
                            <td className="p-4 text-sm">Competitor B (#5)</td>
                            <td className="p-4 text-sm">
                              <Badge className="bg-green-500">High</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm">
                              "website conversion optimization"
                            </td>
                            <td className="p-4 text-sm">2,900</td>
                            <td className="p-4 text-sm">High</td>
                            <td className="p-4 text-sm">Competitor A (#7)</td>
                            <td className="p-4 text-sm">
                              <Badge className="bg-amber-500">Medium</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 text-sm">
                              "local SEO checklist 2025"
                            </td>
                            <td className="p-4 text-sm">1,800</td>
                            <td className="p-4 text-sm">Low</td>
                            <td className="p-4 text-sm">Competitor C (#4)</td>
                            <td className="p-4 text-sm">
                              <Badge className="bg-green-500">High</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 text-sm">
                              "B2B content marketing examples"
                            </td>
                            <td className="p-4 text-sm">1,500</td>
                            <td className="p-4 text-sm">Medium</td>
                            <td className="p-4 text-sm">Competitor B (#6)</td>
                            <td className="p-4 text-sm">
                              <Badge className="bg-amber-500">Medium</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button className="w-full">
                      View Complete Keyword Gap Analysis
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

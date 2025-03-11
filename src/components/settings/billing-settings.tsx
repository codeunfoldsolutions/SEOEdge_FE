// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { CreditCard, Calendar, CheckCircle } from "lucide-react"

// interface BillingSettingsProps {
//   subscription: {
//     plan: string
//     price: number
//     billingCycle: string
//     nextBillingDate: string
//     paymentMethod: string
//     features: string[]
//     usage: {
//       projects: { used: number; limit: string | number }
//       keywords: { used: number; limit: number }
//       audits: { used: number; remaining: number }
//       teamMembers: { used: number; limit: number }
//     }
//   }
// }

// export function BillingSettings({ subscription }: BillingSettingsProps) {
//   const [billingCycle, setBillingCycle] = useState(subscription.billingCycle)

//   // Calculate month price based on billing cycle
//   const monthlyPrice = subscription.price
//   const yearlyPrice = subscription.price * 10 // 2 months free
//   const currentPrice = billingCycle === "monthly" ? monthlyPrice : yearlyPrice / 12

//   // Calculate usage percentages
//   const keywordsPercentage = Math.round((subscription.usage.keywords.used / subscription.usage.keywords.limit) * 100)
//   const auditsTotal = subscription.usage.audits.used + subscription.usage.audits.remaining
//   const auditsPercentage = Math.round((subscription.usage.audits.used / auditsTotal) * 100)
//   const teamPercentage = Math.round((subscription.usage.teamMembers.used / subscription.usage.teamMembers.limit) * 100)

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Subscription Plan</CardTitle>
//           <CardDescription>Manage your subscription and billing details</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="flex flex-col md:flex-row justify-between gap-6">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <h3 className="text-xl font-bold">{subscription.plan}</h3>
//                 <Badge className="bg-primary/20 text-primary border-primary/10">
//                   Active
//                 </Badge>
//               </div>

//               <div className="flex items-center gap-1 text-gray mb-4">
//                 <Calendar size={16} />
//                 <span className="text-sm">Next billing: {subscription.nextBillingDate}</span>
//               </div>

//               <div className="space-y-1 mb-4">
//                 {subscription.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2 text-sm">
//                     <CheckCircle size={16} className="text-success" />
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex items-center gap-2 mb-1">
//                 <CreditCard size={16} className="text-gray" />
//                 <span className="text-sm">{subscription.paymentMethod}</span>
//               </div>
//             </div>

//             <div className="bg-primary/5 p-6 rounded-lg flex flex-col items-center">
//               <Tabs
//                 defaultValue={billingCycle}
//                 onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
//                 className="mb-4"
//               >
//                 <TabsList>
//                   <TabsTrigger value="monthly">Monthly</TabsTrigger>
//                   <TabsTrigger value="yearly">Yearly (Save 17%)</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="monthly" className="text-center mt-4">
//                   <div className="text-3xl font-bold">${monthlyPrice}</div>
//                   <div className="text-sm text-gray">per month</div>
//                 </TabsContent>
//                 <TabsContent value="yearly" className="text-center mt-4">
//                   <div className="text-3xl font-bold">${yearlyPrice / 12}<span className="text-sm font-normal"> /mo</span></div>
//                   <div className="text-sm text-gray">${yearlyPrice} billed annually</div>
//                 </TabsContent>
//               </Tabs>

//               <div className="mt-auto pt-4 w-full">
//                 <Button className="w-full">Change Plan</Button>
//                 <Button variant="outline" className="w-full mt-2">Cancel Subscription</Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Usage</CardTitle>
//           <CardDescription>Monitor your resource usage</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Projects</span>
//                 <span className="text-sm">
//                   {subscription.usage.projects.used} / {subscription.usage.projects.limit}
//                 </span>
//               </div>
//               <Progress value={100} className="h-2" />
//               <p className="text-xs text-gray mt-1">Unlimited projects included in your plan</p>
//             </div>

//             <div>
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Keywords</span>
//                 <span className="text-sm">
//                   {subscription.usage.keywords.used} / {subscription.usage.keywords.limit}
//                 </span>
//               </div>
//               <Progress
//                 value={keywordsPercentage}
//                 className="h-2"
//                 indicatorClassName={keywordsPercentage > 80 ? "bg-warning" : undefined}
//               />
//               <p className="text-xs text-gray mt-1">
//                 {subscription.usage.keywords.limit - subscription.usage.keywords.used} keywords remaining
//               </p>
//             </div>

//             <div>
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium">Automated Audits</span>
//                 <span className="text-sm">
//                   {subscription.usage.audits.used} used / {subscription.usage.audits.remaining} remaining
//                 </span>
//               </div>
//               <Progress
//                 value={auditsPercentage}
//                 className="h-2"
//                 indicatorClassName={subscription.usage.audits

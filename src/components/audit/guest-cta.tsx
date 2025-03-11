"use client"

import { Button } from "@/components/ui/button"

interface GuestCTAProps {
  title?: string
  description?: string
}

export function GuestCTA({
  title = "Unlock Full SEO Analysis",
  description = "Sign up for a free account to access detailed recommendations, save your audit history, and track your SEO progress over time.",
}: GuestCTAProps) {
  return (
    <div className="bg-primary/5 rounded-lg border border-primary/10 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
          <p className="text-gray mb-4 md:mb-0">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">Learn More</Button>
          <Button>Sign Up Now</Button>
        </div>
      </div>
    </div>
  )
}


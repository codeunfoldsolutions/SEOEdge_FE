"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

const data = [
  {
    subject: "Responsive Design",
    A: 95,
    fullMark: 100,
  },
  {
    subject: "Touch Elements",
    A: 75,
    fullMark: 100,
  },
  {
    subject: "Font Sizes",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "Viewport Config",
    A: 90,
    fullMark: 100,
  },
  {
    subject: "No Horizontal Scroll",
    A: 95,
    fullMark: 100,
  },
]

export function MobileFriendlinessChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Mobile Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

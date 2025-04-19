"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "LCP",
    value: 4.2,
    target: 2.5,
  },
  {
    name: "FID",
    value: 120,
    target: 100,
  },
  {
    name: "CLS",
    value: 0.15,
    target: 0.1,
  },
  {
    name: "FCP",
    value: 1.8,
    target: 1.8,
  },
]

export function PageSpeedChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#ef4444" />
        <Bar dataKey="target" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  )
}

"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Title Tags", value: 90, color: "#22c55e" },
  { name: "Meta Descriptions", value: 75, color: "#f59e0b" },
  { name: "Canonical Tags", value: 95, color: "#3b82f6" },
  { name: "Keywords", value: 80, color: "#ef4444" },
]

export function MetaTagsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

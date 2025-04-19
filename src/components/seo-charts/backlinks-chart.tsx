"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    backlinks: 180,
    domains: 65,
  },
  {
    name: "Feb",
    backlinks: 200,
    domains: 68,
  },
  {
    name: "Mar",
    backlinks: 220,
    domains: 72,
  },
  {
    name: "Apr",
    backlinks: 235,
    domains: 75,
  },
  {
    name: "May",
    backlinks: 245,
    domains: 78,
  },
]

export function BacklinksChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Line type="monotone" dataKey="backlinks" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="domains" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

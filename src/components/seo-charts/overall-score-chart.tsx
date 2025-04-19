"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    score: 65,
  },
  {
    name: "Feb",
    score: 66,
  },
  {
    name: "Mar",
    score: 68,
  },
  {
    name: "Apr",
    score: 70,
  },
  {
    name: "May",
    score: 72,
  },
];

export function OverallScoreChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          dy={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          domain={[0, 100]}
          dx={-10}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#0ea5e9"
          fillOpacity={1}
          fill="url(#colorScore)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

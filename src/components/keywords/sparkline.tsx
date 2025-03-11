"use client"

interface SparklineProps {
  data: (number | null)[]
  height?: number
  width?: number
}

export function Sparkline({ data, height = 30, width = 80 }: SparklineProps) {
  // Filter out null values
  const validData = data.filter((d) => d !== null) as number[]

  if (!validData.length) return <span className="text-gray">No data</span>

  // Determine min and max for scaling
  const min = Math.min(...validData)
  const max = Math.max(...validData)
  const range = max - min || 1 // Prevent division by zero

  // Generate points for the sparkline
  const points = validData
    .map((value, i) => {
      const x = (i / (validData.length - 1)) * width
      // Invert Y axis for rankings (lower is better)
      const y = ((max - value) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  // Determine color based on trend
  const firstVal = validData[0]
  const lastVal = validData[validData.length - 1]
  const trendColor = firstVal > lastVal ? "#10b981" : firstVal < lastVal ? "#ef4444" : "#64748b"

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={trendColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


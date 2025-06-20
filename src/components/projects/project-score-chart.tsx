"use client";

import { useEffect, useRef } from "react";

interface ProjectScoreChartProps {
  score: number;
}

export function ProjectScoreChart({ score }: ProjectScoreChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    // Clear previous drawing
    ctx.clearRect(0, 0, width, height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#e5e7eb";
    ctx.stroke();

    // Clamp score and calculate angle
    const safeScore = Math.max(0, Math.min(100, score));
    const scoreAngle = (safeScore / 100) * 2 * Math.PI;

    // Determine color
    let color = "#ef4444"; // Red
    if (score >= 80) color = "#22c55e"; // Green
    else if (score >= 60) color = "#f59e0b"; // Yellow

    // Draw progress arc
    ctx.beginPath(); // <== Important!
    ctx.arc(
      centerX,
      centerY,
      radius,
      -Math.PI / 2,
      -Math.PI / 2 + scoreAngle,
      false
    );
    ctx.lineWidth = 15;
    ctx.strokeStyle = color;
    ctx.stroke();
  }, [score]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="w-full h-full"
    />
  );
}

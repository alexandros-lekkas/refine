"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
  height?: number;
  width?: number;
}

export function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 6,
  color = "#6B7280",
  maxOpacity = 0.5,
  flickerChance = 0.1,
  height = 800,
  width = 800,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const squaresRef = useRef<Array<{ opacity: number; targetOpacity: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Initialize squares
    const numCols = Math.ceil(width / (squareSize + gridGap));
    const numRows = Math.ceil(height / (squareSize + gridGap));
    squaresRef.current = Array(numCols * numRows)
      .fill(null)
      .map(() => ({
        opacity: Math.random() * maxOpacity,
        targetOpacity: Math.random() * maxOpacity,
      }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      squaresRef.current.forEach((square, index) => {
        const col = index % numCols;
        const row = Math.floor(index / numCols);

        // Update opacity
        if (Math.random() < flickerChance) {
          square.targetOpacity = Math.random() * maxOpacity;
        }
        square.opacity += (square.targetOpacity - square.opacity) * 0.1;

        // Draw square
        ctx.fillStyle = color;
        ctx.globalAlpha = square.opacity;
        ctx.fillRect(
          col * (squareSize + gridGap),
          row * (squareSize + gridGap),
          squareSize,
          squareSize
        );
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, squareSize, gridGap, color, maxOpacity, flickerChance]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0", className)}
      style={{ width: "100%", height: "100%" }}
    />
  );
} 
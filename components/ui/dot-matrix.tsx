"use client";

import { useEffect, useRef, useState } from "react";
import { Activity } from "lucide-react";

type DotMatrixProps = {
  onActivate?: () => void;
};

export function DotMatrix({ onActivate }: DotMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const cell = 5;
    const columns = 16;
    const rows = 8;
    let generation = 0;
    let timer = 0;
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#a78bfa";
      const pulse = simulating ? (generation % 2 === 0 ? 1 : 0.55) : 0.85;
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const live = simulating ? (x * 3 + y * 5 + generation) % 7 < 3 : x === 1 || x === 4 || x === 7 || x === 12;
          if (live) {
            context.globalAlpha = pulse;
            context.fillRect(x * cell + 1, y * cell + 1, 2, 2);
          }
        }
      }
      context.globalAlpha = 1;
      if (simulating) {
        generation += 1;
        timer = window.requestAnimationFrame(draw);
      }
    };
    draw();
    return () => window.cancelAnimationFrame(timer);
  }, [simulating]);

  const activate = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setSimulating(true);
    onActivate?.();
    timeoutRef.current = window.setTimeout(() => setSimulating(false), 10000);
  };

  return (
    <button className="status-badge" type="button" onClick={activate} aria-label="Run status matrix simulation" aria-pressed={simulating}>
      <canvas ref={canvasRef} width="80" height="40" aria-hidden="true" />
      <span>{simulating ? "SIMULATING" : "READY"}</span>
      <Activity size={13} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}

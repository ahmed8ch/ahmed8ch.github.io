"use client";

import { useEffect, useRef } from "react";

type FilingsTheme = "dark" | "light";

type MagneticFilingsProps = {
  theme: FilingsTheme;
};

type Filing = {
  x: number;
  y: number;
  seed: number;
};

export function MagneticFilings({ theme }: MagneticFilingsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const filings: Filing[] = Array.from({ length: 900 }, (_, index) => ({
      x: (index * 83.17) % 1,
      y: (index * 47.31 + 0.17) % 1,
      seed: (index * 13.7) % Math.PI,
    }));
    const pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const content = document.querySelector(".v3-content");
      const contentRect = content?.getBoundingClientRect();
      const leftEdge = contentRect?.left ?? width * 0.16;
      const rightEdge = contentRect ? contentRect.right : width * 0.84;
      const ink = theme === "dark" ? "rgba(255, 255, 255, .72)" : "rgba(39, 39, 42, .52)";
      const glow = theme === "dark" ? "rgba(255, 255, 255, .1)" : "rgba(39, 39, 42, .08)";
      const safePointerX = pointer.x;
      const safePointerY = pointer.y;

      context.fillStyle = glow;
      context.beginPath();
      context.arc(safePointerX, safePointerY, 130, 0, Math.PI * 2);
      context.fill();

      filings.forEach((filing) => {
        const baseX = filing.x * width;
        const baseY = filing.y * height;
        const inGutter = baseX < leftEdge - 28 || baseX > rightEdge + 28;
        if (!inGutter) return;

        const dx = baseX - safePointerX;
        const dy = baseY - safePointerY;
        const distance = Math.max(18, Math.sqrt(dx * dx + dy * dy));
        const influence = Math.max(0, 1 - distance / 280);
        const angle = Math.atan2(dy, dx) + Math.PI / 2 + influence * 0.9;
        const drift = Math.sin(time * 0.0008 + filing.seed) * 1.6;
        const length = 1.2 + influence * 5;
        const x = baseX + Math.cos(angle) * drift;
        const y = baseY + Math.sin(angle) * drift;

        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.globalAlpha = 0.2 + influence * 0.72;
        context.strokeStyle = ink;
        context.lineWidth = influence > 0.2 ? 1.1 : 0.7;
        context.beginPath();
        context.moveTo(-length, 0);
        context.lineTo(length, 0);
        context.stroke();
        context.restore();
      });

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="magnetic-filings" aria-hidden="true" />;
}

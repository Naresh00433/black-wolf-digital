"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  life: number;
  hue: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const points: Point[] = [];

    let hue = 180;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener("resize", resize);

    function mouseMove(e: MouseEvent) {
      hue += 2;

      if (hue > 300) hue = 180;

      points.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        hue,
      });
    }

    window.addEventListener("mousemove", mouseMove);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        ctx.beginPath();

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        ctx.strokeStyle = `hsla(${p1.hue},100%,60%,${p1.life})`;

        ctx.lineWidth = 3;

        ctx.shadowBlur = 20;

        ctx.shadowColor = `hsl(${p1.hue},100%,60%)`;

        ctx.stroke();

        p1.life -= 0.02;
      }

      while (points.length && points[0].life <= 0) {
        points.shift();
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
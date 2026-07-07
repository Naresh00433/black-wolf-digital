"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: -200,
    y: -200,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 160,
        y: position.y - 160,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 0.4,
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 h-80 w-80 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(34,211,238,.18) 0%, rgba(34,211,238,.08) 35%, transparent 75%)",
        filter: "blur(40px)",
      }}
    />
  );
}
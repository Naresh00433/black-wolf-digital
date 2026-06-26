"use client";

import { Bot } from "lucide-react";

interface WolfButtonProps {
  onClick: () => void;
}

export default function WolfButton({ onClick }: WolfButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-cyan-400/40"
    >
      <Bot size={35} />

      <span className="absolute -left-30 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-xl">
        Ask Wolf AI
      </span>
    </button>
  );
}
"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="flex gap-2 border-t border-white/10 p-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
        placeholder="Ask Wolf AI..."
        className="flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
      />

      <button
        onClick={send}
        className="rounded-xl bg-cyan-400 p-3 text-black"
      >
        <SendHorizontal size={18} />
      </button>
    </div>
  );
}
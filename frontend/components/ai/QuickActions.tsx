"use client";

interface QuickActionsProps {
  onSelect: (text: string) => void;
}

const actions = [
  {
    emoji: "🌐",
    text: "Build a Website",
  },
  {
    emoji: "📈",
    text: "Improve My SEO",
  },
  {
    emoji: "🚀",
    text: "Generate Leads",
  },
  {
    emoji: "📱",
    text: "Social Media Marketing",
  },
  {
    emoji: "💬",
    text: "WhatsApp Marketing",
  },
  {
    emoji: "💰",
    text: "Get Instant Quote",
  },
];

export default function QuickActions({
  onSelect,
}: QuickActionsProps) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.text}
          onClick={() => onSelect(action.text)}
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
        >
          {action.emoji} {action.text}
        </button>
      ))}
    </div>
  );
}
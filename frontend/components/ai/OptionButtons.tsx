"use client";

interface Props {
  options: string[];
  onSelect: (value: string) => void;
}

export default function OptionButtons({
  options,
  onSelect,
}: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 transition-all hover:bg-cyan-400 hover:text-black"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
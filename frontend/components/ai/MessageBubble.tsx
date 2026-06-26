import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: string;
  sender: "user" | "ai";
}

export default function MessageBubble({ message, sender }: MessageBubbleProps) {
  const isAI = sender === "ai";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`flex ${isAI ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isAI
            ? "rounded-2xl rounded-tl-sm bg-zinc-800 text-white"
            : "rounded-2xl rounded-br-sm bg-cyan-400 text-black"
        }`}
      >
        {message}
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import MessageBubble from "./MessageBubble";
import WelcomeCard from "./WelcomeCard";
import ChatInput from "./ChatInput";
import QuickActions from "./QuickActions";
import { ChatState } from "@/types/chat";
import { QUESTIONS } from "@/data/questions";
import OptionButtons from "./OptionButtons";
import { INDUSTRIES, SERVICES, BUDGETS, TIMELINES } from "@/data/options";
import { GiWolfHowl } from "react-icons/gi";

interface Message {
  id: number;
  sender: "ai" | "user";
  message: string;
}

interface WolfChatProps {
  onClose: () => void;
}

export default function WolfChat({ onClose }: WolfChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      message: "👋 Hi! Welcome to Black Wolf Digital.",
    },
    {
      id: 2,
      sender: "ai",
      message:
        "I'm Wolf AI. I'll help you find the best digital solution for your business.",
    },
    {
      id: 3,
      sender: "ai",
      message: "What would you like help with today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const [isTyping, setIsTyping] = useState(false);

  const [chatState, setChatState] = useState<ChatState>({
    step: "GREETING",
  });

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      message: text,
    };

    let aiReply = "";
    let nextState = { ...chatState };

    switch (chatState.step) {
      case "GREETING":
        nextState = {
          ...chatState,
          service: text,
          step: "BUSINESS_NAME",
        };

        aiReply = "Excellent choice! 🎉\n\nFirst, what's your business name?";

        break;

      case "BUSINESS_NAME":
        nextState = {
          ...chatState,
          businessName: text,
          step: "INDUSTRY",
        };

        aiReply = QUESTIONS.INDUSTRY;
        break;

      case "INDUSTRY":
        nextState = {
          ...chatState,
          industry: text,
          step: "SERVICE",
        };

        aiReply = QUESTIONS.SERVICE;
        break;

      case "SERVICE":
        nextState = {
          ...chatState,
          service: text,
          step: "BUDGET",
        };

        aiReply = QUESTIONS.BUDGET;
        break;

      case "BUDGET":
        nextState = {
          ...chatState,
          budget: text,
          step: "TIMELINE",
        };

        aiReply = QUESTIONS.TIMELINE;
        break;

      case "TIMELINE":
        nextState = {
          ...chatState,
          timeline: text,
          step: "CONTACT",
        };

        aiReply = QUESTIONS.CONTACT;
        break;

      case "CONTACT":
        nextState = {
          ...chatState,
          contact: text,
          step: "QUOTE",
        };

        aiReply =
          `🎉 Perfect!\n\nHere's what I've collected:\n\n` +
          `🏢 Business: ${chatState.businessName}\n` +
          `🏭 Industry: ${chatState.industry}\n` +
          `💼 Service: ${chatState.service}\n` +
          `💰 Budget: ${chatState.budget}\n` +
          `⏳ Timeline: ${chatState.timeline}\n` +
          `📧 Contact: ${text}\n\n` +
          `Generating your personalized quote...`;

        break;

      default:
        aiReply = "Thank you! One of our experts will contact you shortly.";
    }

    const aiMessage: Message = {
      id: Date.now() + 1,
      sender: "ai",
      message: aiReply,
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);

      setChatState(nextState);

      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex h-[650px] w-[390px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0F1117] via-[#111827] to-black shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white font-bold">
            <GiWolfHowl size={75} />
          </div>

          <div>
            <h2 className="font-semibold text-white">Wolf AI</h2>

            <p className="text-xs text-gray-400">Digital Growth Consultant</p>

            <p className="text-[11px] text-green-400">● Online</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 transition hover:bg-white/10"
          aria-label="Close Chat"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {chatState.step === "GREETING" && <WelcomeCard />}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
          />
        ))}

        {chatState.step === "GREETING" && (
          <QuickActions onSelect={sendMessage} />
        )}

        {chatState.step === "INDUSTRY" && (
          <OptionButtons options={INDUSTRIES} onSelect={sendMessage} />
        )}

        {chatState.step === "SERVICE" && (
          <OptionButtons options={SERVICES} onSelect={sendMessage} />
        )}

        {chatState.step === "BUDGET" && (
          <OptionButtons options={BUDGETS} onSelect={sendMessage} />
        )}

        {chatState.step === "TIMELINE" && (
          <OptionButtons options={TIMELINES} onSelect={sendMessage} />
        )}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm bg-zinc-800 px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                  style={{ animationDelay: "1.0s" }}
                ></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                  style={{ animationDelay: "0.3s" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {(chatState.step === "BUSINESS_NAME" || chatState.step === "CONTACT") && (
        <ChatInput onSend={sendMessage} />
      )}
    </div>
  );
}

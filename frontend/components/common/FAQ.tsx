"use client";

import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";

const faqs = [
  {
    question: "What digital marketing services do you provide?",
    answer:
      "We provide SEO, Website Development, Social Media Marketing, Lead Generation, WhatsApp Marketing, Affiliate Marketing, React & Next.js Development, and customized digital growth strategies for businesses of all sizes.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Absolutely. Whether you're a startup, local business, or an established company, we create strategies that fit your goals, audience, and budget.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "The timeline depends on the service. Paid campaigns can generate leads within days, while SEO generally takes 3–6 months for sustainable long-term growth.",
  },
  {
    question: "Can you redesign or improve my existing website?",
    answer:
      "Yes. We redesign outdated websites, improve user experience, optimize performance, enhance SEO, and modernize your online presence using the latest technologies.",
  },
  {
    question: "Will I receive reports on campaign performance?",
    answer:
      "Yes. We provide transparent reports with key metrics, traffic insights, lead generation data, conversions, and actionable recommendations.",
  },
  {
    question: "Why should I choose Black Wolf Digital?",
    answer:
      "We focus on measurable business growth instead of vanity metrics. Every strategy is tailored to your business with a strong emphasis on ROI, performance, and long-term success.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl">

        <div className="mb-14 text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Frequently Asked Questions
          </p>

          <h2 className="text-4xl font-extrabold md:text-5xl">
            Got Questions?
            <span className="text-cyan-400"> We've Got Answers.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Everything you need to know before partnering with Black Wolf
            Digital.
          </p>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition duration-300 hover:border-cyan-400/40"
              >
                <button
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3 className="pr-6 text-lg font-semibold">
                    {faq.question}
                  </h3>

                  <div className="rounded-full bg-cyan-400/10 p-2 text-cyan-400">
                    {isOpen ? (
                      <HiMinus size={20} />
                    ) : (
                      <HiPlus size={20} />
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-8 text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
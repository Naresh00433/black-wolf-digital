"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { subscribeNewsletter } from "@/services/newsletter";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await subscribeNewsletter(email);

      setMessage(res.message);
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-10 text-white">
      <div className="mx-auto mb-10 max-w-7xl overflow-hidden">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Newsletter
            </p>

            <h2 className="mb-4 text-4xl font-bold">Join the Wolf Pack</h2>
          </div>

          <div>
            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-5 py-4 text-white outline-none placeholder:text-gray-500"
              />

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-cyan-400 px-8 font-semibold text-black transition hover:bg-cyan-300 disabled:opacity-60"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </div>

            {message && <p className="mt-4 text-sm text-cyan-400">{message}</p>}
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/black-wolf-digital.png"
              alt="Black Wolf Digital"
              width={100}
              height={100}
              className="ms-5 w-auto"
              priority
            />
          </Link> */}
          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
            Black Wolf Digital helps businesses generate qualified leads,
            increase online visibility, and accelerate growth through affiliate
            marketing, SEO, social media marketing, website development, and
            performance-driven digital strategies.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/about" className="hover:text-cyan-400">
              Who We Are
            </Link>
            <Link href="/blog" className="hover:text-cyan-400">
              Insights
            </Link>
            <Link href="/services" className="hover:text-cyan-400">
              What We Do
            </Link>
            <Link href="/contact" className="hover:text-cyan-400">
              Let's Talk
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
            Services
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span>Affiliate Marketing</span>
            <span>Social Media Marketing</span>
            <span>Website Development</span>
            <span>SEO Optimization</span>
            <span>Lead Generation</span>
            <span>WhatsApp Marketing</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
            Contact Info
          </h3>

          <div className="space-y-4 text-sm text-gray-400">
            <div>
              <p className="font-medium text-white">Phone</p>
              <a href="tel:+919518000433" className="hover:text-cyan-400">
                +91 9518000433
              </a>
            </div>

            <div>
              <p className="font-medium text-white">Email</p>

              <div className="flex flex-col gap-1">
                <a
                  href="mailto:sam@blackwolfdigital.in"
                  className="hover:text-cyan-400"
                >
                  sam@blackwolfdigital.in
                </a>
              </div>
            </div>

            <div>
              <p className="font-medium text-white">Address</p>

              <p className="leading-6">
                1st Street on Bahalba RoadNear Tayal Trading Company
                <br />
                Kishangarh, Maham
                <br />
                Rohtak Division, Haryana 124112
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative my-10 flex justify-center overflow-hidden">
        {/* Glow */}
        {/* <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" /> */}

        {/* Watermark Text */}
        <h2 className="relative z-10 select-none text-center text-6xl font-black uppercase tracking-wider text-cyan-200/[0.10] md:text-8xl lg:text-[10rem]">
          BLACK WOLF
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} Black Wolf Digital. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/privacy-policy"
            className="transition hover:text-cyan-400"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/terms-and-conditions"
            className="transition hover:text-cyan-400"
          >
            Terms & Conditions
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/disclaimer" className="transition hover:text-cyan-400">
            Disclaimer
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/refund-policy"
            className="transition hover:text-cyan-400"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

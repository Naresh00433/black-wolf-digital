"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/about" },
  { label: "What We Do", href: "/services" },
  { label: "Insights", href: "/blog" },
  { label: "Let's Talk", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <Image
            src="/images/black-wolf-digital-logo.png"
            alt="Black Wolf Digital"
            width={2016}
            height={2120}
            className="h-35 w-35"
            priority
          />
          {/* <span className="text-lg font-bold tracking-wide text-white">
            Black Wolf <span className="text-cyan-400">Digital</span>
          </span> */}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  active ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Get Free Strategy Call
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-cyan-400 text-black"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              Get Free Strategy Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

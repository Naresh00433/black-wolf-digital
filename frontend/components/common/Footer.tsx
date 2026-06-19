import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-10 text-white">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/black-wolf-digital.png"
              alt="Black Wolf Digital"
              width={100}
              height={100}
              className="ms-5 w-auto"
              priority
            />
          </Link>
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
              About
            </Link>
            <Link href="/blog" className="hover:text-cyan-400">
              Blog
            </Link>
            <Link href="/services" className="hover:text-cyan-400">
              Services
            </Link>
            <Link href="/contact" className="hover:text-cyan-400">
              Contact Us
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
              <a href="tel:+918984129745" className="hover:text-cyan-400">
                +91 89841 29745
              </a>
            </div>

            <div>
              <p className="font-medium text-white">Email</p>

              <div className="flex flex-col gap-1">
                <a
                  href="mailto:info@blackwolfdigital.in"
                  className="hover:text-cyan-400"
                >
                  info@blackwolfdigital.in
                </a>

                <a
                  href="mailto:support@blackwolfdigital.in"
                  className="hover:text-cyan-400"
                >
                  support@blackwolfdigital.in
                </a>
              </div>
            </div>

            <div>
              <p className="font-medium text-white">Address</p>

              <p className="leading-6">
                DLF Cyber City Idco Info Park,
                <br />
                Technology Corridor, Patia,
                <br />
                Bhubaneswar, Odisha 751024
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

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/images/black-wolf-digital-removebg-preview.png"
              alt="Black Wolf Digital"
              width={44}
              height={44}
              className="h-25 w-auto"
              priority
            />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
            Performance-focused digital and affiliate marketing solutions for
            businesses that want measurable growth.
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
            <Link href="/services" className="hover:text-cyan-400">
              Services
            </Link>
            <Link href="/blog" className="hover:text-cyan-400">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-cyan-400">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
            Services
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span>Digital Marketing</span>
            <span>Affiliate Marketing</span>
            <span>SEO</span>
            <span>Paid Ads</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Black Wolf Digital. All rights reserved.
      </div>
    </footer>
  );
}

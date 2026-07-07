import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import {
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineRocketLaunch,
  HiOutlineUsers,
} from "react-icons/hi2";

export default function CTA() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-cyan-400/20 bg-gradient-to-br from-[#0f172a] via-[#111827] to-black px-8 py-16 md:px-16">
        <div className="text-center">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Let's Grow Together
          </span>

          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
            Ready to Turn Your
            <span className="text-cyan-400">
              {" "}
              Business Into a Growth Machine?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you're launching a startup, scaling an established
            business, or looking to dominate your industry, our team builds
            high-converting websites, powerful marketing campaigns, and
            AI-driven growth strategies tailored to your goals.
          </p>
        </div>

        {/* Benefits */}

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
            <HiOutlineRocketLaunch className="mx-auto mb-4 text-5xl text-cyan-400" />
            <h3 className="font-bold">Fast Growth</h3>

            <p className="mt-2 text-sm text-gray-400">
              Strategies focused on increasing leads and revenue.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
            <HiOutlineChartBar className="mx-auto mb-4 text-5xl text-cyan-400" />
            <h3 className="font-bold">ROI Focused</h3>

            <p className="mt-2 text-sm text-gray-400">
              Every campaign is optimized for measurable business results.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
            <HiOutlineUsers className="mx-auto mb-4 text-5xl text-cyan-400" />
            <h3 className="font-bold">Dedicated Experts</h3>

            <p className="mt-2 text-sm text-gray-400">
              Work directly with experienced marketers and developers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
            <HiOutlineLightBulb className="mx-auto mb-4 text-5xl text-cyan-400" />
            <h3 className="font-bold">Custom Strategy</h3>

            <p className="mt-2 text-sm text-gray-400">
              Every business gets a personalized growth roadmap.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}

        <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:scale-105 hover:bg-cyan-300"
          >
            Get Free Strategy Call
            <FaArrowRight />
          </Link>

          <Link
            href="/services"
            className="rounded-full border border-cyan-400 px-8 py-4 font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
          >
            Explore What We Do
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          ✓ Free Consultation &nbsp;&nbsp; • &nbsp;&nbsp;
          ✓ No Obligation &nbsp;&nbsp; • &nbsp;&nbsp;
          ✓ Response Within 24 Hours
        </div>
      </div>
    </section>
  );
}
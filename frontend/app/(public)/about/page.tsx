import Link from "next/link";
import CTA from "@/components/common/CTA";

export const metadata = {
  title: "About | Black Wolf Digital",
  description:
    "Learn about Black Wolf Digital, a performance-focused digital and affiliate marketing agency.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 pt-50">
        <div className="absolute left-10 top-32 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            About Us
          </p>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            Built for brands that want real digital growth
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Black Wolf Digital is a performance-focused marketing agency helping
            businesses build stronger visibility, better lead generation, and
            scalable digital growth systems.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Who We Are
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              A growth partner for modern businesses
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              We help businesses use digital marketing, affiliate marketing,
              SEO, paid advertising, content, and lead generation to reach the
              right audience and convert attention into business opportunities.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              {
                title: "Performance First",
                desc: "We focus on measurable outcomes instead of vanity numbers.",
              },
              {
                title: "Strategy Before Execution",
                desc: "Every campaign starts with clear goals, audience understanding, and channel planning.",
              },
              {
                title: "Multi-Channel Growth",
                desc: "SEO, ads, social, content, and affiliate marketing work better when connected.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 md:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Mission
            </p>

            <h2 className="text-3xl font-bold">Make growth simpler</h2>

            <p className="mt-5 leading-8 text-gray-300">
              Our mission is to help businesses create practical, measurable,
              and scalable marketing systems that generate real opportunities.
            </p>
          </div>

          <div className="rounded-3xl border border-purple-400/30 bg-purple-400/10 p-8 md:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
              Vision
            </p>

            <h2 className="text-3xl font-bold">
              Become a trusted growth engine
            </h2>

            <p className="mt-5 leading-8 text-gray-300">
              We aim to become a trusted digital growth partner for businesses
              that want long-term visibility, stronger leads, and better online
              performance.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Values
          </p>

          <h2 className="mb-10 max-w-3xl text-4xl font-bold md:text-5xl">
            The principles behind our work
          </h2>

          <div className="grid gap-5 md:grid-cols-4">
            {["Clarity", "Consistency", "Creativity", "Conversion"].map(
              (value) => (
                <div
                  key={value}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-bold text-cyan-400">{value}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    We keep every strategy focused, understandable, and
                    connected to business growth.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}

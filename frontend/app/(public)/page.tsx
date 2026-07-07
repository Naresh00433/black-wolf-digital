import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Service } from "@/types/service";
import CTA from "@/components/common/CTA";
import FAQ from "@/components/common/FAQ";

interface ServicesResponse {
  success: boolean;
  services: Service[];
}

export default async function HomePage() {
  const data = await apiFetch<ServicesResponse>("/services");
  const services = data.services.slice(0, 4);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 pt-30">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Black Wolf Digital
          </p>

          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
            Grow Smarter. Scale Faster. Dominate Digital.
          </h1>

          <p className="mx-auto mb-9 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Performance-focused digital and affiliate marketing solutions for
            businesses that want visibility, qualified leads, and measurable
            growth.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:bg-cyan-300"
            >
              Get Free Strategy Call
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Explore Services
            </Link>
          </div>

          {/* <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              ["SEO", "Organic growth"],
              ["Paid Ads", "Fast acquisition"],
              ["Affiliate", "Revenue partners"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-bold text-cyan-400">{title}</h3>
                <p className="mt-1 text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>


      <section className="section">
        <div className="container-custom">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                Services
              </p>
              <h2 className="max-w-2xl text-4xl font-bold md:text-5xl">
                Growth services built for serious businesses
              </h2>
            </div>

            <Link
              href="/services"
              className="w-fit rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              View All Services
            </Link>
          </div>

          {services.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
              No services found.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/60 hover:bg-white/10"
                >
                  <p className="mb-4 text-sm uppercase tracking-wider text-cyan-400">
                    {service.icon || "Service"}
                  </p>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {service.shortDescription ||
                      "Performance-focused marketing solution for business growth."}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Why Choose Us
            </p>

            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              We focus on performance, not vanity metrics
            </h2>

            <p className="text-lg leading-8 text-gray-300">
              Black Wolf Digital helps businesses build marketing systems that
              attract the right audience, convert better leads, and create
              measurable growth across channels.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Data-backed marketing decisions",
              "Clear strategy before execution",
              "SEO, ads, content, and affiliate growth under one roof",
              "Lead generation focused approach",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="font-semibold text-white">✓ {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Process
          </p>

          <h2 className="mb-10 max-w-2xl text-4xl font-bold md:text-5xl">
            A simple process to turn attention into growth
          </h2>

          <div className="grid gap-5 md:grid-cols-4">
            {[
              ["01", "Discover", "Understand your business and audience."],
              ["02", "Plan", "Build a channel-wise growth strategy."],
              ["03", "Execute", "Launch campaigns, content, and funnels."],
              ["04", "Optimize", "Track, improve, and scale performance."],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-bold text-cyan-400">{num}</p>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Industries
          </p>

          <h2 className="mb-10 max-w-3xl text-4xl font-bold md:text-5xl">
            Helping businesses across multiple industries grow online
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Healthcare",
                description:
                  "Attract more patients and strengthen your healthcare brand online.",
              },
              {
                title: "Real Estate",
                description:
                  "Generate high-quality property leads and increase market visibility.",
              },
              {
                title: "Education",
                description:
                  "Reach prospective students with targeted digital marketing campaigns.",
              },
              {
                title: "Finance",
                description:
                  "Build trust and acquire customers through strategic online marketing.",
              },
              {
                title: "E-Commerce",
                description:
                  "Drive sales, engagement, and sustainable online business growth.",
              },
              {
                title: "Technology",
                description:
                  "Accelerate growth with performance-driven digital marketing solutions.",
              },
              {
                title: "Local Businesses",
                description:
                  "Connect with local customers and increase footfall and inquiries.",
              },
              {
                title: "Professional Services",
                description:
                  "Generate qualified leads and establish industry authority online.",
              },
            ].map((industry) => (
              <div
                key={industry.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"
              >
                <h3 className="mb-3 text-lg font-bold text-white">
                  {industry.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Results
          </p>

          <h2 className="mb-10 max-w-3xl text-4xl font-bold md:text-5xl">
            Focused on outcomes that help businesses grow
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "More Qualified Leads",
                desc: "Attract high-intent customers ready to engage with your business.",
              },
              {
                title: "Higher Online Visibility",
                desc: "Improve rankings, reach, and brand awareness across channels.",
              },
              {
                title: "Better Conversion Rates",
                desc: "Turn more visitors into customers through optimized experiences.",
              },
              {
                title: "Scalable Growth",
                desc: "Build systems that continue generating opportunities over time.",
              },
              {
                title: "Stronger Brand Presence",
                desc: "Create credibility and trust in competitive markets.",
              },
              {
                title: "Data-Driven Decisions",
                desc: "Use analytics and insights to improve performance consistently.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-gray-400 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <CTA />

      {/* <section className="section">
        <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center md:p-14">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready to grow your business online?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Let’s create a digital growth strategy built around your goals,
            audience, and budget.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300"
          >
            Start Your Growth Plan
          </Link>
        </div>
      </section> */}
    </main>
  );
}

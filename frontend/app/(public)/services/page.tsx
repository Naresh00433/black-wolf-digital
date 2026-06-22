import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Service } from "@/types/service";

interface ServicesResponse {
  success: boolean;
  services: Service[];
}

export const metadata = {
  title: "Services | Black Wolf Digital",
  description:
    "Explore digital marketing, affiliate marketing, SEO, paid ads, content, and lead generation services by Black Wolf Digital.",
};

export default async function ServicesPage() {
  const data = await apiFetch<ServicesResponse>("/services");

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Services
          </p>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            Marketing services built for measurable growth
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            From SEO and paid ads to affiliate marketing and lead generation, we
            help businesses build digital systems that attract, convert, and
            scale.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          {data.services.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-400">
                No services found. Add services from admin.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.services.map((service, index) => (
                <Link
                  href={`/services/${service.slug}`}
                  key={service.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:border-cyan-400/60 hover:bg-white/10"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-cyan-400/10 transition group-hover:bg-cyan-400/20" />

                  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    {service.icon || `0${index + 1}`}
                  </p>

                  <h3 className="text-2xl font-bold group-hover:text-cyan-400">
                    {service.title}
                  </h3>

                  <p className="mt-4 min-h-24 text-sm leading-7 text-gray-400">
                    {service.shortDescription ||
                      "Performance-focused marketing solution designed to improve visibility, leads, and growth opportunities."}
                  </p>

                  <span className="mt-6 inline-block text-sm font-semibold text-cyan-400">
                    Explore Service →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Why It Matters
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Random marketing creates random results
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-gray-300">
            <p>
              A strong digital presence is not built by posting randomly or
              running ads without direction. It needs strategy, execution,
              tracking, and continuous improvement.
            </p>

            <p>
              Our services are designed to connect visibility, traffic, leads,
              and conversions into one practical growth system.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center md:p-14">
          <h2 className="text-4xl font-bold md:text-5xl">
            Not sure which service you need?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Tell us about your business and we’ll suggest the right growth
            direction based on your goals.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300"
          >
            Get Free Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}

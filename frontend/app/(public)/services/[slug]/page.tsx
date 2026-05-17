import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Service } from "@/types/service";

interface ServiceResponse {
  success: boolean;
  service: Service;
}

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  try {
    const data = await apiFetch<ServiceResponse>(`/services/${slug}`);

    return {
      title:
        data.service.metaTitle || `${data.service.title} | Black Wolf Digital`,
      description:
        data.service.metaDescription ||
        data.service.shortDescription ||
        "Marketing service by Black Wolf Digital.",
    };
  } catch {
    return {
      title: "Service Not Found | Black Wolf Digital",
    };
  }
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  let data: ServiceResponse;

  try {
    data = await apiFetch<ServiceResponse>(`/services/${slug}`);
  } catch {
    notFound();
  }

  const service = data.service;

  const benefits = [
    "Clear strategy based on your business goals",
    "Better visibility across relevant digital channels",
    "Improved lead quality and conversion opportunities",
    "Performance tracking and continuous optimization",
  ];

  const process = [
    ["01", "Understand", "We study your business, audience, and current gaps."],
    ["02", "Plan", "We create a focused strategy for this service."],
    ["03", "Execute", "We implement campaigns, content, or systems."],
    ["04", "Optimize", "We track performance and improve continuously."],
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="absolute left-10 top-28 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            href="/services"
            className="mb-8 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
          >
            ← Back to Services
          </Link>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {service.icon || "Service"}
          </p>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            {service.title}
          </h1>

          {service.shortDescription && (
            <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              {service.shortDescription}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Overview
            </p>

            <div className="whitespace-pre-line text-lg leading-9 text-gray-300">
              {service.content}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8">
            <h2 className="text-2xl font-bold">Need this service?</h2>
            <p className="mt-4 leading-7 text-gray-300">
              Let’s discuss your goals and create a plan that fits your
              business.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Get Free Strategy Call
            </Link>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Benefits
          </p>

          <h2 className="mb-10 max-w-3xl text-4xl font-bold md:text-5xl">
            What this service helps you improve
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="font-semibold text-white">✓ {benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Process
          </p>

          <h2 className="mb-10 max-w-3xl text-4xl font-bold md:text-5xl">
            How we approach this service
          </h2>

          <div className="grid gap-5 md:grid-cols-4">
            {process.map(([num, title, desc]) => (
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

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center md:p-14">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready to use {service.title} for growth?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Share your goals with us and we’ll help you understand the best next
            step.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300"
          >
            Start the Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}

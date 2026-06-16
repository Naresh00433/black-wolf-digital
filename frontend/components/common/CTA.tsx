import Link from "next/link";

<section className="px-6 py-24">
  <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center md:p-14">
    <h2 className="text-4xl font-bold md:text-5xl">
      Want marketing that brings better leads?
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
      Let’s build a growth strategy around your business goals, audience, and
      budget.
    </p>

    <Link
      href="/contact"
      className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300"
    >
      Get Free Strategy Call
    </Link>
  </div>
</section>;

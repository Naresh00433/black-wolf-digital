import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Black Wolf Digital",
  description:
    "Contact Black Wolf Digital for digital marketing, affiliate marketing, SEO, paid ads, and lead generation services.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 pb-16 pt-36">
        <div className="absolute left-10 top-28 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Contact
          </p>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            Let’s build your growth strategy
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Tell us about your business, goals, and challenges. We’ll help you
            identify the right digital marketing and affiliate growth
            opportunities.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          <div className="space-y-5">
            {[
              {
                title: "Strategy-first approach",
                desc: "We understand your business before suggesting any marketing solution.",
              },
              {
                title: "Growth-focused services",
                desc: "SEO, paid ads, affiliate marketing, content, and lead generation under one roof.",
              },
              {
                title: "Clear communication",
                desc: "You get practical recommendations, not confusing marketing jargon.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{item.desc}</p>
              </div>
            ))}

            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-6">
              <h3 className="text-xl font-bold">What happens next?</h3>
              <p className="mt-3 leading-7 text-gray-300">
                After you submit the form, the team will review your details and
                connect with you to understand your business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["Response", "We’ll review your enquiry and respond soon."],
            [
              "Discussion",
              "We’ll understand your goals, budget, and audience.",
            ],
            ["Growth Plan", "We’ll suggest the right marketing direction."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Disclaimer | Black Wolf Digital",
  description: "Disclaimer for Black Wolf Digital.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-5xl font-extrabold">Disclaimer</h1>

        <p className="mb-10 text-gray-400">Last Updated: June 2026</p>

        <div className="space-y-8 text-gray-300 leading-8">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              No Guaranteed Results
            </h2>
            <p>
              Marketing, SEO, affiliate marketing, and advertising results vary
              by industry, competition, budget, and market conditions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Professional Advice
            </h2>
            <p>
              Content on this website is for informational purposes only and
              should not be considered legal, financial, or professional advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Third-Party Links
            </h2>
            <p>
              We may link to external websites. We are not responsible for the
              content or policies of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Accuracy of Information
            </h2>
            <p>
              While we strive to keep information accurate, we make no
              guarantees regarding completeness or reliability.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

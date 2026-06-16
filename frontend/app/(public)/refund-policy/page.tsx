export const metadata = {
  title: "Refund Policy | Black Wolf Digital",
  description: "Refund Policy for Black Wolf Digital.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-5xl font-extrabold">Refund Policy</h1>

        <p className="mb-10 text-gray-400">Last Updated: June 2026</p>

        <div className="space-y-8 text-gray-300 leading-8">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Service-Based Work
            </h2>
            <p>
              Our services involve time, expertise, development, consultation,
              and strategic planning. Once work begins, resources are allocated.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Refund Eligibility
            </h2>
            <p>
              Refunds may be considered in cases of duplicate payments,
              accidental billing, or services not started within the agreed
              scope.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Non-Refundable Services
            </h2>
            <p>
              Completed projects, consultations, SEO work, advertising spend,
              and delivered development services are generally non-refundable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Processing Time
            </h2>
            <p>
              Approved refunds may take 7–14 business days to process depending
              on the payment provider.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Contact Information
            </h2>
            <p>Email: support@quillance.com</p>
            <p>Phone: +91 89841 29745</p>
          </section>
        </div>
      </div>
    </main>
  );
}

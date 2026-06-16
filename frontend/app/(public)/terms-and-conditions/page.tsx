export const metadata = {
  title: "Terms & Conditions | Black Wolf Digital",
  description: "Terms & Conditions for Black Wolf Digital.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-5xl font-extrabold">Terms & Conditions</h1>

        <p className="mb-10 text-gray-400">Last Updated: June 2026</p>

        <div className="space-y-8 text-gray-300 leading-8">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">Services</h2>
            <p>
              Black Wolf Digital provides digital marketing, affiliate
              marketing, SEO, website development, automation solutions, and
              consulting services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Website Usage
            </h2>
            <p>
              Users agree not to misuse the website, attempt unauthorized
              access, or disrupt website functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Intellectual Property
            </h2>
            <p>
              All website content, branding, graphics, and materials are the
              property of Black Wolf Digital unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">Payments</h2>
            <p>
              Clients agree to pay invoices according to agreed project terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Limitation of Liability
            </h2>
            <p>
              Black Wolf Digital shall not be liable for indirect or
              consequential damages arising from the use of our services.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

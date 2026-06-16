export const metadata = {
  title: "Privacy Policy | Black Wolf Digital",
  description: "Privacy Policy for Black Wolf Digital.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-5xl font-extrabold">Privacy Policy</h1>

        <p className="mb-10 text-gray-400">Last Updated: June 2026</p>

        <div className="space-y-8 text-gray-300 leading-8">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Information We Collect
            </h2>
            <p>
              We may collect your name, email address, phone number, company
              details, project requirements, and information submitted through
              our contact forms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              How We Use Information
            </h2>
            <p>
              Information is used to respond to inquiries, provide services,
              improve our website, communicate project updates, and enhance user
              experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Data Protection
            </h2>
            <p>
              We implement reasonable security measures to protect your
              information from unauthorized access, disclosure, or misuse.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Third-Party Services
            </h2>
            <p>
              We may use third-party analytics, advertising, hosting, and
              communication platforms to provide and improve our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">Cookies</h2>
            <p>
              Our website may use cookies and similar technologies to improve
              user experience and website performance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Contact Information
            </h2>
            <p>Email: info@quillance.com</p>
            <p>Phone: +91 89841 29745</p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function WelcomeCard() {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
      <h3 className="mb-2 text-lg font-bold text-white">
        👋 Welcome to Black Wolf Digital
      </h3>

      <p className="text-sm leading-6 text-gray-300">
        I'm <span className="font-semibold text-cyan-400">Wolf AI</span>,
        your Digital Growth Consultant.
      </p>

      <p className="mt-4 text-sm text-gray-400">
        I can help you with:
      </p>

      <ul className="mt-3 space-y-2 text-sm text-gray-300">
        <li>🌐 Website Development</li>
        <li>📈 SEO & Google Rankings</li>
        <li>🚀 Lead Generation</li>
        <li>📱 Social Media Marketing</li>
        <li>💬 WhatsApp Marketing</li>
      </ul>
    </div>
  );
}
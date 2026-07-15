import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsappButton() {
  return (
    <Link
      href="https://wa.me/919518000433"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
    >
      <FaWhatsapp size={35} />
    </Link>
  );
}

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Admin Login | Black Wolf Digital",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 pt-20 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          
          <Link href="/" className="flex items-center justify-center gap-3">
            <Image
              src="/images/black-wolf-digital-removebg-preview.png"
              alt="Black Wolf Digital"
              width={44}
              height={44}
              className="h-25 w-auto"
              priority
            />
          </Link>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Admin Panel
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Login to manage blogs, services, and leads.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}

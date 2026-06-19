"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("black_wolf_token");

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("black_wolf_token");
          localStorage.removeItem("black_wolf_user");
          router.replace("/admin/login");
          return;
        }

        const data = await response.json();

        setUserRole(data.user.role);

        setChecking(false);
      } catch {
        localStorage.removeItem("black_wolf_token");
        localStorage.removeItem("black_wolf_user");
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("black_wolf_token");
    localStorage.removeItem("black_wolf_user");
    router.replace("/admin/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard" },

    { label: "Profile", href: "/admin/profile" },

    ...(userRole === "SUPER_ADMIN" ||
    userRole === "ADMIN" ||
    userRole === "EDITOR"
      ? [{ label: "Blogs", href: "/admin/blogs" }]
      : []),

    ...(userRole === "SUPER_ADMIN" || userRole === "ADMIN"
      ? [
          { label: "Services", href: "/admin/services" },
          { label: "Leads", href: "/admin/leads" },
        ]
      : []),

    ...(userRole === "SUPER_ADMIN"
      ? [{ label: "Users", href: "/admin/users" }]
      : []),

    {
      label: "Change Password",
      href: "/admin/change-password",
    },
  ];

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-gray-400">Checking admin access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-white/10 bg-white/[0.03] p-6 md:block">
          <Link
            href="/admin/dashboard"
            className="flex w-full items-center justify-center gap-3"
          >
            <Image
              src="/images/black-wolf-digital-removebg-preview.png"
              alt="Black Wolf Digital Admin"
              width={44}
              height={44}
              className="h-25 w-auto"
              priority
            />
          </Link>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Logged In As
            </p>

            <p className="mt-2 font-semibold text-cyan-400">{userRole}</p>
          </div>

          <nav className="mt-10 flex flex-col gap-2">
            {adminLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-cyan-400 text-black"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 w-full rounded-xl border border-red-400/30 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
          >
            Logout
          </button>
        </aside>

        <section className="flex-1">
          <div className="sticky top-0 z-40 border-b border-white/10 bg-black/90 px-5 py-4 backdrop-blur md:hidden">
            <div className="flex items-center justify-between">
              <Link
                href="/admin/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-2 font-bold"
              >
                <Image
                  src="/images/black-wolf-digital-removebg-preview.png"
                  alt="Black Wolf Digital Admin"
                  width={36}
                  height={36}
                  className="h-25 w-auto"
                  priority
                />
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <span aria-hidden="true">✕</span>
                ) : (
                  <span aria-hidden="true">☰</span>
                )}
              </button>
            </div>

            {menuOpen && (
              <nav className="mt-4 flex flex-col gap-2">
                {adminLinks.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-cyan-400 text-black"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-400/30 px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
                >
                  Logout
                </button>
              </nav>
            )}
          </div>

          <div className="p-5 md:p-10">{children}</div>
        </section>
      </div>
    </main>
  );
}

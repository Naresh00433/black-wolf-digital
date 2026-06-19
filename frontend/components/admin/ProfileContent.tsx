"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLoginAt?: string;
  isActive?: boolean;
}

export default function ProfileContent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("black_wolf_token");

    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Role</p>
          <h3 className="mt-2 text-2xl font-bold text-cyan-400">
            {user.role}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Status</p>
          <h3 className="mt-2 text-2xl font-bold text-green-400">
            Active
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Member Since</p>
          <h3 className="mt-2 text-lg font-bold">
            {new Date(user.createdAt).toLocaleDateString()}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Last Login</p>
          <h3 className="mt-2 text-lg font-bold">
            {user.lastLoginAt
              ? new Date(user.lastLoginAt).toLocaleDateString()
              : "N/A"}
          </h3>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-xl font-bold">
            Profile Information
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400">Full Name</p>
              <p className="mt-1 text-lg">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Email Address</p>
              <p className="mt-1 text-lg">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Role</p>
              <p className="mt-1 text-lg">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-xl font-bold">
            Account Summary
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400">
                Account Status
              </p>
              <p className="mt-1 font-semibold text-green-400">
                Active
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Account Created
              </p>
              <p className="mt-1">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Login Access
              </p>
              <p className="mt-1">
                Full Administrative Access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
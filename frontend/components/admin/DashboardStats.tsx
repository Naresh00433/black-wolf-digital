"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { DashboardStats } from "@/types/dashboard";

interface StatsResponse {
  success: boolean;
  stats: DashboardStats;
}

export default function DashboardStatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("black_wolf_token");

      if (!token) {
        setErrorMessage("Token missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: StatsResponse = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        setStats(data.stats);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
        Loading dashboard stats...
      </div>
    );
  }

  if (errorMessage || !stats) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-6 text-red-300">
        {errorMessage || "Stats not found"}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Blogs",
      value: stats.blogs.total,
      sub: `${stats.blogs.published} published, ${stats.blogs.draft} draft`,
    },
    {
      label: "Total Services",
      value: stats.services.total,
      sub: `${stats.services.active} active services`,
    },
    {
      label: "Total Leads",
      value: stats.leads.total,
      sub: `${stats.leads.new} new leads`,
    },
    {
      label: "Converted Leads",
      value: stats.leads.converted,
      sub: `${stats.leads.contacted} contacted`,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <p className="text-sm text-gray-400">{card.label}</p>
          <h3 className="mt-3 text-4xl font-bold text-white">{card.value}</h3>
          <p className="mt-2 text-sm text-cyan-400">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}

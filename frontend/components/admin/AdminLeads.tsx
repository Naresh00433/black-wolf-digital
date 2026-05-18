"use client";

import { useCallback, useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Lead } from "@/types/lead";

interface LeadsResponse {
  success: boolean;
  leads: Lead[];
}

const statuses = ["new", "contacted", "qualified", "converted", "rejected"];

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getToken = () => localStorage.getItem("black_wolf_token");

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setSuccessMessage("");
  };

  const fetchLeads = useCallback(async () => {
    const token = getToken();

    if (!token) {
      showError("Token missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: LeadsResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      setLeads(data.leads);
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const token = getToken();

    if (!token) {
      showError("Token missing");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/leads/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
      );

      showSuccess("Lead status updated successfully.");
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const deleteLead = async (id: number, name: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete lead from "${name}"? This action cannot be undone.`,
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) {
      showError("Token missing");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete lead");
      }

      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      showSuccess("Lead deleted successfully.");
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const searchValue = searchTerm.toLowerCase().trim();

    const matchesSearch =
      searchValue === "" ||
      lead.name.toLowerCase().includes(searchValue) ||
      (lead.email || "").toLowerCase().includes(searchValue) ||
      (lead.phone || "").toLowerCase().includes(searchValue) ||
      (lead.company || "").toLowerCase().includes(searchValue) ||
      (lead.service || "").toLowerCase().includes(searchValue) ||
      (lead.budget || "").toLowerCase().includes(searchValue) ||
      (lead.message || "").toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
        Loading leads...
      </div>
    );
  }

  if (errorMessage && leads.length === 0) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-6 text-red-300">
        {errorMessage}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="space-y-5">
        {successMessage && (
          <div className="rounded-2xl border border-green-400/30 bg-green-400/10 px-5 py-4 text-sm font-medium text-green-300">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm font-medium text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
          No leads found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {successMessage && (
        <div className="rounded-2xl border border-green-400/30 bg-green-400/10 px-5 py-4 text-sm font-medium text-green-300">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm font-medium text-red-300">
          {errorMessage}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_190px_auto]">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            placeholder="Search leads by name, email, phone, company..."
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
          >
            <option value="all">All status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Clear
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
          No leads match your search/filter.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-gray-300">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Budget</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/10">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{lead.name}</p>
                      {lead.message && (
                        <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                          {lead.message}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      <p>{lead.email || "-"}</p>
                      <p className="text-xs text-gray-500">
                        {lead.phone || "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {lead.company || "-"}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {lead.service || "-"}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {lead.budget || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className="rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-cyan-400"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-4 text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => deleteLead(lead.id, lead.name)}
                        className="rounded-lg border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
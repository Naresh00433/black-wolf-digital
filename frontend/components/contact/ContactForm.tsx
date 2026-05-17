"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      setSuccessMessage("Thank you! Your message has been submitted.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Name *
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Phone
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            placeholder="9876543210"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Company
          </label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Service Interested
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">Select service</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Affiliate Marketing">Affiliate Marketing</option>
            <option value="SEO">SEO</option>
            <option value="Paid Ads">Paid Ads</option>
            <option value="Social Media Marketing">
              Social Media Marketing
            </option>
            <option value="Lead Generation">Lead Generation</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Budget
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">Select budget</option>
            <option value="Below 25000">Below ₹25,000</option>
            <option value="25000-50000">₹25,000 - ₹50,000</option>
            <option value="50000-100000">₹50,000 - ₹1,00,000</option>
            <option value="Above 100000">Above ₹1,00,000</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
          placeholder="Tell us about your business goals..."
        />
      </div>

      {successMessage && (
        <div className="mt-5 rounded-xl border border-green-400/30 bg-green-400/10 p-4 text-sm text-green-300">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-full bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Blog } from "@/types/blog";

interface BlogsResponse {
  success: boolean;
  blogs: Blog[];
}

const emptyForm = {
  title: "",
  shortDescription: "",
  content: "",
  featuredImage: "",
  category: "",
  tags: "",
  metaTitle: "",
  metaDescription: "",
  status: "draft",
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getToken = () => localStorage.getItem("black_wolf_token");

  const fetchBlogs = async () => {
    const token = getToken();

    if (!token) {
      setErrorMessage("Token missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogs/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: BlogsResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      setBlogs(data.blogs);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);

    setFormData({
      title: blog.title || "",
      shortDescription: blog.shortDescription || "",
      content: blog.content || "",
      featuredImage: blog.featuredImage || "",
      category: blog.category || "",
      tags: blog.tags || "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      status: blog.status || "draft",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      alert("Token missing");
      return;
    }

    if (!formData.title || !formData.content) {
      alert("Title and content are required");
      return;
    }

    setSaving(true);

    try {
      const url = editingId
        ? `${API_URL}/blogs/${editingId}`
        : `${API_URL}/blogs`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save blog");
      }

      await fetchBlogs();
      resetForm();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[440px_1fr]">
      <form
        onSubmit={handleSubmit}
        className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h2 className="mb-5 text-xl font-bold">
          {editingId ? "Edit Blog" : "Add Blog"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="What Is Affiliate Marketing?"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="Short blog summary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="Full blog content"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Affiliate Marketing"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Tags</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="seo,marketing,affiliate"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Featured Image URL
            </label>
            <input
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Meta Title
            </label>
            <input
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="SEO title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="SEO description"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:opacity-60"
          >
            {saving ? "Saving..." : editingId ? "Update Blog" : "Create Blog"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
            Loading blogs...
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-6 text-red-300">
            {errorMessage}
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
            No blogs found.
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold">{blog.title}</h3>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs ${
                          blog.status === "published"
                            ? "border-green-400/30 text-green-300"
                            : "border-yellow-400/30 text-yellow-300"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400">/blog/{blog.slug}</p>

                    <p className="mt-2 text-xs text-cyan-400">
                      {blog.category || "No category"}
                    </p>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
                      {blog.shortDescription || "No short description"}
                    </p>

                    <p className="mt-3 text-xs text-gray-500">
                      Created:{" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex h-fit gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="rounded-lg border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

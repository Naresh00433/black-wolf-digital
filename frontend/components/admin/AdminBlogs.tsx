"use client";

import { useCallback, useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Blog } from "@/types/blog";

interface BlogsResponse {
  success: boolean;
  blogs: Blog[];
}

interface UploadResponse {
  success: boolean;
  message: string;
  imageUrl: string;
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
  const [uploadingImage, setUploadingImage] = useState(false);
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

  const fetchBlogs = useCallback(async () => {
    const token = getToken();

    if (!token) {
      showError("Token missing");
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
        throw new Error(
          data.success === false
            ? "Failed to fetch blogs"
            : "Failed to fetch blogs",
        );
      }

      setBlogs(data.blogs);
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const token = getToken();

    if (!token) {
      showError("Token missing");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      showError("Only JPG, PNG, and WEBP images are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showError("Image size must be less than 2MB");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    setUploadingImage(true);

    try {
      const response = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      const data: UploadResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload image");
      }

      setFormData((prev) => ({
        ...prev,
        featuredImage: data.imageUrl,
      }));

      showSuccess("Image uploaded successfully.");
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const removeFeaturedImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: "",
    }));
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
      showError("Token missing");
      return;
    }

    if (!formData.title || !formData.content) {
      showError("Title and content are required");
      return;
    }

    setSaving(true);

    try {
      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${API_URL}/blogs/${editingId}`
        : `${API_URL}/blogs`;

      const method = isEditing ? "PUT" : "POST";

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

      showSuccess(
        isEditing ? "Blog updated successfully." : "Blog created successfully.",
      );

      resetForm();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (id: number, title: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`,
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) {
      showError("Token missing");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog");
      }

      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      showSuccess("Blog deleted successfully.");
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchValue = searchTerm.toLowerCase().trim();

    const matchesSearch =
      searchValue === "" ||
      blog.title.toLowerCase().includes(searchValue) ||
      blog.slug.toLowerCase().includes(searchValue) ||
      (blog.category || "").toLowerCase().includes(searchValue) ||
      (blog.shortDescription || "").toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all" || blog.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-5">
      {successMessage && (
        <div className="rounded-2xl border border-green-400/30 bg-green-400/10 px-5 py-4 text-sm font-medium text-green-300">
          {successMessage}
        </div>
      )}

      {errorMessage && !loading && (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm font-medium text-red-300">
          {errorMessage}
        </div>
      )}

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
              <label className="mb-2 block text-sm text-gray-300">
                Title *
              </label>
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
                Featured Image
              </label>

              <div className="space-y-3 rounded-xl border border-white/10 bg-black p-4">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-cyan-300 disabled:opacity-60"
                />

                {uploadingImage && (
                  <p className="text-xs text-cyan-300">Uploading image...</p>
                )}

                <input
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Or paste image URL manually"
                />

                {formData.featuredImage && (
                  <div className="space-y-3">
                    <img
                      src={formData.featuredImage}
                      alt="Featured preview"
                      className="h-44 w-full rounded-xl border border-white/10 object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="rounded-full border border-red-400/30 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10"
                    >
                      Remove image
                    </button>
                  </div>
                )}
              </div>
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
              disabled={saving || uploadingImage}
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

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                placeholder="Search blogs by title, slug, category..."
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
              >
                <option value="all">All status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
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
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
              Loading blogs...
            </div>
          ) : errorMessage && blogs.length === 0 ? (
            <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-6 text-red-300">
              {errorMessage}
            </div>
          ) : blogs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
              No blogs found.
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
              No blogs match your search/filter.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredBlogs.map((blog) => (
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

                      {blog.featuredImage && (
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="mt-4 h-32 w-full max-w-md rounded-xl border border-white/10 object-cover"
                        />
                      )}

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
                        onClick={() => deleteBlog(blog.id, blog.title)}
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
    </div>
  );
}
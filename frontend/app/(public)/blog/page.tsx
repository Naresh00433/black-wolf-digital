import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Blog } from "@/types/blog";
import CTA from "@/components/common/CTA";

interface BlogsResponse {
  success: boolean;
  blogs: Blog[];
}

export const metadata = {
  title: "Blog | Black Wolf Digital",
  description:
    "Read digital marketing, affiliate marketing, SEO, paid ads, and lead generation insights from Black Wolf Digital.",
};

export default async function BlogPage() {
  const data = await apiFetch<BlogsResponse>("/blogs");

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 pt-50">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Blog
          </p>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            Marketing insights for smarter growth
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Practical thoughts on digital marketing, affiliate growth, SEO, paid
            ads, lead generation, and online business growth.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          {data.blogs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-400">
                No blogs found. Add blogs from admin.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.blogs.map((blog) => (
                <Link
                  href={`/blog/${blog.slug}`}
                  key={blog.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-cyan-400/60 hover:bg-white/10"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                          Black Wolf Digital
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
                      <span className="text-cyan-400">
                        {blog.category || "Marketing"}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold group-hover:text-cyan-400">
                      {blog.title}
                    </h3>

                    <p className="mt-4 min-h-20 text-sm leading-7 text-gray-400">
                      {blog.shortDescription ||
                        "Read the latest marketing insight from Black Wolf Digital."}
                    </p>

                    <span className="mt-6 inline-block text-sm font-semibold text-cyan-400">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </main>
  );
}

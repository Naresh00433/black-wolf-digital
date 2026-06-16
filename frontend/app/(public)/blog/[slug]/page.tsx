import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Blog } from "@/types/blog";

interface BlogResponse {
  success: boolean;
  blog: Blog;
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  try {
    const data = await apiFetch<BlogResponse>(`/blogs/${slug}`);

    return {
      title: data.blog.metaTitle || `${data.blog.title} | Black Wolf Digital`,
      description:
        data.blog.metaDescription ||
        data.blog.shortDescription ||
        "Marketing insight from Black Wolf Digital.",
    };
  } catch {
    return {
      title: "Blog Not Found | Black Wolf Digital",
    };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let data: BlogResponse;

  try {
    data = await apiFetch<BlogResponse>(`/blogs/${slug}`);
  } catch {
    notFound();
  }

  const blog = data.blog;

  const tags =
    blog.tags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) || [];

  return (
    <main className="min-h-screen bg-black text-white">
      <article>
        <section className="relative overflow-hidden px-6 pb-16 pt-36">
          <div className="absolute left-10 top-28 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-5xl">
            <Link
              href="/blog"
              className="mb-8 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              ← Back to Blog
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
              <span className="text-cyan-400">
                {blog.category || "Marketing"}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
              {blog.title}
            </h1>

            {blog.shortDescription && (
              <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
                {blog.shortDescription}
              </p>
            )}
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="relative h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 md:h-[480px]">
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
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_0.25fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="whitespace-pre-line text-lg leading-9 text-gray-300">
                {blog.content}
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold">Article Details</h2>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="mt-1 text-cyan-400">
                    {blog.category || "Marketing"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Published</p>
                  <p className="mt-1 text-gray-300">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {tags.length > 0 && (
                  <div>
                    <p className="text-gray-500">Tags</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center md:p-14">
            <h2 className="text-4xl font-bold md:text-5xl">
              Want to turn insights into growth?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Black Wolf Digital can help you build a practical marketing system
              for visibility, leads, and conversions.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300"
            >
              Get Free Strategy Call
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

import AdminLayout from "@/components/admin/AdminLayout";
import AdminBlogs from "@/components/admin/AdminBlogs";

export default function AdminBlogsPage() {
  return (
    <AdminLayout>
      <section>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Blogs
        </p>

        <h1 className="mb-8 text-4xl font-bold">Manage Blogs</h1>

        <AdminBlogs />
      </section>
    </AdminLayout>
  );
}

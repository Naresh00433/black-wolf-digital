import AdminLayout from "@/components/admin/AdminLayout";
import UsersManagement from "@/components/admin/UsersManagement";

export default function UsersPage() {
  return (
    <AdminLayout>
      <section>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Administration
        </p>

        <h1 className="mb-8 text-4xl font-bold">
          User Management
        </h1>

        <UsersManagement />
      </section>
    </AdminLayout>
  );
}
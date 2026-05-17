import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStatsCards from "@/components/admin/DashboardStats";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <section>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Admin Dashboard
        </p>

        <h1 className="mb-8 text-4xl font-bold">Dashboard Overview</h1>

        <DashboardStatsCards />
      </section>
    </AdminLayout>
  );
}

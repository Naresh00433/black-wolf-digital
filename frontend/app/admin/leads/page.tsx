import AdminLayout from "@/components/admin/AdminLayout";
import AdminLeads from "@/components/admin/AdminLeads";

export default function AdminLeadsPage() {
  return (
    <AdminLayout>
      <section>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Leads
        </p>

        <h1 className="mb-8 text-4xl font-bold">Manage Leads</h1>

        <AdminLeads />
      </section>
    </AdminLayout>
  );
}

import AdminLayout from "@/components/admin/AdminLayout";
import AdminServices from "@/components/admin/AdminServices";

export default function AdminServicesPage() {
  return (
    <AdminLayout>
      <section>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Services
        </p>

        <h1 className="mb-8 text-4xl font-bold">Manage Services</h1>

        <AdminServices />
      </section>
    </AdminLayout>
  );
}

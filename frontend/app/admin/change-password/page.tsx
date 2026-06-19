import AdminLayout from "@/components/admin/AdminLayout";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <AdminLayout>
      <section>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Security
        </p>

        <h1 className="mb-8 text-4xl font-bold">
          Change Password
        </h1>

        <ChangePasswordForm />
      </section>
    </AdminLayout>
  );
}
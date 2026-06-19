import AdminLayout from "@/components/admin/AdminLayout";
import ProfileContent from "@/components/admin/ProfileContent";

export default function ProfilePage() {
  return (
    <AdminLayout>
      <section>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Account
        </p>

        <h1 className="mb-8 text-4xl font-bold">
          My Profile
        </h1>

        <ProfileContent />
      </section>
    </AdminLayout>
  );
}
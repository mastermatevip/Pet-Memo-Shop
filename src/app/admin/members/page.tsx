import { AdminShell } from "@/components/admin/AdminShell";
import { MembersPageClient } from "@/components/admin/MembersPageClient";
import { loadMembers } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminMembersPage() {
  const members = [...loadMembers()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return (
    <AdminShell title="会员管理">
      <MembersPageClient initialMembers={members} />
    </AdminShell>
  );
}

import { AdminShell } from "@/components/admin/AdminShell";
import { MemberEditor } from "@/components/admin/MemberEditor";
import type { Member } from "@/types";

export const dynamic = "force-dynamic";

function createBlankMember(): Member {
  const now = new Date().toISOString();
  return {
    email: "",
    name: "",
    status: "active",
    source: "manual",
    orderCount: 0,
    totalSpent: 0,
    currency: "USD",
    orderNumbers: [],
    createdAt: now,
    updatedAt: now,
  };
}

export default function AdminNewMemberPage() {
  return (
    <AdminShell title="新建会员">
      <MemberEditor initial={createBlankMember()} isNew />
    </AdminShell>
  );
}

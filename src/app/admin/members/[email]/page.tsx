import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { MemberEditor } from "@/components/admin/MemberEditor";
import { getMemberByEmailFromStore, loadOrders } from "@/lib/cms/store";
import { getMemberOrders, memberParamToEmail } from "@/lib/members/sync";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ email: string }>;
}

export default async function AdminMemberEditPage({ params }: Props) {
  const { email: emailParam } = await params;
  const member = getMemberByEmailFromStore(memberParamToEmail(emailParam));
  if (!member) notFound();

  const relatedOrders = getMemberOrders(member, loadOrders());

  return (
    <AdminShell title={`编辑会员：${member.name}`}>
      <MemberEditor initial={member} relatedOrders={relatedOrders} />
    </AdminShell>
  );
}

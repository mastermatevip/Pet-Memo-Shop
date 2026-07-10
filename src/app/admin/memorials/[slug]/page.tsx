import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { MemorialEditor } from "@/components/admin/MemorialEditor";
import { getMemorialBySlug } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminMemorialEditPage({ params }: Props) {
  const { slug } = await params;
  const page = getMemorialBySlug(slug);
  if (!page) notFound();

  return (
    <AdminShell title={`编辑纪念页 — ${page.petName}`}>
      <MemorialEditor initial={page} />
    </AdminShell>
  );
}

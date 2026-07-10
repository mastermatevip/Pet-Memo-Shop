import { AdminShell } from "@/components/admin/AdminShell";
import { MemorialEditor } from "@/components/admin/MemorialEditor";
import { generateMemorialSlug } from "@/lib/memorial/slug";
import { getMemorialSlugs } from "@/lib/cms/store";
import type { MemorialPage } from "@/types";

export const dynamic = "force-dynamic";

export default function AdminNewMemorialPage() {
  const now = new Date().toISOString();
  const page: MemorialPage = {
    slug: generateMemorialSlug("companion", new Set(getMemorialSlugs())),
    customerEmail: "",
    petName: "",
    gallery: [],
    familyMessages: [],
    guestbookEnabled: true,
    guestbook: [],
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  return (
    <AdminShell title="新建数字纪念页">
      <MemorialEditor initial={page} isNew />
    </AdminShell>
  );
}

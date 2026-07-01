import { AdminShell } from "@/components/admin/AdminShell";
import { HomepageEditor } from "@/components/admin/HomepageEditor";
import { loadHomepageContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminHomepagePage() {
  const content = loadHomepageContent();

  return (
    <AdminShell title="首页编辑">
      <HomepageEditor initial={content} />
    </AdminShell>
  );
}

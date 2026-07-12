import { AdminShell } from "@/components/admin/AdminShell";
import { DigitalMemorialLandingEditor } from "@/components/admin/DigitalMemorialLandingEditor";
import { loadDigitalMemorialLanding } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminDigitalMemorialLandingPage() {
  const content = loadDigitalMemorialLanding();

  return (
    <AdminShell title="数字纪念营销页">
      <DigitalMemorialLandingEditor initial={content} />
    </AdminShell>
  );
}

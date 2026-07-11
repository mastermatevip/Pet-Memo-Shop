import { AdminShell } from "@/components/admin/AdminShell";
import { HomepageEditor } from "@/components/admin/HomepageEditor";
import { loadHomepageContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminHomepagePage() {
  const content = loadHomepageContent();

  return (
    <AdminShell title="首页编辑">
      <p className="mb-6 text-sm text-muted leading-relaxed rounded-lg border border-border bg-highlight px-4 py-3">
        <strong className="font-medium text-text">NFC 介绍区图片：</strong>
        点上方快捷导航「NFC 介绍区」，在金色边框区块里点「从本地上传」替换左侧大图，然后点底部「保存首页」。
      </p>
      <HomepageEditor initial={content} />
    </AdminShell>
  );
}

import { AdminShell } from "@/components/admin/AdminShell";
import { HomepageEditor } from "@/components/admin/HomepageEditor";
import { loadHomepageContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminHomepagePage() {
  const content = loadHomepageContent();

  return (
    <AdminShell title="首页编辑">
      <p className="mb-6 text-sm text-muted leading-relaxed rounded-lg border border-border bg-highlight px-4 py-3">
        <strong className="font-medium text-text">首页图片：</strong>
        上传后会<strong className="font-medium text-text">自动保存</strong>；改文字后请点底部「保存首页」。请确认 Coolify 已挂载{" "}
        <code className="text-xs">/app/data/cms</code> 与 <code className="text-xs">/app/public/uploads</code>。
      </p>
      <HomepageEditor initial={content} />
    </AdminShell>
  );
}

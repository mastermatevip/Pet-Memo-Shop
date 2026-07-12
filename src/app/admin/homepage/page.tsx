import { AdminShell } from "@/components/admin/AdminShell";
import { HomepageEditor } from "@/components/admin/HomepageEditor";
import { getHomepagePersistenceStatus, loadHomepageFile } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminHomepagePage() {
  const file = loadHomepageFile();
  const persistence = getHomepagePersistenceStatus();

  return (
    <AdminShell title="首页编辑">
      <div className="mb-6 space-y-3">
        <p className="text-sm text-muted leading-relaxed rounded-lg border border-border bg-highlight px-4 py-3">
          <strong className="font-medium text-text">首页图片：</strong>
          上传后会<strong className="font-medium text-text">自动保存</strong>（同时写入 CMS 卷与 uploads
          备份）。改文字后请点底部「保存首页」。
        </p>
        <div
          className={[
            "rounded-lg border px-4 py-3 text-sm",
            persistence.writableCms && persistence.writableBackup && persistence.inSync
              ? "border-border bg-card text-muted"
              : "border-amber-300 bg-amber-50 text-amber-950",
          ].join(" ")}
        >
          <p className="font-medium text-text">存储状态</p>
          <p className="mt-1">
            上次保存：{persistence.updatedAt ? new Date(persistence.updatedAt).toLocaleString() : "未知"}
            {" · "}
            CMS {persistence.writableCms ? "可写" : "不可写"}
            {" · "}
            备份 {persistence.writableBackup ? "可写" : "不可写"}
            {" · "}
            {persistence.inSync ? "双份一致" : "双份不同步（已自动取较新）"}
          </p>
          {(!persistence.writableCms || !persistence.writableBackup) && (
            <p className="mt-2">
              请在 Coolify 确认已挂载 <code className="text-xs">/app/data/cms</code> 与{" "}
              <code className="text-xs">/app/public/uploads</code>，然后 Redeploy。
            </p>
          )}
        </div>
      </div>
      <HomepageEditor initial={file.content} initialUpdatedAt={file.updatedAt} />
    </AdminShell>
  );
}

import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminConfigured } from "@/lib/cms/auth";
import { loadHomepageContent, loadProducts } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const configured = isAdminConfigured();
  const productCount = loadProducts().length;
  const homepage = loadHomepageContent();

  return (
    <AdminShell title="控制台">
      {!configured ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 mb-6">
          请在环境变量中设置 <code className="font-mono">ADMIN_PASSWORD</code> 和{" "}
          <code className="font-mono">ADMIN_SECRET</code> 以启用登录。
        </div>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-light">商品数量</p>
          <p className="font-serif text-3xl mt-1">{productCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-light">首页主标题</p>
          <p className="text-sm mt-2 line-clamp-2">{homepage.hero.h1}</p>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/admin/homepage"
          className="block rounded-xl border border-border bg-card p-5 hover:border-gold transition-colors"
        >
          <p className="font-medium">编辑首页</p>
          <p className="text-sm text-muted mt-1">Hero 区、分类、NFC 区块、各区块标题</p>
        </Link>
        <Link
          href="/admin/products"
          className="block rounded-xl border border-border bg-card p-5 hover:border-gold transition-colors"
        >
          <p className="font-medium">编辑商品</p>
          <p className="text-sm text-muted mt-1">标题、价格、描述、图片</p>
        </Link>
      </div>
    </AdminShell>
  );
}

import Link from "next/link";
import { Home, Package, LayoutDashboard, FileText, ShoppingBag, Users } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

interface AdminShellProps {
  title: string;
  children: React.ReactNode;
}

const nav = [
  { href: "/admin", label: "控制台", icon: LayoutDashboard },
  { href: "/admin/homepage", label: "首页", icon: Home },
  { href: "/admin/products", label: "商品", icon: Package },
  { href: "/admin/blog", label: "博客", icon: FileText },
  { href: "/admin/orders", label: "订单", icon: ShoppingBag },
  { href: "/admin/members", label: "会员", icon: Users },
];

export function AdminShell({ title, children }: AdminShellProps) {
  return (
    <div className="fixed inset-0 z-[100] flex bg-bg text-text">
      <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <p className="text-xs uppercase tracking-wider text-light">Pet Memo Shop</p>
          <h1 className="font-serif text-xl mt-1">管理后台</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-highlight hover:text-text transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="block text-sm text-gold hover:underline px-3"
          >
            查看前台 →
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-bg/95 backdrop-blur border-b border-border px-8 py-5">
          <h2 className="font-serif text-2xl">{title}</h2>
        </header>
        <div className="p-8 max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理后台 | Pet Memo Shop",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import AdminLoginPage from "./AdminLoginPage";

export const metadata: Metadata = {
  title: "登录 | 管理后台",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="fixed inset-0 z-[100] bg-bg" />}>
      <AdminLoginPage />
    </Suspense>
  );
}

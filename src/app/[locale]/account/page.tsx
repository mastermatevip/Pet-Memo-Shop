import { buildMetadata } from "@/lib/seo";
import { AccountPageClient } from "@/components/account/AccountPageClient";

export const metadata = buildMetadata({
  title: "My Account",
  description: "Track your Pet Memo Shop order or get help with your memorial gift purchase.",
  path: "/account",
});

export default function AccountPage() {
  return <AccountPageClient />;
}

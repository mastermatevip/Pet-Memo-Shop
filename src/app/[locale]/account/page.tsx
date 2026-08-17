import { buildMetadata } from "@/lib/seo";
import { AccountPageClient } from "@/components/account/AccountPageClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    title: "My Account",
    description: "Track your Pet Memo Shop order or get help with your memorial gift purchase.",
    path: "/account",
    locale,
    noIndex: true,
  });
}

export default function AccountPage() {
  return <AccountPageClient />;
}

import { HomePage } from "@/components/home/HomePage";
import { buildMetadata } from "@/lib/seo";
import { BRAND } from "@/config/brand";

export const metadata = buildMetadata({
  title: `Personalized Pet Memorial Gifts | Custom Keepsakes | ${BRAND.name}`,
  description:
    "Shop personalized pet memorial gifts, unique keepsakes, pet memorial jewelry, frames, and carbon fiber NFC digital memorial tags. Custom photo, name, and date engraving with proof before production.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}

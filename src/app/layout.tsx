import type { Metadata } from "next";
import { AsyncGoogleFonts } from "@/components/layout/AsyncGoogleFonts";
import { BRAND } from "@/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  icons: {
    icon: BRAND.logoIcon,
    apple: BRAND.logoIcon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <AsyncGoogleFonts />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

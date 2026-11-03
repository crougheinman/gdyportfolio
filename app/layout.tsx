import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-space-grotesk", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono", display: "swap" });

const ogImage = { ...site.ogImage, alt: site.title };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  verification: { google: site.googleSiteVerification },
  // Favicons come from app/icon.png, app/apple-icon.png and app/favicon.ico (file conventions).
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} Portfolio`,
    locale: "en_US",
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [ogImage] },
};

export const viewport: Viewport = { themeColor: "#0a0e0f", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

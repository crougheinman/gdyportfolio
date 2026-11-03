import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-plex-mono", display: "swap" });

const ogImage = { ...site.ogImage, alt: site.title };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
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

export const viewport: Viewport = { themeColor: "#161b22", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://critix.app"),
  title: {
    default: "Critix | Avaliações que importam.",
    template: "%s | Critix",
  },
  description:
    "Critix é a nova plataforma para descobrir, avaliar e acompanhar filmes e séries com mais precisão, comunidade e credibilidade.",
  keywords: [
    "Critix",
    "reviews",
    "críticas",
    "filmes",
    "séries",
    "plataforma de avaliação",
    "entretenimento",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Critix Team" }],
  creator: "Wallace Santana",
  publisher: "Critix Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: new URL(process.env.NEXT_PUBLIC_URL || "https://critix.app"),
    title: "Critix – Onde Reviews Ganham Voz",
    description:
      "Avalie filmes e séries, descubra novas produções e acompanhe críticas reais em uma plataforma moderna.",
    siteName: "Critix",
    images: [
      {
        url: "/logo-full.png",
        width: 1200,
        height: 630,
        alt: "Critix",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/logo-short.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/logo-short.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/logo-short.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/logo-short.png",
  },
  alternates: {
    canonical: new URL(process.env.NEXT_PUBLIC_URL || "https://critix.app"),
  },
  verification: {
    google: "google-site-verification",
  },
  category: "technology",
  classification: "Review Platform",
  referrer: "origin-when-cross-origin",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}

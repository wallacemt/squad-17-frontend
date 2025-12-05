import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const moonjelly = localFont({
  src: [
    {
      path: "./assets/fonts/Moonjelly-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/Moonjelly-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-moonjelly",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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

import { AuthProvider } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <body className={`${moonjelly.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

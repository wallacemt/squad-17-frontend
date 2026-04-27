import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "sonner";
import TopLoadingBar from "@/components/ui/top-loading-bar";
import BackendStatusGate from "@/components/startup/BackendStatusGate";

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
        url: "/images/logo-full.png",
        width: 1200,
        height: 630,
        alt: "Critix",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/images/logo-short.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/logo-short.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/logo-short.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/images/logo-short.png",
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
    <html
      lang="pt-BR"
      data-lt-installed="true"
      className={`${moonjelly.variable} ${poppins.variable} dark`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <link
          rel="preload"
          href="/images/404.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/images/503.svg"
          as="image"
          type="image/svg+xml"
        />
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        <meta httpEquiv="Accept-CH" content="DPR, Width, Viewport-Width" />
      </head>
      <body className="antialiased">
        <TopLoadingBar />
        <BackendStatusGate>
          <AuthProvider>{children}</AuthProvider>
        </BackendStatusGate>
        <Toaster richColors />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnnonceCampus",
  description: "La plateforme de référence pour l'information étudiante au Maroc.",
  metadataBase: new URL("https://annoncecampus.com"),
  openGraph: {
    title: "AnnonceCampus",
    description: "La plateforme de référence pour l'information étudiante au Maroc.",
    url: "https://annoncecampus.com",
    siteName: "AnnonceCampus",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "AnnonceCampus",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnnonceCampus",
    description: "La plateforme de référence pour l'information étudiante au Maroc.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
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
  title: "AnnonceCampus – Actualités, Stages & Vie Étudiante au Maroc",
  description:
    "AnnonceCampus est la plateforme numéro 1 pour les étudiants marocains : actualités campus, offres de stages, logements étudiants, événements universitaires, bourses d'études et bien plus.",
  metadataBase: new URL("https://annoncecampus.com"),
  keywords: [
    "étudiants maroc",
    "actualités étudiantes maroc",
    "vie campus maroc",
    "stages maroc",
    "offres de stage étudiant",
    "logement étudiant maroc",
    "résidence étudiante maroc",
    "événements universitaires maroc",
    "université maroc",
    "grandes écoles maroc",
    "bourse étudiant maroc",
    "annonces étudiantes",
    "campus maroc",
    "orientation scolaire maroc",
    "concours université maroc",
    "masters maroc",
    "licence maroc",
    "doctorat maroc",
    "formation professionnelle maroc",
    "emploi étudiant maroc",
    "job étudiant maroc",
    "colocation étudiant maroc",
    "chambre étudiant maroc",
    "ENCG maroc",
    "ENSA maroc",
    "ENSIAS",
    "Université Mohammed V",
    "Université Hassan II",
    "UM6P",
    "UIR Rabat",
    "ISCAE maroc",
    "actualités Rabat",
    "actualités Casablanca étudiants",
    "actualités Marrakech étudiants",
    "actualités Fès étudiants",
    "annoncecampus",
    "annonce campus",
    "portail étudiant maroc",
    "info campus maroc",
  ],
  openGraph: {
    title: "AnnonceCampus – Actualités, Stages & Vie Étudiante au Maroc",
    description:
      "La plateforme numéro 1 pour les étudiants marocains : stages, logements, événements, actualités campus.",
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
    title: "AnnonceCampus – Actualités, Stages & Vie Étudiante au Maroc",
    description:
      "La plateforme numéro 1 pour les étudiants marocains : stages, logements, événements, actualités campus.",
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
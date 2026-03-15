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
    "annonce campus", "annoncecampus", "annonce campus maroc", "annonces étudiants", "annonce étudiant",
    "site étudiant", "site étudiants maroc", "plateforme étudiante", "portail étudiant", "communauté étudiante",
    "média étudiant", "réseau étudiant", "campus maroc", "campus universitaire", "université maroc",
    "universités maroc", "étudiants maroc", "vie étudiante", "vie universitaire", "actualité étudiants",
    "actualité université", "actualités campus", "journal étudiant", "news étudiants", "informations université",
    "blog étudiant", "guide étudiant", "communauté universitaire", "réseau universitaire", "plateforme université",
    "logement étudiant", "logement étudiant maroc", "appartement étudiant", "studio étudiant",
    "studio étudiant rabat", "studio étudiant casablanca", "chambre étudiant", "location étudiant",
    "location appartement étudiant", "résidence universitaire", "résidence étudiante", "colocation étudiant",
    "colocation étudiants", "logement université", "appartement campus", "logement campus",
    "appartement près université", "logement proche université", "location chambre étudiant",
    "résidence étudiante maroc", "location studio étudiant", "studio universitaire", "logement pas cher étudiant",
    "logement étudiant rabat", "logement étudiant casablanca", "logement étudiant fes",
    "logement étudiant marrakech", "logement étudiant tanger",
    "stage étudiant", "stages étudiants", "stage maroc", "stage étudiant maroc", "stage informatique maroc",
    "stage ingénieur maroc", "stage marketing étudiant", "stage communication étudiant", "stage finance étudiant",
    "stage université", "stage fin d'étude", "stage pfe maroc", "stage licence maroc", "stage master maroc",
    "stage startup maroc", "offre stage étudiant", "offres stage maroc", "stage entreprise maroc",
    "stage rémunéré étudiant", "stage étudiant rabat", "stage étudiant casablanca", "stage étudiant fes",
    "stage étudiant marrakech",
    "job étudiant", "emploi étudiant", "travail étudiant", "job étudiant maroc", "emploi étudiant maroc",
    "travail étudiant rabat", "job étudiant casablanca", "job étudiant weekend", "job étudiant part time",
    "job étudiant université", "petit job étudiant", "offres emploi étudiant", "travail étudiant été",
    "job étudiant campus", "job étudiant université maroc",
    "bourse étudiant", "bourses étudiants", "bourse université", "bourse maroc", "bourse étudiant maroc",
    "bourse étude maroc", "bourse internationale étudiant", "bourse master étudiant", "bourse licence étudiant",
    "bourse doctorat étudiant", "bourse université maroc",
    "événements étudiants", "événement campus", "activité universitaire", "club étudiant", "clubs étudiants",
    "association étudiante", "association universitaire", "activité campus", "conférence étudiant",
    "hackathon étudiant", "compétition étudiants", "forum étudiant", "forum université", "salon étudiant",
    "événement université", "événements université maroc",
    "université rabat", "université casablanca", "université fes", "université marrakech", "université tanger",
    "université agadir", "université oujda", "université meknes", "université kenitra", "université maroc liste",
    "faculté maroc", "faculté rabat", "faculté casablanca", "faculté fes", "école ingénieur maroc",
    "école commerce maroc", "école supérieure maroc", "école privée maroc", "écoles maroc",
    "étudier au maroc", "étudiant université maroc", "inscription université maroc", "orientation étudiant maroc",
    "concours université maroc", "concours écoles maroc", "préparation concours maroc",
    "réussir ses études maroc", "guide université maroc", "admission université maroc",
    "annonces logement étudiant", "annonces étudiants maroc", "annonces campus maroc",
    "annonces université maroc", "annonces stage étudiant", "annonces job étudiant",
    "annonces colocation étudiant", "annonces appartement étudiant", "annonces location étudiant",
    "annonces résidence étudiante", "annonces campus université", "annonces étudiants rabat",
    "annonces étudiants casablanca",
    "marché étudiant", "services étudiants", "plateforme étudiants maroc", "réseau étudiants maroc",
    "communauté étudiants maroc", "site annonces étudiants", "site étudiants maroc",
    "site logement étudiant maroc", "site stage étudiant maroc", "site job étudiant maroc", "site campus maroc",
    "startup étudiant", "projet étudiant", "innovation étudiant", "entrepreneuriat étudiant",
    "startup université", "projets universitaires", "incubateur université", "incubateur étudiant",
    "entrepreneur étudiant",
    "conseils étudiants", "astuces étudiants", "réussite universitaire", "organisation étudiant",
    "productivité étudiant", "révision étudiant", "méthodes étude", "conseils université", "guide campus",
    "guide logement étudiant", "guide stage étudiant", "guide job étudiant", "guide université maroc",
    "annoncecampus maroc", "annoncecampus rabat", "annoncecampus étudiants", "annoncecampus université",
    "annoncecampus logement", "annoncecampus stage", "annoncecampus job", "annoncecampus communauté",
    "annoncecampus plateforme", "annoncecampus site étudiant",
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
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter } from "next/font/google";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { site } from "@/content/site";

import "./globals.css";

/**
 * Trois voix typographiques :
 * — Instrument Serif pour les titres (l'éditorial, la personnalité) ;
 * — Inter pour le texte courant (la lisibilité) ;
 * — IBM Plex Mono pour les libellés et les chiffres (le registre comptable).
 */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Expert-comptable & commissaire aux comptes`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  keywords: [
    "expert-comptable La Réunion",
    "commissaire aux comptes",
    "cabinet comptable Réunion",
    "facturation électronique 2026",
    "Pennylane",
    "audit légal",
    "CAP CONSEILS",
    "FINEXO AUDIT",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
    images: [{ url: "/logo.jpg", width: 1024, height: 1024, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
    images: ["/logo.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/logo.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  colorScheme: "light",
};

/** Données structurées : profession réglementée + coordonnées. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/logo.jpg`,
  image: `${site.url}/logo.jpg`,
  description: site.description,
  slogan: site.baseline,
  email: site.contact.email,
  telephone: site.contact.phone,
  areaServed: ["La Réunion", "Paris", "France"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    postalCode: site.contact.address.postalCode,
    addressLocality: site.contact.address.city,
    addressCountry: "FR",
  },
  location: site.offices.map((o) => ({
    "@type": "Place",
    name: `${site.name} — ${o.name}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      postalCode: o.postalCode,
      addressLocality: o.city,
      addressCountry: "FR",
    },
  })),
  openingHours: ["Mo-Tu 08:15-12:15", "Mo-Tu 13:30-17:15", "Fr 08:15-12:15"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instrument.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a
          href="#contenu"
          className="focus:bg-ink-900 label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:px-5 focus:py-3 focus:text-white"
        >
          Aller au contenu
        </a>

        <Header />
        <main id="contenu">{children}</main>
        <Footer />

        {/* Sans JavaScript, les blocs à révélation restent visibles. */}
        <noscript>
          <style>
            {`[data-reveal]{opacity:1 !important;transform:none !important}
              .line-rise > span > span{transform:none !important}`}
          </style>
        </noscript>
      </body>
    </html>
  );
}

import type { NextConfig } from "next";

/**
 * En-têtes de sécurité. La CSP est volontairement stricte : le site ne charge
 * aucun script tiers. `unsafe-inline` reste nécessaire pour les styles générés
 * par Next et pour les quelques styles calculés dans les composants.
 */
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Le rechargement à chaud de Turbopack a besoin d'eval : en dev seulement.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      // Carte GPS des bureaux : fond OpenStreetMap en iframe, seul domaine tiers autorisé.
      "frame-src https://www.openstreetmap.org",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /**
   * Redirections 301 depuis l'ancien capconseils.net (brief §6 : ne pas perdre
   * le référencement acquis).
   *
   * ⚠️ À COMPLÉTER : la liste ci-dessous est un point de départ plausible.
   * Extraire les URL réellement indexées (Search Console, sitemap actuel, logs
   * serveur) et mapper chacune vers sa nouvelle adresse avant la bascule DNS.
   */
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/accueil", destination: "/", permanent: true },
      { source: "/le-cabinet", destination: "/cabinet", permanent: true },
      { source: "/nos-services", destination: "/expertises", permanent: true },
      { source: "/services", destination: "/expertises", permanent: true },
      { source: "/actualite", destination: "/actualites", permanent: true },
      { source: "/blog", destination: "/actualites", permanent: true },
      { source: "/nous-contacter", destination: "/contact", permanent: true },
      // Outils de l'ancien site, repris sous /outils
      { source: "/calculators", destination: "/outils/calculateurs", permanent: true },
      { source: "/calculateurs", destination: "/outils/calculateurs", permanent: true },
      { source: "/calendar", destination: "/outils/echeancier", permanent: true },
      { source: "/calendrier", destination: "/outils/echeancier", permanent: true },
      { source: "/newsletter", destination: "/actualites#lettre", permanent: true },
      // Rubriques non reprises : redirigées vers l'équivalent le plus proche
      { source: "/documentation", destination: "/espace-client", permanent: true },
      { source: "/indices", destination: "/outils", permanent: true },
      { source: "/mentions", destination: "/mentions-legales", permanent: true },
    ];
  },
};

export default nextConfig;

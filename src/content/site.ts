/**
 * Source unique des données du cabinet.
 *
 * Coordonnées, adresses et horaires transmis par Patrice DALLEAU le 07/08/2026.
 * Les valeurs encore marquées `TODO` restent à obtenir avant mise en ligne
 * (cf. BRIEF-SITE-VITRINE.md §7).
 */

export const TODO = "à compléter" as const;

export const site = {
  name: "CAP CONSEILS",
  legalName: "CAP CONSEILS / FINEXO AUDIT",
  baseline: "Stratégie · Orientation · Performance",
  description:
    "Cabinet d'expertise comptable et de commissariat aux comptes à La Réunion et à Paris. Comptabilité, audit légal, conseil, et intégration d'outils d'IA et d'automatisation.",
  url: "https://www.capconseils.net",
  locale: "fr_FR",

  contact: {
    phone: "0262 55 33 12",
    phoneHref: "tel:+262262553312",
    email: "contact@capconseils.net",
    /** Le siège, repris partout où une seule adresse est affichée. */
    address: {
      street: "55, rue Estelle Darsanesing",
      postalCode: "97420",
      city: "Le Port",
      region: "La Réunion",
      country: "France",
    },
  },

  /**
   * Les quatre bureaux du cabinet.
   * `coords` et `landmark` sont repris de l'ancien site (page contact), donc
   * des valeurs que le cabinet publiait déjà. Seul Paris reste approché : ce
   * bureau n'existait pas sur l'ancien site.
   * ⚠️ Horaires : Patrice a indiqué « lundi à mardi » puis « le vendredi ».
   * Le mercredi et le jeudi ne sont pas couverts — à confirmer avant mise en
   * ligne (il s'agit vraisemblablement de « lundi à jeudi »).
   */
  offices: [
    {
      slug: "le-port",
      coords: { lat: -20.943086, lon: 55.290583 },
      landmark: "Proche du centre commercial CAP SACRÉ CŒUR",
      name: "Le Port",
      role: "Siège social",
      street: "55, rue Estelle Darsanesing",
      postalCode: "97420",
      city: "Le Port",
      region: "La Réunion",
    },
    {
      slug: "saint-denis",
      coords: { lat: -20.882428, lon: 55.447969 },
      landmark: "Immeuble Financière Cathédrale",
      name: "Saint-Denis",
      role: "Bureau",
      street: "28, rue La Bourdonnais",
      postalCode: "97400",
      city: "Saint-Denis",
      region: "La Réunion",
    },
    {
      slug: "etang-sale",
      coords: { lat: -21.27141, lon: 55.33422 },
      landmark: null,
      name: "L'Étang-Salé",
      role: "Bureau",
      street: "4, place de la Principauté d'Andorre",
      postalCode: "97427",
      city: "L'Étang-Salé les Bains",
      region: "La Réunion",
    },
    {
      slug: "paris",
      coords: { lat: 48.8340, lon: 2.4060 },
      landmark: null,
      name: "Paris",
      role: "Bureau",
      street: "29, boulevard Poniatowski",
      postalCode: "75012",
      city: "Paris",
      region: "Île-de-France",
    },
  ],

  hours: [
    { days: "Lundi – mardi", times: ["8h15 – 12h15", "13h30 – 17h15"] },
    { days: "Vendredi", times: ["8h15 – 12h15"] },
  ],

  /** Résumé sur une ligne, pour les emplacements contraints. */
  hoursShort: "Lun. – mar. 8h15–12h15 / 13h30–17h15 · Ven. 8h15–12h15",

  /**
   * Portails clients. Le cabinet souhaite un lien de partage de fichiers vers
   * chacun (confirmé le 07/08/2026). URL exactes à substituer avant mise en ligne.
   */
  portals: {
    pennylane: "https://app.pennylane.com/login",
    sharepoint: `https://${TODO}.sharepoint.com`,
  },

  /** Échéance réglementaire poussée par le cabinet dans sa signature mail. */
  eInvoicing: {
    date: "1er septembre 2026",
    resource: "https://mafacture-monexpert.fr/",
  },

  /** Rappel process client, repris de la signature mail du cabinet. */
  monthlyDeadline: 10,

  /**
   * Identité légale, relevée sur le papier en-tête facture 2022 transmis par
   * le cabinet le 24/08/2026. TVA et numéros d'inscription ordinale restent à
   * obtenir.
   */
  legal: {
    entity: "Cap Conseils Océan Indien",
    form: "SARL",
    activity: "Société d'expertise comptable",
    capital: "50 000 €",
    siren: "489 543 660",
    tagline: "Comptabilité · Audit · Patrimoine — Conseils",
  },

  /**
   * Logos ordinaux à afficher sur le site, demandés par Patrice DALLEAU
   * (PDF « Logo Crcc et Croec Réunion », 24/08/2026).
   * Le logo de l'Ordre est le fichier officiel haute définition (1590 × 318).
   * Celui de la CRCC reste extrait du PDF : à remplacer par la version
   * officielle avant mise en ligne.
   */
  accreditations: [
    {
      slug: "ordre-experts-comptables",
      src: "/ordres/ordre-experts-comptables.png",
      width: 1590,
      height: 318,
      /** Hauteur d'affichage : les deux logos n'ont pas le même rapport, les
       *  caler sur une boîte commune rendait le texte de la CRCC illisible. */
      displayHeight: 44,
      alt: "Ordre des experts-comptables — Conseil national",
      entity: "CAP CONSEILS",
      label: "Inscrite au tableau de l'Ordre des experts-comptables de La Réunion",
      href: "https://www.experts-comptables.fr",
    },
    {
      slug: "crcc-reunion",
      src: "/ordres/crcc-reunion.png",
      width: 350,
      height: 177,
      displayHeight: 78,
      alt: "Compagnie régionale des commissaires aux comptes de Saint-Denis de La Réunion",
      entity: "FINEXO AUDIT",
      label: "Inscrit à la CRCC de Saint-Denis de La Réunion",
      href: "https://www.cncc.fr",
    },
  ],

  social: {
    linkedin: `https://www.linkedin.com/company/${TODO}`,
  },
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/cabinet", label: "Le cabinet" },
  { href: "/expertises", label: "Expertises" },
  { href: "/facturation-electronique", label: "Facturation 2026" },
  { href: "/actualites", label: "Actualités" },
  { href: "/outils", label: "Outils" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité & cookies" },
] as const;

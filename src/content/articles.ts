/**
 * Articles du cabinet.
 *
 * Le contenu est stocké en TypeScript : typé, versionné, sans base de données
 * ni dépendance CMS. C'est le point d'atterrissage de la veille Inoreader
 * (cf. BRIEF-SITE-VITRINE.md, annexe — la veille alimente le site).
 *
 * Ajouter un article = ajouter un objet ici ; la page et le sitemap suivent.
 * Si le cabinet veut publier sans passer par le code, brancher un CMS Git
 * (Decap, Keystatic) sur ce même schéma.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Réglementaire" | "Outils" | "Gestion" | "Cabinet";
  /** ISO 8601, utilisé pour le tri, le sitemap et les données structurées. */
  date: string;
  readingTime: number;
  featured?: boolean;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "facturation-electronique-ce-qui-change",
    title: "Facturation électronique : ce qui change pour votre entreprise",
    excerpt:
      "La réforme entre en application le 1er septembre 2026. Réception, émission, plateforme agréée : le calendrier et les décisions à prendre maintenant.",
    category: "Réglementaire",
    date: "2026-07-15",
    readingTime: 6,
    featured: true,
    body: [
      {
        type: "p",
        text: "La réforme de la facturation entraînera des changements dans la gestion de votre entreprise à compter du 1er septembre 2026. Toutes les entreprises assujetties à la TVA sont concernées, quelle que soit leur taille.",
      },
      { type: "h2", text: "Deux obligations, deux calendriers" },
      {
        type: "p",
        text: "Il faut distinguer la réception des factures électroniques, qui s'impose à toutes les entreprises dès l'entrée en vigueur, de l'émission, qui est étalée selon la taille de l'entreprise. Autrement dit : même si vous n'êtes pas encore tenu d'émettre au format électronique, vous devez être capable de recevoir.",
      },
      { type: "h2", text: "Ce que cela suppose concrètement" },
      {
        type: "ul",
        items: [
          "Choisir une plateforme de dématérialisation partenaire et l'immatriculer dans votre annuaire.",
          "Fiabiliser vos données clients et fournisseurs : SIREN, adresses de facturation, mentions obligatoires.",
          "Adapter votre outil de facturation aux formats structurés attendus (Factur-X, UBL, CII).",
          "Revoir le circuit interne de validation et d'archivage des factures.",
        ],
      },
      { type: "h2", text: "Le rôle du cabinet" },
      {
        type: "p",
        text: "Nous cartographions vos flux de facturation, identifions les points de friction et paramétrons la chaîne de bout en bout avec vous. L'objectif n'est pas seulement d'être conforme à la date : c'est de sortir de la réforme avec une saisie allégée et une visibilité de trésorerie améliorée.",
      },
      {
        type: "quote",
        text: "Une réforme réglementaire bien anticipée devient un gain d'organisation. Mal anticipée, elle devient une urgence coûteuse en fin de trimestre.",
      },
      {
        type: "p",
        text: "Deux vidéos de présentation sont disponibles sur mafacture-monexpert.fr. Prenez-en connaissance, puis parlons de votre cas.",
      },
    ],
  },
  {
    slug: "pennylane-comptabilite-en-temps-reel",
    title: "Pennylane : votre comptabilité en temps réel, pas au bilan",
    excerpt:
      "Connexions bancaires, collecte automatique des pièces, validation partagée. Ce que change une plateforme comptable connectée dans le quotidien du dirigeant.",
    category: "Outils",
    date: "2026-06-28",
    readingTime: 5,
    featured: true,
    body: [
      {
        type: "p",
        text: "La comptabilité annuelle arrive trop tard pour piloter. Une plateforme connectée comme Pennylane déplace le curseur : les écritures se construisent au fil de l'eau, et les indicateurs sont disponibles quand la décision se prend.",
      },
      { type: "h2", text: "Ce que vous gagnez" },
      {
        type: "ul",
        items: [
          "Vos comptes bancaires sont synchronisés : plus de relevés à transmettre.",
          "Les factures d'achat et de vente arrivent par e-mail, photo ou connecteur.",
          "Vous voyez en continu votre chiffre d'affaires, vos charges et votre trésorerie.",
          "Le cabinet et vous travaillez sur la même donnée, sans allers-retours de fichiers.",
        ],
      },
      { type: "h2", text: "Ce que cela demande" },
      {
        type: "p",
        text: "Une plateforme ne remplace pas une organisation : elle la révèle. La mise en route suppose de fixer qui dépose quoi, à quel moment, et de tenir le rythme. C'est la condition pour que la donnée reste fiable — et c'est là que l'accompagnement du cabinet compte.",
      },
      {
        type: "p",
        text: "Nous prenons en charge le paramétrage, la reprise de l'historique et la formation de vos équipes.",
      },
    ],
  },
  {
    slug: "transmettre-vos-pieces-avant-le-10",
    title: "Pourquoi transmettre vos pièces avant le 10 du mois",
    excerpt:
      "Un rappel simple qui conditionne toute la chaîne : la mise à jour mensuelle de votre comptabilité et le respect des délais déclaratifs.",
    category: "Gestion",
    date: "2026-06-10",
    readingTime: 3,
    body: [
      {
        type: "p",
        text: "Merci de penser à transmettre avant le 10 de chaque mois les documents comptables du mois précédent. Ce n'est pas une contrainte administrative de plus : c'est ce qui permet à notre équipe de mettre à jour mensuellement votre comptabilité et de respecter les délais de transmission de vos déclarations fiscales.",
      },
      { type: "h2", text: "Ce qui se joue derrière la date" },
      {
        type: "ul",
        items: [
          "Une TVA calculée sur des données complètes, sans régularisation ultérieure.",
          "Des indicateurs de gestion utilisables, parce qu'à jour.",
          "Une charge de travail lissée, au lieu d'un pic ingérable en fin d'exercice.",
          "Moins d'allers-retours : les questions se posent tant que vous vous souvenez de l'opération.",
        ],
      },
      {
        type: "p",
        text: "Le dépôt se fait directement dans Pennylane ou dans votre espace SharePoint : glissez-déposez, c'est classé.",
      },
    ],
  },
  {
    slug: "boite-mail-poste-de-pilotage",
    title: "Votre boîte mail comme poste de pilotage",
    excerpt:
      "Tri automatique, résumé, rattachement au bon dossier, brouillon de réponse prêt à valider. Le temps repris sur la messagerie repart vers le conseil.",
    category: "Cabinet",
    date: "2026-05-22",
    readingTime: 4,
    body: [
      {
        type: "p",
        text: "Une boîte de réception qui déborde n'est pas un problème de discipline, c'est un problème d'outillage. Chaque message arrive trié, résumé, rattaché au bon client, avec un brouillon de réponse prêt à valider dans Outlook. Les relances ne s'oublient plus.",
      },
      { type: "h2", text: "Le principe" },
      {
        type: "ul",
        items: [
          "Les règles de tri rattachent chaque message au dossier client concerné.",
          "Les pièces jointes comptables partent vers la GED, sans ressaisie.",
          "Les newsletters sortent de la boîte et rejoignent l'outil de veille.",
          "Un assistant propose une réponse : vous relisez, vous validez.",
        ],
      },
      {
        type: "p",
        text: "C'est la démarche que nous appliquons au cabinet, et que nous savons transposer chez nos clients dont l'organisation repose largement sur la messagerie.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

/**
 * Échéancier fiscal et social.
 *
 * Reprise de la rubrique « Échéancier fiscal et social » de l'ancien site
 * (capconseils.net), dont les données étaient figées sur des dates de 2023.
 * Le parti pris est différent ici : on décrit les **récurrences** plutôt que
 * des dates mortes, pour que la page ne périme pas d'elle-même.
 *
 * ⚠️ Les jours indiqués sont les dates de droit commun. Elles varient selon le
 * régime d'imposition, l'effectif, le département et la date de clôture. La
 * page l'affiche explicitement : elle informe, elle n'engage pas le cabinet.
 */

export type Recurrence = "mensuelle" | "trimestrielle" | "annuelle";

export type Deadline = {
  slug: string;
  /** Jour du mois, ou libellé si l'échéance n'est pas datée au jour près. */
  day: string;
  title: string;
  detail: string;
  /** Qui est concerné — affiché en pastille. */
  scope: string;
  recurrence: Recurrence;
};

/** Rendez-vous qui reviennent tous les mois. */
export const monthly: Deadline[] = [
  {
    slug: "pieces-comptables",
    day: "10",
    title: "Transmission des pièces au cabinet",
    detail:
      "Factures d'achat et de vente, relevés bancaires et justificatifs du mois précédent. C'est ce dépôt régulier qui permet de tenir les délais de déclaration.",
    scope: "Tous les clients",
    recurrence: "mensuelle",
  },
  {
    slug: "dsn",
    day: "5 ou 15",
    title: "Déclaration sociale nominative (DSN)",
    detail:
      "Le 5 pour les employeurs d'au moins 50 salariés en paie décalée, le 15 dans les autres cas. La DSN porte sur la paie du mois précédent.",
    scope: "Employeurs",
    recurrence: "mensuelle",
  },
  {
    slug: "tva-reel-normal",
    day: "15 à 24",
    title: "Déclaration et paiement de la TVA (CA3)",
    detail:
      "Régime réel normal. Le jour exact dépend de la forme juridique et du département du siège ; il est indiqué sur votre espace professionnel impots.gouv.",
    scope: "Réel normal",
    recurrence: "mensuelle",
  },
  {
    slug: "urssaf",
    day: "5 ou 15",
    title: "Cotisations URSSAF",
    detail:
      "Paiement à la même échéance que la DSN. Les employeurs de moins de 11 salariés peuvent opter pour un versement trimestriel.",
    scope: "Employeurs",
    recurrence: "mensuelle",
  },
];

/** Les grands rendez-vous de l'année, dans l'ordre du calendrier. */
export const annual: Deadline[] = [
  {
    slug: "solde-is",
    day: "15 mai",
    title: "Solde de l'impôt sur les sociétés",
    detail:
      "Pour les exercices clos au 31 décembre : dépôt du relevé de solde et paiement, au plus tard le 15 du quatrième mois suivant la clôture.",
    scope: "Sociétés à l'IS",
    recurrence: "annuelle",
  },
  {
    slug: "liasse-fiscale",
    day: "mai",
    title: "Liasse fiscale et déclaration de résultats",
    detail:
      "Deuxième jour ouvré suivant le 1er mai, avec le délai supplémentaire accordé aux téléprocédures. Le cabinet prépare et télétransmet.",
    scope: "Toutes les entreprises",
    recurrence: "annuelle",
  },
  {
    slug: "ir",
    day: "mai – juin",
    title: "Déclaration de revenus",
    detail:
      "Dates échelonnées par zone. La Réunion relève de la troisième zone de dépôt ; les revenus professionnels sont repris de la liasse.",
    scope: "Dirigeants et particuliers",
    recurrence: "annuelle",
  },
  {
    slug: "cvae",
    day: "3 mai / 15 sept.",
    title: "CVAE — déclaration et acomptes",
    detail:
      "Déclaration de valeur ajoutée au printemps, acomptes en juin et septembre au-delà du seuil de cotisation.",
    scope: "CA > 500 k€",
    recurrence: "annuelle",
  },
  {
    slug: "acomptes-is",
    day: "15 mars, juin, sept., déc.",
    title: "Acomptes d'impôt sur les sociétés",
    detail:
      "Quatre acomptes trimestriels calculés sur le résultat du dernier exercice clos, pour les sociétés dont l'IS dépasse 3 000 €.",
    scope: "Sociétés à l'IS",
    recurrence: "trimestrielle",
  },
  {
    slug: "cfe",
    day: "15 décembre",
    title: "Cotisation foncière des entreprises",
    detail:
      "Paiement du solde. L'avis n'est pas envoyé par courrier : il est à consulter dans l'espace professionnel.",
    scope: "Toutes les entreprises",
    recurrence: "annuelle",
  },
  {
    slug: "taxe-apprentissage",
    day: "mai (DSN d'avril)",
    title: "Solde de la taxe d'apprentissage",
    detail:
      "Déclaré via la DSN d'avril, puis affecté aux établissements bénéficiaires sur la plateforme SOLTéA.",
    scope: "Employeurs",
    recurrence: "annuelle",
  },
  {
    slug: "approbation-comptes",
    day: "6 mois après la clôture",
    title: "Approbation et dépôt des comptes annuels",
    detail:
      "Assemblée générale dans les six mois suivant la clôture, dépôt au greffe dans le mois qui suit (deux mois par voie électronique).",
    scope: "Sociétés commerciales",
    recurrence: "annuelle",
  },
];

export const deadlineCount = monthly.length + annual.length;

import { Chart, Cloud, Ledger, Shield, Spark, Users } from "@/components/ui/Icons";

export type Expertise = {
  slug: string;
  icon: typeof Ledger;
  title: string;
  lead: string;
  points: string[];
};

/** Les quatre métiers du cabinet + les deux missions d'accompagnement. */
export const expertises: Expertise[] = [
  {
    slug: "expertise-comptable",
    icon: Ledger,
    title: "Expertise comptable",
    lead: "La production comptable tenue au rythme réel de votre activité, pas au rythme du bilan.",
    points: [
      "Tenue, révision et établissement des comptes annuels",
      "Déclarations fiscales et suivi des échéances",
      "Situations intermédiaires et arrêtés périodiques",
      "Dématérialisation des pièces via Pennylane",
    ],
  },
  {
    slug: "commissariat-aux-comptes",
    icon: Shield,
    title: "Commissariat aux comptes",
    lead: "L'audit légal conduit par FINEXO AUDIT, dans le respect strict des normes d'exercice professionnel.",
    points: [
      "Certification des comptes annuels et consolidés",
      "Missions ponctuelles : apports, fusions, transformations",
      "Audit contractuel et procédures convenues",
      "Rapports spéciaux et interventions définies par la loi",
    ],
  },
  {
    slug: "conseil-et-pilotage",
    icon: Chart,
    title: "Conseil & pilotage",
    lead: "Des chiffres qui servent à décider : tableaux de bord, trajectoire, arbitrages.",
    points: [
      "Tableaux de bord et indicateurs de gestion",
      "Prévisionnel, plan de trésorerie, business plan",
      "Analyse de rentabilité et structure de coûts",
      "Préparation des rendez-vous bancaires et financeurs",
    ],
  },
  {
    slug: "social-et-paie",
    icon: Users,
    title: "Social & paie",
    lead: "La gestion sociale sécurisée, de l'embauche à la sortie.",
    points: [
      "Bulletins de paie et déclarations sociales (DSN)",
      "Contrats de travail et formalités d'embauche",
      "Conseil en droit social courant",
      "Suivi des dispositifs et exonérations propres à l'outre-mer",
    ],
  },
  {
    slug: "creation-et-transmission",
    icon: Spark,
    title: "Création & transmission",
    lead: "Les moments où la structure juridique et fiscale décide de tout.",
    points: [
      "Choix de la forme juridique et du régime fiscal",
      "Constitution, statuts, formalités",
      "Évaluation d'entreprise et accompagnement à la cession",
      "Montages de reprise et pactes d'associés",
    ],
  },
  {
    slug: "transformation-numerique",
    icon: Cloud,
    title: "Transformation numérique",
    lead: "Pennylane, Microsoft 365, GED : les outils du cabinet mis au service de votre organisation.",
    points: [
      "Mise en place et paramétrage de Pennylane",
      "Connexions bancaires et automatisation de la collecte",
      "Classement documentaire et GED SharePoint",
      "Préparation à la facturation électronique 2026",
    ],
  },
  {
    slug: "ia-et-automatisation",
    icon: Spark,
    title: "IA & automatisation",
    lead: "Les outils que nous utilisons au cabinet, déployés chez vous : moins de saisie, moins d'oublis, plus de temps pour décider.",
    points: [
      "Audit de vos tâches répétitives et de leur coût réel",
      "Assistant IA dans votre messagerie : tri, résumé, brouillons de réponse",
      "Automatisation des flux entre vos outils, sans ressaisie",
      "Choix des outils, paramétrage, formation de vos équipes",
    ],
  },
];

/** Le parcours d'un nouveau client, tel qu'affiché sur la page Expertises. */
export const process = [
  {
    step: "01",
    title: "Prise de cap",
    body: "Un premier rendez-vous pour comprendre l'activité, l'organisation actuelle et les échéances qui arrivent. Sans engagement.",
  },
  {
    step: "02",
    title: "Diagnostic & proposition",
    body: "Un état des lieux comptable, fiscal et organisationnel, puis une lettre de mission chiffrée, sans zone grise sur le périmètre.",
  },
  {
    step: "03",
    title: "Mise en route",
    body: "Ouverture de vos accès Pennylane et SharePoint, reprise de l'existant, calage du circuit de transmission des pièces.",
  },
  {
    step: "04",
    title: "Rythme de croisière",
    body: "Production mensuelle, points de suivi réguliers et alertes en amont des échéances. Vos indicateurs restent à jour.",
  },
];

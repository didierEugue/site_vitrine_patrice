# Brief — Site vitrine CAP CONSEILS

> Source : mail Patrice DALLEAU du 31/07/2026 (voir [mail.md](mail.md)), point 2 « La modernisation de mon site internet ».
> Statut : mission réorientée sur 1 mois (le temps d'y voir clair dans Pennylane). Dev de l'application en attente.

---

## 1. Client

| Champ | Valeur |
|---|---|
| Cabinet | **CAP CONSEILS** / **FINEXO AUDIT** |
| Contact | Patrice DALLEAU |
| Métier | Expert-comptable et commissaire aux comptes |
| Site actuel | www.capconseils.net (à moderniser) |
| Implantations | Le Port (siège), Saint-Denis, L'Étang-Salé, Paris — relais Madagascar |
| Baseline (logo) | Stratégie \| Orientation \| Performance |

## 2. Objectif

Refonte / modernisation du site vitrine existant. Référence de style et de contenu imposée par le client :

- https://www.ourama.fr/contenus/beau-site-expert-comptable (article de référence « beau site expert-comptable »)

Positionnement à tenir : cabinet moderne, orienté **conseil** (pas seulement production comptable) — cohérent avec la baseline du logo et avec le reste de la mission (le temps repris sur l'administratif repart vers le conseil).

## 3. Exigence fonctionnelle clé

**Espace client / accès aux outils du cabinet** — le site doit permettre aux clients de se connecter à :

1. **Pennylane** — plateforme comptable du cabinet (dépôt de pièces, suivi compta).
2. **SharePoint** du cabinet — GED / partage de documents.

Points à trancher avec le client (impact fort sur la charge) :

- Simple **lien / bouton « Espace client »** vers les portails Pennylane et SharePoint (solution minimale, recommandée en première itération), ou
- **SSO / portail unifié** avec authentification Microsoft 365 (Entra ID) et redirection contextuelle — plus lourd, dépend des licences et des droits SharePoint.

Prérequis à vérifier : URL du portail client Pennylane, tenant M365 du cabinet, politique d'accès externe SharePoint (partage invités), conformité RGPD sur les données comptables.

## 4. Contenu à prévoir

- Accueil : promesse cabinet, baseline, appels à l'action (prendre rendez-vous, espace client).
- Le cabinet : présentation, équipe, double structure CAP CONSEILS / FINEXO AUDIT, implantations Réunion / Madagascar.
- Missions / services : expertise comptable, commissariat aux comptes, conseil, accompagnement.
- **Actualité / réforme de la facturation électronique** — thème déjà poussé par le cabinet dans sa signature mail :
  - Entrée en vigueur annoncée : **1er septembre 2026**.
  - Ressource référencée : https://mafacture-monexpert.fr/ (deux vidéos).
  - → prévoir une page ou un encart dédié, c'est un sujet d'acquisition évident.
- Rappel process client : **transmission des documents comptables du mois précédent avant le 10 de chaque mois**.
- Blog / veille : le cabinet met en place une veille (Inoreader) destinée à alimenter newsletters, publications LinkedIn **et articles du site**. Le site doit donc avoir un module d'articles alimentable facilement.
- Contact : formulaire, coordonnées, standard téléphonique du cabinet.

## 5. Identité visuelle

Source : [logo.jpg](logo.jpg) (1024×1024, fond crème, logo « boussole / cible » + typo).

Symbolique : boussole = cap, orientation, direction — à réutiliser comme motif graphique (cercles, aiguille, direction).

Palette extraite du logo :

| Rôle | Couleur | Hex approx. |
|---|---|---|
| Primaire | Bleu profond (anneau) | `#1F4E9C` |
| Primaire clair | Cyan (disque central) | `#2EC4F0` |
| Accent | Rouge / bordeaux (aiguille) | `#B3122F` |
| Neutre métal | Argent / gris clair | `#C8CCD1` |
| Fond | Crème / blanc cassé | `#F4F1EA` |
| Texte | Gris ardoise (typo du logo) | `#4A5560` |

Typo du logo : sans-serif géométrique, capitales, graisse moyenne, fort interlettrage sur la baseline. Choisir une sans-serif proche pour les titres (type Montserrat / Poppins / Figtree) et une lecture sobre pour le corps de texte.

Livrables graphiques à demander au client : logo en **vectoriel (SVG/AI/EPS)** et version **fond transparent** — le fichier fourni est un JPG sur fond crème, inutilisable tel quel sur fond blanc ou en header sombre.

## 6. Exigences techniques

- Responsive (mobile first) — le dirigeant consulte aussi sur mobile.
- Performance et SEO local (La Réunion) : cabinet d'expertise comptable, requêtes « expert-comptable Réunion », « facturation électronique 2026 ».
- HTTPS, mentions légales, politique de confidentialité, cookies — obligatoire pour une profession réglementée.
- Mentions ordinales : inscription à l'Ordre des experts-comptables / CNCC à faire figurer.
- Reprise du contenu et des URL de l'ancien site (redirections 301) pour ne pas perdre le référencement.
- CMS ou site statique avec interface d'édition simple : le cabinet veut publier ses propres articles issus de sa veille.

## 6 bis. Informations reçues du client — 07/08/2026

| Élément | Valeur |
|---|---|
| Téléphone | 0262 55 33 12 |
| Siège social | 55, rue Estelle Darsanesing — 97420 Le Port |
| Bureau Saint-Denis | 28, rue La Bourdonnais — 97400 Saint-Denis |
| Bureau L'Étang-Salé | 4, place de la Principauté d'Andorre — 97427 L'Étang-Salé les Bains |
| Bureau Paris | 29, boulevard Poniatowski — 75012 Paris |
| Horaires | Lundi–mardi 8h15–12h15 / 13h30–17h15 · Vendredi 8h15–12h15 |

Demandes complémentaires du même échange :

- **Lien de partage de fichiers** vers SharePoint **et** Pennylane pour les clients →
  confirme l'option « liens vers les portails » (point ouvert n°1, tranché).
- **Nouvelle offre à afficher** : intégration IA / automatisation et outils chez les clients
  (mission Brown / Didier / Joël) → ajoutée comme septième expertise.
- Retour sur le site : « le site est bien ».

> ⚠️ **Deux points à faire préciser avant mise en ligne :**
> 1. **Horaires** — « lundi à mardi » puis « le vendredi » laisse mercredi et jeudi non
>    couverts. Il s'agit vraisemblablement de « lundi à jeudi », à confirmer.
> 2. **URL exactes** du portail client Pennylane et du SharePoint du cabinet.

---

## 7. Points ouverts / à confirmer avec Patrice

1. ~~Périmètre de l'espace client~~ → **tranché** : liens vers les portails (cf. §6 bis).
2. Hébergement et nom de domaine actuels de capconseils.net — accès, registrar, hébergeur.
3. Le site doit-il couvrir **une seule** entité (CAP CONSEILS) ou **les deux** (CAP CONSEILS + FINEXO AUDIT) ?
4. Contenu existant réutilisable ou rédaction à refaire ? Photos de l'équipe et des locaux disponibles ?
5. Logo en vectoriel disponible ?
6. Budget et échéance — la mission est cadrée sur **1 mois**.
7. Le point de suivi est prévu **lundi prochain** (cf. mail).

---

## 8. État de réalisation

Le site est développé dans ce dépôt (Next.js 16 / React 19 / Tailwind v4) — voir
[README.md](README.md) pour la stack, l'arborescence et la liste des éléments à compléter
avant mise en ligne.

Pages livrées : accueil, cabinet, expertises, facturation électronique 2026 (avec FAQ),
actualités + articles, espace client, contact, mentions légales, confidentialité, 404,
sitemap et robots.

Arbitrages pris :

- **Espace client** : option « liens vers les portails » retenue (point ouvert n°1). Le SSO
  Entra ID reste possible mais n'est pas engagé.
- **Logo** : marque redessinée en SVG à partir du JPG, faute de vectoriel (point ouvert n°5).
  À remplacer dès réception du fichier officiel.
- **Édition du contenu** : articles en fichiers TypeScript typés, prêts à être branchés sur un
  CMS Git si le cabinet veut publier sans développeur.

---

## Annexe — Contexte mission globale (hors site)

Le site est l'un des deux chantiers retenus :

1. **Traitement des emails MS 365** — tri d'une boîte de 48 000 mails dont 7 000 non lus, Copilot dans Outlook (tri, résumé, rattachement client, brouillon de réponse), classement des pièces vers la GED, veille métier via Inoreader. Livrables : config M365 + paramétrage Copilot, audit SCORE, formation, RDV de suivi mensuels, chiffrage et pistes de financement Bpifrance.
2. **Modernisation du site internet** ← objet du présent brief.

Recoupement utile : la veille Inoreader (chantier 1) alimente les articles du site (chantier 2). À prévoir dans l'architecture éditoriale.

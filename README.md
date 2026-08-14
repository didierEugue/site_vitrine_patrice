# Site vitrine — CAP CONSEILS / FINEXO AUDIT

Refonte de `capconseils.net`. Cahier des charges : [BRIEF-SITE-VITRINE.md](BRIEF-SITE-VITRINE.md).

**Stack** : Next.js 16.2 (App Router, Turbopack) · React 19.2 · TypeScript · Tailwind CSS v4.
Aucune dépendance runtime hors framework : pas de librairie d'icônes, d'animation ni de CMS.
Les formes animées sont du SVG généré et du SMIL — zéro kilo-octet de librairie graphique.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm run lint
```

## Arborescence

```
src/
  app/                        pages (App Router)
    page.tsx                  accueil
    cabinet/                  le cabinet, les deux entités, implantations
    expertises/               six domaines + parcours client
    facturation-electronique/ landing réforme 2026 (+ FAQ balisée schema.org)
    actualites/               liste + [slug] (pages pré-rendues au build)
    espace-client/            accès Pennylane & SharePoint
    contact/                  formulaire + coordonnées
    mentions-legales/         ⚠️ à compléter
    confidentialite/          ⚠️ à compléter
    api/contact/route.ts      réception du formulaire — ⚠️ envoi à brancher
    sitemap.ts, robots.ts, not-found.tsx
  components/
    liquid/                   formes liquides, cadres, signes (voir plus bas)
    brand/                    marque boussole en SVG + logo
    layout/                   en-tête, pied de page
    sections/                 blocs réutilisés entre pages
    cards/                    cartes expertise & article
    ui/                       Button, Reveal, Section, Marquee, ReadingProgress, Icons
  content/
    site.ts                   coordonnées, navigation, portails — ⚠️ à compléter
    expertises.ts             les six métiers + le parcours en quatre étapes
    articles.ts               les articles (source de la rubrique Actualités)
```

## Le langage visuel

Trois partis pris, pour éviter le site de cabinet interchangeable :

**1. Fond papier.** Le sombre n'est pas un fond par défaut mais un bloc d'accent — il ne
sert qu'à la réforme 2026, au parcours client et au pied de page. Un dégradé sombre à
chaque section, c'est ce qui fait « gabarit ».

**2. Trois voix typographiques.** Instrument Serif pour les titres (l'éditorial),
Inter pour le texte courant, IBM Plex Mono pour les libellés, index et chiffres (le
registre comptable). Le tout-sans-serif est le marqueur du modèle générique.

**3. Formes liquides vectorielles, avec parcimonie.** Reprises de la planche de référence
fournie par le client : blobs à bords nets et dégradés francs. Palette ramenée à celle du
logo — le vert et le magenta de la planche sont écartés.

> **Règle de rareté — à tenir si le site évolue.**
> — Les **cadres géométriques** (losange, cercle, carré, triangle) et les **petits signes**
>   (croix, ondulations, anneaux) n'apparaissent **qu'une fois sur tout le site** : dans le
>   héros d'accueil.
> — **Une seule forme liquide par page** (deux au maximum sur l'accueil et sur Expertises,
>   qui portent aussi le bloc « facturation 2026 »).
> — Partout ailleurs, la hiérarchie est portée par les **filets, les index chiffrés en
>   monospace et les blocs encre**. Répétée à chaque section, la forme cesse d'être un
>   accent et devient un motif de fond.

### Comment les formes fonctionnent

`src/components/liquid/` :

- **`blob.ts`** — génère les tracés. Une forme est un cercle dont chaque point est poussé
  vers l'intérieur ou l'extérieur, relié par une spline fermée. Toutes les variantes d'une
  même famille partagent le nombre de segments : elles sont donc **interpolables**, ce qui
  permet le morphing SVG (`<animate attributeName="d">`) — impossible avec des tracés
  dessinés à la main. Génération déterministe, aucun `Math.random` : le rendu serveur et le
  rendu client produisent le même `d`.
  - Deux réglages comptent : un **nombre de points impair** (avec un nombre pair les bosses
    se font face et la forme retombe sur un carré arrondi) et un **écart de rayons franc**
    (≈ 0,7 → 1,3 ; en deçà, on lit un cercle bosselé, pas une forme liquide).
- **`LiquidShape.tsx`** — la forme animée. SMIL échappe aux règles CSS
  `prefers-reduced-motion`, d'où la lecture de la préférence en JS (`useReducedMotion`).
- **`Marks.tsx`** — cadres filaires (losange, cercle, carré, triangle) et petits signes.
- **`ShapeStack.tsx`** — l'unité visuelle : forme + forme fantôme décalée + cadre + signes.
  Le cadre ne coïncide jamais avec le contour : c'est le décalage qui crée la tension.

Trois familles de formes (`bold`, `pebble`, `drop`) et six dégradés (`azur`, `profond`,
`aiguille`, `glace`, `nuit`, `cuivre`).

### Autres composants de rythme

`Marquee` (bandeau défilant, pause au survol), `ExpertiseList` (sommaire dont les lignes
basculent en encre au survol), `ReadingProgress` (filet de lecture des articles),
`Reveal` (révélation au scroll, avec filet de sécurité si l'observateur ne se déclenche pas).

## Contenu

Textes, expertises et articles sont en TypeScript typé, pas en base de données.
Ajouter un article = ajouter un objet dans `src/content/articles.ts` ; la liste, la page
détaillée et le sitemap suivent automatiquement.

Si le cabinet veut publier sans passer par le code, brancher un CMS Git (Decap, Keystatic)
sur ce même schéma — c'est la raison pour laquelle le corps des articles est structuré en
blocs (`p`, `h2`, `ul`, `quote`) plutôt qu'en HTML libre.

## Accessibilité & performance

- Contenu entièrement rendu côté serveur ; le JavaScript ne sert qu'aux animations.
- Les blocs à révélation restent visibles sans JS (`<noscript>` dans le layout) et disposent
  d'un filet de sécurité de 2,5 s si l'`IntersectionObserver` ne se déclenche pas.
- `prefers-reduced-motion` coupe toutes les animations décoratives.
- Lien d'évitement, navigation au clavier, `aria-current` sur l'onglet actif, focus visible.
- Polices auto-hébergées via `next/font` : aucune requête vers un domaine tiers.

## Sécurité

`next.config.ts` pose HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` et une CSP
stricte (`default-src 'self'`, aucun script tiers autorisé). `unsafe-eval` n'est ajouté qu'en
développement, pour le rechargement à chaud.

Le formulaire de contact est protégé par un piège à robots et une limitation par IP.

---

## ⚠️ À faire avant la mise en ligne

| # | Point | Fichier |
|---|---|---|
| 1 | Coordonnées réelles : adresse, téléphone, e-mail, horaires | `src/content/site.ts` |
| 2 | URL exactes des portails Pennylane et SharePoint | `src/content/site.ts` |
| 3 | Brancher l'envoi du formulaire (Microsoft Graph via le tenant M365 du cabinet, ou service transactionnel) | `src/app/api/contact/route.ts` |
| 4 | Mentions légales : forme juridique, RCS, TVA, hébergeur, numéros d'inscription Ordre / CNCC, RC pro | `src/app/mentions-legales/page.tsx` |
| 5 | Politique de confidentialité : DPO le cas échéant | `src/app/confidentialite/page.tsx` |
| 6 | Redirections 301 depuis les URL réellement indexées de l'ancien site (Search Console / logs) | `next.config.ts` |
| 7 | Logo vectoriel officiel — la marque actuelle est une reconstitution SVG du JPG fourni | `src/components/brand/CompassMark.tsx` |
| 8 | Photos de l'équipe et des locaux si le cabinet en fournit | — |

### Décision en attente : périmètre de l'espace client

Le brief (§3) laisse deux options. **L'implémentation actuelle retient la plus simple** :
des liens sortants vers Pennylane et SharePoint, sans authentification portée par le site.

L'option SSO (Entra ID, redirection contextuelle) reste ouverte mais suppose des arbitrages
côté licences M365 et droits SharePoint. À trancher avec le client avant tout développement
supplémentaire.

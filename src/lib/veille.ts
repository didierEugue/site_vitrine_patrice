/**
 * Veille réglementaire — flux Service Public Entreprendre.
 *
 * Source retenue après vérification des alternatives : les flux RSS du Groupe
 * Revue Fiduciaire, qu'utilisait l'ancien site, répondent toujours mais sont
 * figés depuis juin 2025 ; trois des six sont en 404. Service Public publie en
 * continu, fournit un résumé par entrée, et autorise la reprise à condition de
 * citer la source — d'où `VEILLE_SOURCE` ci-dessous, à afficher sous la liste.
 *
 * Pas de dépendance d'analyse XML : le flux est simple et bien formé, et le
 * projet n'a aucune dépendance applicative. Les quelques fonctions ci-dessous
 * suffisent et restent lisibles.
 */

import secours from "@/content/veille-secours.json";
import { parseFeed, type VeilleItem } from "./veille-parse";

export type { VeilleItem };
export { formatVeilleDate } from "./veille-parse";

const FEED_URL = "https://www.service-public.gouv.fr/abonnements/rss/actu-actu-pro.rss";

/** Une heure : le flux déclare `ttl` 60, inutile d'interroger plus souvent. */
const REVALIDATE_SECONDS = 3600;

/**
 * Plafond de patience. Sans lui, un `fetch` vers un domaine injoignable — build
 * sans accès réseau, flux en panne — bloque le rendu indéfiniment au lieu
 * d'échouer proprement.
 *
 * Vingt secondes, et non cinq : mesuré sur ce flux, le temps de réponse oscille
 * entre 7 et 30 secondes pour 211 ko. Ce n'est pas le réseau — legifrance.gouv.fr
 * répond en une seconde depuis la même machine. À cinq secondes, la rubrique
 * échouait à presque chaque rendu et disparaissait de la page.
 *
 * Le coût de cette attente ne tombe pas sur le visiteur : la page est rendue
 * statiquement et revalidée en arrière-plan une fois par heure.
 */
const TIMEOUT_MS = 20000;

export const VEILLE_SOURCE = {
  label: "service-public.gouv.fr",
  href: "https://entreprendre.service-public.gouv.fr/",
} as const;

/**
 * Une lecture du flux. `null` signale un échec, à distinguer d'un flux
 * légitimement vide.
 */
async function readFeed(): Promise<VeilleItem[] | null> {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/rss+xml, application/xml;q=0.9" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      console.warn(`[veille] flux indisponible : HTTP ${response.status}`);
      return null;
    }

    return parseFeed(await response.text());
  } catch (error) {
    console.warn("[veille] lecture du flux impossible", error);
    return null;
  }
}

/**
 * Renvoie les entrées les plus récentes.
 *
 * Deux tentatives, puis repli sur l'instantané versionné. Ce n'est pas de la
 * prudence de principe : mesuré depuis le poste de développement, ce flux ne
 * répond qu'environ une fois sur trois — il coupe la connexion en cours de
 * transfert, ou ne répond pas du tout. Les 211 ko de XML qu'il sert y sont pour
 * beaucoup.
 *
 * Sans repli, la rubrique apparaîtrait et disparaîtrait de la page au gré des
 * revalidations horaires. Un cabinet ne peut pas afficher une rubrique qui
 * clignote. L'instantané garantit un contenu stable ; il est daté et rafraîchi
 * par `scripts/veille-snapshot.mjs`.
 */
export async function fetchVeille(limit = 6): Promise<VeilleItem[]> {
  const live = (await readFeed()) ?? (await readFeed());

  if (live && live.length > 0) {
    return live.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
  }

  console.warn("[veille] repli sur l'instantané versionné");
  return [...secours.items]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

/** Date de la dernière capture réussie, pour l'affichage en mode repli. */
export function veilleSnapshotDate() {
  return secours.fetchedAt;
}

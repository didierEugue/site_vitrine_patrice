/**
 * Analyse du flux RSS Service Public Entreprendre — partie pure.
 *
 * Isolée de `veille.ts` pour que `scripts/veille-snapshot.mjs` puisse la
 * réutiliser sans entraîner le reste : la lecture réseau, le cache Next et
 * l'instantané de secours. Un instantané produit par un second parseur finirait
 * par diverger de ce que le site affiche en direct.
 *
 * Aucun import : le script la charge directement via le typage effaçable de Node.
 */

export type VeilleItem = {
  /** `guid` du flux, ou le lien à défaut. */
  id: string;
  title: string;
  summary: string;
  url: string;
  /** ISO 8601, tel que fourni par `dc:date`. */
  date: string;
};

/** Entités rencontrées dans ce flux. La table reste volontairement courte. */
const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  laquo: "«",
  raquo: "»",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  hellip: "…",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ccedil: "ç",
  deg: "°",
  euro: "€",
  ndash: "–",
  mdash: "—",
};

function decodeEntities(input: string) {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, code: string) => {
    if (code.startsWith("#")) {
      const value = code.startsWith("#x") || code.startsWith("#X")
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(value) ? String.fromCodePoint(value) : whole;
    }
    return ENTITIES[code] ?? whole;
  });
}

/**
 * Les résumés arrivent en HTML échappé (`&lt;p&gt;`). On décode une première
 * fois pour obtenir les balises, on les retire, puis on décode ce qui reste.
 */
function toPlainText(raw: string) {
  const html = decodeEntities(raw);

  // Les balises de bloc séparent deux phrases : elles valent une espace.
  // Les balises en ligne, elles, coupent un mot — `3<sup>e</sup>` doit donner
  // « 3e », pas « 3 e ». Les retirer sans rien insérer est la seule façon de
  // garder les ordinaux et les exposants lisibles.
  const spaced = html.replace(/<\/?(?:p|div|br|li|ul|ol|tr|td|h[1-6])\b[^>]*>/gi, " ");
  const stripped = spaced.replace(/<[^>]*>/g, "");

  return decodeEntities(stripped).replace(/\s+/g, " ").trim();
}

function firstTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return match ? match[1] : "";
}

export function parseFeed(xml: string): VeilleItem[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/g) ?? [];

  return blocks.flatMap((block) => {
    const url = decodeEntities(firstTag(block, "link")).trim();
    const title = toPlainText(firstTag(block, "title"));
    if (!url || !title) return [];

    return [
      {
        id: decodeEntities(firstTag(block, "guid")).trim() || url,
        title,
        summary: toPlainText(firstTag(block, "description")),
        url,
        date: firstTag(block, "dc:date").trim() || firstTag(block, "pubDate").trim(),
      },
    ];
  });
}

export function formatVeilleDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(date);
}

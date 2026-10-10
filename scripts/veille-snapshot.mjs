/**
 * Rafraîchit l'instantané de secours de la veille réglementaire.
 *
 * Le flux Service Public Entreprendre est lent et coupe souvent la connexion :
 * environ une lecture sur trois aboutit. Le site le lit en direct, mais se
 * replie sur cet instantané quand la lecture échoue, pour que la rubrique ne
 * clignote pas d'une revalidation à l'autre.
 *
 * Usage : node scripts/veille-snapshot.mjs
 * À relancer de temps en temps, et avant une mise en ligne.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FEED_URL = "https://www.service-public.gouv.fr/abonnements/rss/actu-actu-pro.rss";
const KEEP = 12;
const ATTEMPTS = 8;
const TIMEOUT_MS = 28000;

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "content", "veille-secours.json");

async function tryOnce() {
  const response = await fetch(FEED_URL, {
    headers: { Accept: "application/rss+xml, application/xml;q=0.9" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

let xml = null;
for (let i = 1; i <= ATTEMPTS && !xml; i++) {
  try {
    xml = await tryOnce();
    console.log(`lecture réussie à l'essai ${i} (${xml.length} octets)`);
  } catch (error) {
    console.log(`essai ${i} : ${error.name ?? error.message}`);
  }
}

if (!xml) {
  console.error(`aucune lecture aboutie en ${ATTEMPTS} essais — instantané inchangé`);
  process.exit(1);
}

// Réutilise le parseur du site plutôt que d'en écrire un second : un instantané
// produit autrement que la lecture en direct finirait par diverger d'elle.
// Node sait charger le .ts directement, le module n'ayant que du typage effaçable.
const { parseFeed } = await import(
  join(dirname(fileURLToPath(import.meta.url)), "..", "src", "lib", "veille-parse.ts")
);
const items = parseFeed(xml)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, KEEP);

if (items.length === 0) {
  console.error("flux lu mais aucune entrée exploitable — instantané inchangé");
  process.exit(1);
}

writeFileSync(
  OUT,
  JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), items }, null, 2) + "\n",
  "utf8",
);
console.log(`${items.length} entrées écrites dans ${OUT}`);
console.log(`la plus récente : ${items[0].date.slice(0, 10)} — ${items[0].title}`);

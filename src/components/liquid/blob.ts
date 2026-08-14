/**
 * Générateur de formes liquides.
 *
 * Une forme est un cercle dont chaque point de contrôle est poussé vers
 * l'intérieur ou l'extérieur, puis relié par une spline fermée. Comme toutes
 * les variantes d'une même forme partagent le nombre de segments et l'ordre
 * des commandes, elles sont interpolables : c'est ce qui permet le morphing
 * SVG (`<animate attributeName="d">`), impossible avec des tracés dessinés à
 * la main.
 *
 * Tout est déterministe — aucun Math.random : le rendu serveur et le rendu
 * client doivent produire exactement le même `d`.
 */

type Point = { x: number; y: number };

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Trace une courbe fermée passant par tous les points (spline cardinale
 * convertie en cubiques de Bézier).
 */
function closedSpline(points: Point[], tension = 0.28): string {
  const n = points.length;
  const at = (i: number) => points[(i + n) % n];
  let d = `M${round(points[0].x)},${round(points[0].y)}`;

  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);

    const c1 = { x: p1.x + (p2.x - p0.x) * tension, y: p1.y + (p2.y - p0.y) * tension };
    const c2 = { x: p2.x - (p3.x - p1.x) * tension, y: p2.y - (p3.y - p1.y) * tension };

    d += `C${round(c1.x)},${round(c1.y)} ${round(c2.x)},${round(c2.y)} ${round(p2.x)},${round(p2.y)}`;
  }

  return `${d}Z`;
}

/**
 * `radii` : un facteur de rayon par point, dans le sens horaire.
 * Sa longueur définit le nombre de segments — identique pour toutes les
 * variantes d'une même forme, sous peine de morphing impossible.
 */
export function blobPath(radii: number[], size = 100, spin = 0): string {
  const c = size / 2;
  const base = size * 0.44;
  const step = (Math.PI * 2) / radii.length;

  const points = radii.map((factor, i) => {
    const angle = i * step + spin;
    return { x: c + Math.cos(angle) * base * factor, y: c + Math.sin(angle) * base * factor };
  });

  return closedSpline(points);
}

/**
 * Jeux de rayons : chaque famille propose trois états qui s'enchaînent.
 *
 * Le nombre de points est impair : avec un nombre pair, les bosses se font
 * face deux à deux et la forme retombe sur une silhouette de carré arrondi.
 * L'écart entre rayons est franc (≈ 0,7 → 1,3) — au-delà de 0,85–1,15, la
 * forme ne se lit plus comme liquide mais comme un cercle bosselé.
 *
 * Deux leviers distinguent les familles, et le second compte plus que le
 * premier :
 *
 * 1. Le **nombre de points** : 5 donnent de grands pans presque droits, 11 un
 *    contour finement ondulé.
 * 2. La **distribution** des rayons. Alterner strictement long/court produit
 *    une étoile, quel que soit le nombre de points — c'est ce qui rendait
 *    `galet` (9 points) et `ourlet` (11 points) impossibles à distinguer.
 *    Grouper les rayons longs d'un même côté produit au contraire une masse
 *    pleine et penchée. Chaque famille tient donc un seul de ces deux
 *    registres.
 *
 * Faire tourner un même jeu de rayons (`spin`) ne suffit pas : l'œil
 * reconnaît la silhouette d'une page à l'autre. Une famille par page, donc,
 * et le `spin` seulement en variation secondaire.
 */
export const BLOB_STATES: Record<string, number[][]> = {
  // Grande masse pleine, pour les héros.
  bold: [
    [1.28, 0.82, 1.12, 0.74, 1.22, 0.88, 1.04],
    [0.86, 1.26, 0.78, 1.18, 0.92, 1.3, 0.8],
    [1.14, 0.94, 1.3, 0.8, 1.06, 0.76, 1.24],
  ],
  // Plus resserrée, pour les vignettes et les médaillons.
  pebble: [
    [1.18, 0.86, 1.24, 0.8, 1.1, 0.9, 1.2],
    [0.88, 1.22, 0.84, 1.16, 0.9, 1.26, 0.82],
    [1.24, 0.9, 1.06, 0.88, 1.28, 0.8, 1.12],
  ],
  // Franchement étirée : sert de tache d'accent derrière un bloc.
  drop: [
    [1.42, 0.74, 1.16, 0.8, 1.34, 0.7, 1.02],
    [1.1, 0.82, 1.44, 0.7, 1.06, 0.86, 1.3],
    [1.3, 0.72, 1.02, 0.88, 1.4, 0.76, 1.14],
  ],

  // 5 points : peu de sommets, donc de grands pans presque droits et des
  // angles francs. La plus « minérale » du jeu.
  crete: [
    [1.36, 0.74, 1.18, 0.7, 1.26],
    [0.76, 1.32, 0.72, 1.28, 0.8],
    [1.2, 0.78, 1.38, 0.76, 1.04],
  ],

  // 5 points, deux rayons longs voisins contre trois courts : la masse part
  // franchement en biais. L'écart doit rester brutal — resserré, la spline
  // lisse tout et la lame redevient un galet.
  lame: [
    [1.5, 1.3, 0.62, 0.58, 0.9],
    [1.34, 1.48, 0.6, 0.62, 0.76],
    [1.16, 1.4, 0.58, 0.7, 1.02],
  ],

  // 9 points groupés : les rayons décroissent puis remontent une seule fois.
  // Masse charnue et penchée, sans pointe.
  galet: [
    [1.22, 1.18, 1.06, 0.88, 0.82, 0.86, 0.94, 1.1, 1.16],
    [1.1, 1.24, 1.16, 0.94, 0.8, 0.84, 0.9, 1.02, 1.2],
    [1.16, 1.08, 1.2, 0.86, 0.88, 0.8, 1.0, 1.18, 1.1],
  ],

  // 9 points en alternance franche : le registre inverse de `galet`, quatre
  // pointes molles et autant de creux profonds.
  onde: [
    [1.34, 1.1, 0.7, 1.18, 0.74, 1.3, 0.72, 1.14, 0.88],
    [1.12, 1.32, 0.72, 1.06, 0.7, 1.22, 0.78, 1.3, 0.8],
    [1.26, 1.18, 0.76, 1.3, 0.72, 1.08, 0.7, 1.2, 0.94],
  ],

  // 11 points groupés en deux montées : un contour ourlé de longues
  // inflexions. L'amplitude doit rester franche — resserrée sous 0,9–1,1, les
  // onze points se rejoignent et la forme redevient un cercle.
  ourlet: [
    [1.26, 1.18, 1.02, 0.86, 0.8, 0.9, 1.1, 1.2, 0.94, 0.82, 1.06],
    [1.1, 1.24, 1.16, 0.9, 0.78, 0.84, 0.96, 1.14, 1.22, 0.88, 0.86],
    [1.2, 1.04, 1.22, 0.82, 0.88, 0.8, 1.06, 1.18, 1.1, 0.9, 0.98],
  ],

  // 7 points, rayons longs groupés d'un seul côté : une voile gonflée.
  voile: [
    [1.44, 1.2, 0.72, 0.68, 0.76, 1.0, 1.3],
    [1.3, 1.38, 0.7, 0.74, 0.7, 1.16, 1.14],
    [1.18, 1.34, 0.78, 0.7, 0.8, 1.26, 1.02],
  ],
};

export type BlobFamily = keyof typeof BLOB_STATES;

/** Les trois `d` d'une famille, plus le retour au premier état. */
export function blobCycle(family: BlobFamily, size = 100, spin = 0): string[] {
  const states = BLOB_STATES[family].map((r) => blobPath(r, size, spin));
  return [...states, states[0]];
}

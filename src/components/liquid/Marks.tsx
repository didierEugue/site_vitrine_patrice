import type { SVGProps } from "react";

/**
 * Petits signes qui accompagnent les formes liquides. Repris du vocabulaire
 * graphique de la planche de référence, mais réduits à un trait fin et à une
 * seule couleur : le cabinet reste sobre.
 *
 * Les cadres filaires (losange, carré, cercle, triangle) qui doublaient les
 * formes ont été retirés : la géométrie parasitait le liquide et lui donnait
 * un contour net qu'il n'est pas censé avoir.
 */

type P = SVGProps<SVGSVGElement>;

export const Cross = (p: P) => (
  <svg viewBox="0 0 12 12" aria-hidden {...p}>
    <path
      d="M2 2l8 8M10 2l-8 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export const Squiggle = (p: P) => (
  <svg viewBox="0 0 34 12" aria-hidden {...p}>
    <path
      d="M1 6c2.5-5 5.5-5 8 0s5.5 5 8 0 5.5-5 8 0 5.5 5 8 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export const Ring = (p: P) => (
  <svg viewBox="0 0 12 12" aria-hidden {...p}>
    <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Dot = (p: P) => (
  <svg viewBox="0 0 12 12" aria-hidden {...p}>
    <circle cx="6" cy="6" r="3.2" fill="currentColor" />
  </svg>
);

export const Tri = (p: P) => (
  <svg viewBox="0 0 12 12" aria-hidden {...p}>
    <path d="M6 1.5 11 10.5H1Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Sq = (p: P) => (
  <svg viewBox="0 0 12 12" aria-hidden {...p}>
    <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

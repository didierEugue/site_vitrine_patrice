import type { SVGProps } from "react";

/**
 * Cadres filaires et petits signes qui accompagnent les formes liquides.
 * Repris du vocabulaire graphique de la planche de référence, mais réduits à
 * un trait fin et à une seule couleur : le cabinet reste sobre.
 */

type P = SVGProps<SVGSVGElement>;

/** Cadre géométrique en fil. Se superpose à une forme liquide. */
export function Frame({
  shape = "diamond",
  className = "",
}: {
  shape?: "diamond" | "square" | "circle" | "triangle";
  className?: string;
}) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1 } as const;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden preserveAspectRatio="none">
      {shape === "diamond" ? <path d="M50 2 98 50 50 98 2 50Z" {...stroke} /> : null}
      {shape === "square" ? <rect x="2" y="2" width="96" height="96" {...stroke} /> : null}
      {shape === "circle" ? <circle cx="50" cy="50" r="48" {...stroke} /> : null}
      {shape === "triangle" ? <path d="M50 3 97 96H3Z" {...stroke} /> : null}
    </svg>
  );
}

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

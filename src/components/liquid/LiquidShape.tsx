"use client";

import { useId } from "react";

import { blobCycle, type BlobFamily } from "./blob";
import useReducedMotion from "./useReducedMotion";

/**
 * Les dégradés des formes. Tirés du logo : bleu profond, cyan, rouge aiguille.
 * Le vert et le magenta de la planche de référence sont écartés — un cabinet
 * d'expertise comptable ne peut pas ressembler à une marque de boisson.
 */
export const SHAPE_GRADIENTS = {
  azur: ["#2ec4f0", "#1f4e9c"],
  profond: ["#2a63be", "#0f2145"],
  aiguille: ["#e04a63", "#a30f2b"],
  glace: ["#9ee8fb", "#2a63be"],
  nuit: ["#1a3f7d", "#060f21"],
  cuivre: ["#ff8a5b", "#c81f3c"],
} as const;

export type ShapeTone = keyof typeof SHAPE_GRADIENTS;

export default function LiquidShape({
  family = "bold",
  tone = "azur",
  spin = 0,
  duration = 18,
  className = "",
  opacity = 1,
  /** Contour seul, sans remplissage : la variante « filaire ». */
  outline = false,
}: {
  family?: BlobFamily;
  tone?: ShapeTone;
  /** Rotation du jeu de rayons, en radians : évite les formes jumelles. */
  spin?: number;
  duration?: number;
  className?: string;
  opacity?: number;
  outline?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const cycle = blobCycle(family, 100, spin);
  const [from, to] = SHAPE_GRADIENTS[tone];

  // Le morphing SMIL échappe aux règles CSS : on retire l'animation nous-mêmes.
  const animate = !useReducedMotion();

  return (
    // `overflow visible` : le tracé sort de la boîte 0–100 — le rayon monte à
    // 1,44 × 44 depuis un centre à 50, soit 113 — et les cubiques débordent
    // encore au-delà. Sans cela le navigateur rogne au bord du viewBox et la
    // forme se termine par un bord droit net, en plein vide. Le débordement
    // est ensuite arrêté par la section qui l'accueille, sur une limite qui,
    // elle, fait partie de la mise en page.
    //
    // Le style inline l'emporterait sur les utilitaires `opacity-*` du parent :
    // on ne l'écrit que si un réglage a été demandé.
    <svg
      viewBox="0 0 100 100"
      overflow="visible"
      className={`overflow-visible ${className}`}
      aria-hidden
      style={opacity === 1 ? undefined : { opacity }}
    >
      <defs>
        <linearGradient id={id} x1="12" y1="8" x2="88" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>

      <path
        d={cycle[0]}
        fill={outline ? "none" : `url(#${id})`}
        stroke={outline ? `url(#${id})` : "none"}
        strokeWidth={outline ? 0.9 : 0}
      >
        {animate ? (
          <animate
            attributeName="d"
            dur={`${duration}s`}
            values={cycle.join(";")}
            calcMode="spline"
            keyTimes="0;0.33;0.66;1"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            repeatCount="indefinite"
          />
        ) : null}
      </path>
    </svg>
  );
}

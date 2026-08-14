import type { ReactNode } from "react";

import LiquidShape, { type ShapeTone } from "./LiquidShape";
import { Cross, Dot, Ring, Sq, Squiggle, Tri } from "./Marks";
import type { BlobFamily } from "./blob";

/**
 * L'unité visuelle du site : une forme liquide, des petits signes, et
 * éventuellement un contenu centré.
 *
 * Pas de cadre filaire : le losange qui doublait la forme faisait ressortir
 * une géométrie parasite et enfermait le liquide dans un contour net.
 */
export default function ShapeStack({
  family = "bold",
  tone = "azur",
  spin = 0,
  duration = 18,
  marks = true,
  className = "",
  children,
}: {
  family?: BlobFamily;
  tone?: ShapeTone;
  spin?: number;
  duration?: number;
  marks?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative isolate aspect-square ${className}`}>
      {/* Forme secondaire, décalée : c'est elle qui donne l'épaisseur. */}
      <LiquidShape
        family="drop"
        tone={tone}
        spin={spin + 1.4}
        duration={duration * 1.35}
        opacity={0.28}
        className="absolute inset-[-6%] h-[112%] w-[112%]"
      />

      <LiquidShape
        family={family}
        tone={tone}
        spin={spin}
        duration={duration}
        className="absolute inset-0 h-full w-full"
      />

      {marks ? (
        <div className="text-ink-900/40 pointer-events-none absolute inset-0">
          <Cross className="absolute top-[6%] right-[14%] h-3 w-3" />
          <Ring className="absolute top-[26%] -left-[3%] h-3 w-3" />
          <Squiggle className="absolute bottom-[16%] -right-[4%] h-3 w-8" />
          <Dot className="absolute bottom-[4%] left-[22%] h-2 w-2" />
          <Tri className="absolute top-[2%] left-[36%] h-3 w-3" />
          <Sq className="absolute right-[4%] bottom-[34%] h-2.5 w-2.5" />
        </div>
      ) : null}

      {children ? (
        <div className="absolute inset-0 grid place-items-center p-[18%] text-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}

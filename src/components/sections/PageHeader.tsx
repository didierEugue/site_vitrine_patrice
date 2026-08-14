import type { ReactNode } from "react";

import LiquidShape, { type ShapeTone } from "@/components/liquid/LiquidShape";
import type { BlobFamily } from "@/components/liquid/blob";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";

/**
 * En-tête des pages intérieures.
 *
 * Une seule forme liquide, sans cadre géométrique ni petits signes : ce
 * vocabulaire est réservé au héros d'accueil. Répété sur huit pages, il
 * deviendrait un motif de fond et perdrait tout effet.
 *
 * `family` n'a pas de valeur par défaut : chaque page doit choisir la sienne.
 * Une valeur par défaut ramènerait la silhouette unique qu'on cherche
 * justement à éviter.
 */
export default function PageHeader({
  index,
  eyebrow,
  title,
  lead,
  family,
  tone = "azur",
  spin = 0,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Silhouette de la forme liquide — distincte d'une page à l'autre. */
  family: BlobFamily;
  tone?: ShapeTone;
  spin?: number;
  children?: ReactNode;
}) {
  return (
    <header className="grid-paper border-paper-200 relative overflow-hidden border-b">
      <Container className="relative pt-[calc(var(--header-h)+4.5rem)] pb-16 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            <h1 className="mt-7 text-[clamp(2.6rem,6.4vw,4.8rem)]">{title}</h1>
            {lead ? (
              <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-slate-600">{lead}</p>
            ) : null}
            {children}
          </Reveal>

          <Reveal delay={140} className="lg:col-span-3 lg:col-start-10">
            <LiquidShape
              family={family}
              tone={tone}
              spin={spin}
              duration={20}
              className="animate-float mx-auto aspect-square w-[45%] lg:w-full"
            />
          </Reveal>
        </div>
      </Container>
    </header>
  );
}

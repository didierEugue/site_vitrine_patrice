"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Révélation à l'entrée dans le viewport.
 *
 * L'état initial est posé en CSS (`[data-reveal]`), l'observateur se contente
 * de basculer l'attribut : aucun flash de contenu non stylé, et le contenu
 * reste lisible sans JS puisqu'un `<noscript>` global le remet à plat.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  id,
  children,
}: {
  as?: ElementType;
  /** Décalage en ms, pour cascader une grille. */
  delay?: number;
  className?: string;
  /** Ancre : utile quand le bloc révélé est aussi une cible de lien. */
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.dataset.reveal = "shown";
    };

    // Déjà visible au montage (contenu au-dessus de la ligne de flottaison,
    // arrivée directe sur une ancre) : on affiche sans attendre l'observateur.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    io.observe(el);

    // Filet de sécurité : si l'observateur ne se déclenche jamais (navigateur
    // exotique, onglet restauré, capture automatisée), le contenu reste lisible.
    const failsafe = window.setTimeout(show, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

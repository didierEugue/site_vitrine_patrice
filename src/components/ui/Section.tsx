import type { ReactNode } from "react";

import Reveal from "./Reveal";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`mx-auto w-full max-w-[88rem] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Numéro de section + libellé, façon sommaire de rapport. */
export function Eyebrow({
  index,
  tone = "ink",
  className = "",
  children,
}: {
  index?: string;
  tone?: "ink" | "light";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`label inline-flex items-baseline gap-3 ${
        tone === "light" ? "text-aqua-300" : "text-brand-600"
      } ${className}`}
    >
      {index ? <span className="numeric opacity-55">{index}</span> : null}
      <span className="inline-flex items-center gap-2">
        <span className="bg-current inline-block h-px w-6 translate-y-[-0.2em]" />
        {children}
      </span>
    </span>
  );
}

/**
 * En-tête de section. Le titre est volontairement large et le chapeau décalé
 * à droite : la symétrie centrée est le réflexe de gabarit.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  tone = "ink",
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "ink" | "light";
  className?: string;
}) {
  const light = tone === "light";

  return (
    <Reveal className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        {eyebrow ? (
          <Eyebrow index={index} tone={tone}>
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2
          className={`mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] ${
            light ? "text-paper-50" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      </div>

      {lead ? (
        <p
          className={`text-[0.98rem] leading-relaxed lg:col-span-4 lg:col-start-9 ${
            light ? "text-paper-200/75" : "text-slate-600"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

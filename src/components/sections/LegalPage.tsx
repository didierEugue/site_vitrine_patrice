import type { ReactNode } from "react";

import PageHeader from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Section";

export type LegalSection = { title: string; body: ReactNode };

/** Gabarit commun aux pages légales : sommaire ancré + corps de texte. */
export default function LegalPage({
  eyebrow,
  title,
  lead,
  updatedAt,
  sections,
  draft = false,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updatedAt: string;
  sections: LegalSection[];
  /** Affiche l'avertissement « informations à compléter avant mise en ligne ». */
  draft?: boolean;
}) {
  const anchor = (t: string) =>
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} tone="nuit" spin={1.8} />

      <section className="bg-paper-50 py-16 sm:py-20">
        <Container>
          {draft ? (
            <div className="border-signal-500/30 bg-signal-500/5 mb-12 flex gap-4 rounded-sm border p-6">
              <span className="numeric text-signal-500 shrink-0 text-xs">!</span>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong className="text-ink-900 font-medium">Document à compléter.</strong> Les
                mentions marquées « à compléter » doivent être renseignées par le cabinet
                (immatriculations, hébergeur, numéros d&apos;inscription) avant la mise en ligne.
              </p>
            </div>
          ) : null}

          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            <nav aria-label="Sommaire" className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-slate-400 label">Sommaire</p>
              <ul className="mt-4 space-y-2.5">
                {sections.map((s) => (
                  <li key={s.title}>
                    <a
                      href={`#${anchor(s.title)}`}
                      className="text-slate-600 hover:text-brand-600 text-sm transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-slate-400 border-paper-200 mt-8 border-t pt-6 text-xs">
                Dernière mise à jour : {updatedAt}
              </p>
            </nav>

            <div className="max-w-2xl">
              {sections.map((s) => (
                <section key={s.title} id={anchor(s.title)} className="scroll-mt-32 pb-10">
                  <h2 className="text-ink-900 text-xl">{s.title}</h2>
                  <div className="text-slate-600 mt-4 space-y-4 text-sm leading-[1.75]">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

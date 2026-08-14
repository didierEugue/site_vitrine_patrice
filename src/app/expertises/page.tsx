import type { Metadata } from "next";

import CtaBlock from "@/components/sections/CtaBlock";
import EInvoiceBlock from "@/components/sections/EInvoiceBlock";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { expertises, process } from "@/content/expertises";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "Expertise comptable, commissariat aux comptes, conseil et pilotage, social et paie, création et transmission, transformation numérique.",
  alternates: { canonical: "/expertises" },
};

export default function ExpertisesPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Expertises"
        family="galet"
        tone="azur"
        spin={0.6}
        title={
          <>
            Ce que nous faisons,
            <br />
            et <span className="accent text-brand-600">jusqu&apos;où</span>.
          </>
        }
        lead="Sept domaines d'intervention. Chaque mission fait l'objet d'une lettre de mission qui en fixe le périmètre, le calendrier et le prix."
      />

      {/* Fiches détaillées, en alternance gauche / droite */}
      <section className="section">
        <Container>
          <div className="space-y-20 sm:space-y-24">
            {expertises.map((item, i) => {
              const Icon = item.icon;
              const flip = i % 2 === 1;

              return (
                <Reveal
                  key={item.slug}
                  id={item.slug}
                  as="article"
                  className="border-paper-200 grid scroll-mt-32 gap-8 border-t pt-10 lg:grid-cols-12"
                >
                  {/* Colonne de repère : chiffre et icône, pas d'illustration. */}
                  <div
                    className={`lg:col-span-3 ${
                      flip ? "lg:order-2 lg:col-start-10" : "lg:col-start-1"
                    }`}
                  >
                    <span className="numeric block text-6xl text-slate-300 sm:text-7xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-brand-600 mt-6 block">
                      <Icon className="h-8 w-8" />
                    </span>
                  </div>

                  <div
                    className={`lg:col-span-8 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-5"}`}
                  >
                    <h2 className="text-[clamp(1.9rem,3.8vw,2.9rem)]">{item.title}</h2>
                    <p className="mt-5 max-w-xl leading-relaxed text-slate-600">{item.lead}</p>

                    <ul className="border-paper-200 mt-8 border-t">
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="border-paper-200 flex items-baseline gap-4 border-b py-3.5 text-sm"
                        >
                          <span className="bg-aqua-500 mt-2.5 h-0.5 w-3.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <EInvoiceBlock />

      {/* Parcours */}
      <section className="section bg-paper-100">
        <Container>
          <SectionHeading
            index="07"
            eyebrow="Le parcours"
            title={
              <>
                De la prise de contact
                <br />
                au <span className="accent text-brand-600">rythme de croisière</span>.
              </>
            }
            lead="Aucune mission ne démarre sans que le périmètre et le prix soient écrits."
          />

          <ol className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 90} className="border-paper-300 border-t pt-7">
                <span className="numeric text-brand-600 text-xs">{s.step}</span>
                <h3 className="mt-4 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBlock
        title={
          <>
            Une question précise
            <br />
            sur <span className="accent">votre situation</span> ?
          </>
        }
        lead="Décrivez-nous votre activité et vos échéances : nous vous dirons quelle mission correspond, et à quel coût."
      />
    </>
  );
}

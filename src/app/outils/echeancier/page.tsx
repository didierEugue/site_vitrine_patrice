import type { Metadata } from "next";

import CtaBlock from "@/components/sections/CtaBlock";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { annual, monthly, type Deadline } from "@/content/echeancier";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Échéancier fiscal et social",
  description:
    "TVA, DSN, URSSAF, acomptes d'IS, liasse fiscale, CFE : les échéances déclaratives du mois et de l'année, et qui est concerné.",
  alternates: { canonical: "/outils/echeancier" },
};

function DeadlineList({ items }: { items: Deadline[] }) {
  return (
    <ul className="border-paper-200 mt-12 border-t">
      {items.map((item, i) => (
        <Reveal as="li" key={item.slug} delay={i * 60} className="border-paper-200 border-b">
          <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 px-4 py-8 sm:px-6">
            <p className="numeric text-brand-600 col-span-12 text-lg sm:col-span-2">{item.day}</p>

            <div className="col-span-12 sm:col-span-6">
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.detail}</p>
            </div>

            <p className="col-span-12 flex sm:col-span-3 sm:col-start-10 sm:justify-end">
              <span className="label border-paper-300 rounded-sm border px-3 py-1.5 text-slate-500">
                {item.scope}
              </span>
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Outils · Échéancier"
        family="dune"
        tone="glace"
        spin={2.6}
        title={
          <>
            Les dates qui
            <br />
            ne <span className="accent text-brand-600">bougent pas</span>.
          </>
        }
        lead="Les rendez-vous déclaratifs qui rythment l'année d'une entreprise. Pour nos clients, le cabinet tient ce calendrier — cette page sert à savoir ce qui arrive."
      />

      <section className="section">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Chaque mois"
            title={
              <>
                Le rythme <span className="accent text-brand-600">mensuel</span>.
              </>
            }
            lead="Quatre rendez-vous récurrents. Le premier conditionne tous les autres : sans les pièces, rien ne peut être déclaré dans les délais."
          />
          <DeadlineList items={monthly} />
        </Container>
      </section>

      <section className="section border-paper-200 border-t">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Dans l'année"
            title={
              <>
                Les grands <span className="accent text-brand-600">rendez-vous</span>.
              </>
            }
            lead="Échéances annuelles et trimestrielles, dans l'ordre du calendrier. Les dates supposent un exercice clos au 31 décembre."
          />
          <DeadlineList items={annual} />
        </Container>
      </section>

      {/* Rappel du process client, cohérent avec le pied de page */}
      <section className="bg-ink-900 text-paper-200 grain relative overflow-hidden">
        <Container className="relative z-10 py-16">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="label text-aqua-300">La seule date qui vous concerne vraiment</p>
              <p className="font-display text-paper-50 mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight">
                Vos pièces comptables avant le {site.monthlyDeadline} de chaque mois.
              </p>
            </div>
            <p className="text-paper-200/65 text-sm leading-relaxed lg:col-span-4 lg:col-start-9">
              Le reste, le cabinet s&apos;en charge : déclarations, télétransmissions, relances.
              Tenir cette date, c&apos;est ce qui permet de tenir toutes les autres.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-paper-200 border-t">
        <Container className="py-14">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <p className="label lg:col-span-3 text-slate-400">Précision</p>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 lg:col-span-7 lg:col-start-5">
              <p>
                Les jours indiqués sont ceux du droit commun. Ils varient selon le régime
                d&apos;imposition, l&apos;effectif, le département du siège et la date de clôture de
                l&apos;exercice. Votre espace professionnel impots.gouv fait foi.
              </p>
              <p>
                Cette page est mise à jour à chaque évolution réglementaire. En cas de doute sur une
                échéance qui vous concerne, appelez le cabinet plutôt que de vous fier à ce tableau.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBlock
        title={
          <>
            Une échéance qui
            <br />
            <span className="accent">approche</span> ?
          </>
        }
        lead="Retard de déclaration, régularisation, changement de régime : mieux vaut en parler avant la date que l'expliquer après."
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import ArticleCard from "@/components/cards/ArticleCard";
import CtaBlock from "@/components/sections/CtaBlock";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { formatDate, sortedArticles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "La veille du cabinet remise en clair : réforme de la facturation électronique, outils comptables, gestion et pilotage.",
  alternates: { canonical: "/actualites" },
};

export default function ArticlesPage() {
  const [lead, ...rest] = sortedArticles;

  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Actualités"
        family="voile"
        tone="glace"
        spin={2.2}
        title={
          <>
            La veille du cabinet,
            <br />
            remise <span className="accent text-brand-600">en clair</span>.
          </>
        }
        lead="Nous suivons l'actualité réglementaire et les outils du métier. Nous publions ici ce qui a un effet concret sur votre entreprise — et ce qu'il faut en faire."
      />

      {/* À la une */}
      <section className="section">
        <Container>
          <Reveal>
            <Link
              href={`/actualites/${lead.slug}`}
              className="group border-paper-200 grid items-center gap-10 border-y py-12 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <span className="bg-signal-500 block h-0.5 w-12" />
                <p className="numeric mt-6 text-5xl text-slate-300">01</p>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                <p className="label text-signal-500">À la une · {lead.category}</p>
                <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.2rem)]">{lead.title}</h2>
                <p className="mt-5 max-w-xl leading-relaxed text-slate-600">{lead.excerpt}</p>
                <p className="label mt-7 text-slate-400">
                  <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  <span className="mx-2">/</span>
                  {lead.readingTime} min
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 90} className="h-full">
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBlock
        title={
          <>
            Un sujet vous concerne
            <br />
            <span className="accent">directement</span> ?
          </>
        }
        lead="Nos publications restent générales. Votre situation, elle, ne l'est pas — parlons-en."
      />
    </>
  );
}

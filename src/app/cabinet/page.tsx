import type { Metadata } from "next";
import Image from "next/image";

import CtaBlock from "@/components/sections/CtaBlock";
import PageHeader from "@/components/sections/PageHeader";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Le cabinet",
  description:
    "CAP CONSEILS et FINEXO AUDIT : deux structures, deux métiers réglementés, une même équipe à La Réunion et à Madagascar.",
  alternates: { canonical: "/cabinet" },
};

const ENTITIES = [
  {
    name: "Cap Conseils",
    role: "Expertise comptable",
    body: "Tenue et révision, comptes annuels, fiscalité, social, conseil et pilotage. La structure qui accompagne votre activité au quotidien.",
    tags: ["Comptabilité", "Fiscalité", "Social & paie", "Conseil"],
  },
  {
    name: "Finexo Audit",
    role: "Commissariat aux comptes",
    body: "L'audit légal, exercé dans une structure distincte comme la déontologie l'impose : une entité auditée ne peut pas être conseillée par son auditeur.",
    tags: ["Audit légal", "Missions ponctuelles", "Rapports spéciaux"],
  },
] as const;

const VALUES = [
  [
    "Dire les choses en clair",
    "Pas de jargon défensif. Si un montage est risqué, nous le disons ; si une échéance est tenable, nous l'écrivons.",
  ],
  [
    "Tenir le rythme mensuel",
    "Une comptabilité à jour chaque mois vaut mieux qu'un bilan parfait douze mois trop tard. Tout notre process est calé là-dessus.",
  ],
  [
    "Outiller plutôt que subir",
    "Pennylane, Microsoft 365, GED : nous testons chez nous avant de déployer chez vous. Ce que nous recommandons, nous l'utilisons.",
  ],
  [
    "Rester joignables",
    "Un interlocuteur identifié par dossier, des points de suivi programmés, et une réponse qui ne se perd pas dans une boîte mail.",
  ],
];

export default function CabinetPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Le cabinet"
        family="crete"
        tone="glace"
        spin={1.1}
        title={
          <>
            Deux métiers
            <br />
            réglementés, une
            <br />
            <span className="accent text-brand-600">même exigence</span>.
          </>
        }
        lead={`${site.legalName} — cabinet d'expertise comptable et de commissariat aux comptes, trois bureaux à La Réunion et un à Paris.`}
      />

      {/* Les deux entités */}
      <section className="section">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Organisation"
            title={
              <>
                Pourquoi <span className="accent">deux entités</span>
              </>
            }
            lead="Ce n'est pas une subtilité administrative : la séparation entre le conseil et l'audit est une règle déontologique, et elle protège la valeur de la certification."
          />

          <div className="mt-16 grid gap-px sm:grid-cols-2">
            {ENTITIES.map((e, i) => (
              <Reveal key={e.name} delay={i * 110} className="h-full">
                <article className="border-paper-300 flex h-full flex-col border-t pt-8">
                  <span className="numeric text-slate-400 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p className="label text-brand-600 mt-8">{e.role}</p>
                  <h3 className="mt-3 text-[clamp(2rem,3.4vw,2.8rem)]">{e.name}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">{e.body}</p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <li
                        key={t}
                        className="label border-paper-300 rounded-sm border px-3 py-1.5 text-[0.6rem] text-slate-500"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Implantations */}
      <section className="bg-ink-900 text-paper-100 grain section relative overflow-hidden">
        <Container className="relative z-10">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="03" tone="light">
                  Implantations
                </Eyebrow>
                <h2 className="text-paper-50 mt-7 text-[clamp(2.2rem,4.6vw,3.4rem)]">
                  Trois bureaux à La Réunion,
                  <br />
                  un à <span className="accent text-aqua-300">Paris</span>.
                </h2>
                <p className="text-paper-200/70 mt-7 max-w-md leading-relaxed">
                  Le Port, Saint-Denis, L&apos;Étang-Salé et Paris : nos équipes travaillent avec les
                  mêmes outils et selon un référentiel documentaire commun. Votre dossier bénéficie
                  ainsi d&apos;une continuité de suivi, quel que soit votre interlocuteur ou le site
                  auquel vous êtes rattaché.
                </p>

                <p className="text-paper-200/70 mt-6 max-w-md leading-relaxed">
                  Le cabinet s&apos;appuie également sur{" "}
                  <strong className="text-paper-50 font-medium">
                    une équipe dédiée basée à Madagascar
                  </strong>
                  , qui intervient dans le traitement documentaire et certaines prestations
                  administratives. Cette organisation nous permet de renforcer notre capacité de
                  production, d&apos;améliorer la réactivité de nos équipes et de proposer à nos
                  clients des services administratifs complémentaires, tout en conservant au sein du
                  cabinet le pilotage, le contrôle et la relation client.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {site.offices.map((o, i) => (
                  <Reveal key={o.slug} delay={i * 90} className="border-t border-white/15 pt-6">
                    <dt className="flex items-baseline justify-between gap-3">
                      <span className="text-paper-50 font-display text-2xl">{o.name}</span>
                      <span className="label text-aqua-300 text-[0.6rem]">{o.role}</span>
                    </dt>
                    <dd className="text-paper-200/65 mt-3 text-sm leading-relaxed">
                      {o.street}
                      <br />
                      {o.postalCode} {o.city}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-paper-100 border-paper-200 border-y">
        <Marquee
          items={[
            "Ordre des experts-comptables",
            "Compagnie régionale des commissaires aux comptes de La Réunion",
            "Le Port",
            "Saint-Denis",
            "L'Étang-Salé",
            "Paris",
          ]}
          separator="·"
        />
      </div>

      {/* Valeurs */}
      <section className="section">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Ce sur quoi nous nous engageons"
            title={
              <>
                Quatre façons
                <br />
                de <span className="accent text-brand-600">travailler</span>.
              </>
            }
          />

          <dl className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {VALUES.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 90} className="rule flex gap-6 pt-7">
                <dt className="numeric text-brand-600 shrink-0 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <dd>
                  <span className="block text-xl">{title}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-slate-600">{body}</span>
                </dd>
              </Reveal>
            ))}
          </dl>

          {/* Mentions ordinales — texte imposé par le cabinet (mail du 23/08/2026) */}
          <Reveal delay={120} className="bg-paper-100 mt-16 max-w-3xl p-8">
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-ink-900 font-medium">Mentions professionnelles.</strong> Cap
              Conseils est inscrite au tableau de l&apos;Ordre des experts-comptables de la Réunion.
              Finexo Audit est inscrite à la Compagnie Régionale des commissaires aux comptes de la
              Réunion. Numéros d&apos;inscription, forme juridique et capital social figurent dans
              les{" "}
              <a href="/mentions-legales" className="text-ink-900 link-underline">
                mentions légales
              </a>
              .
            </p>

            {/* Logos ordinaux fournis par le cabinet (PDF du 24/08/2026) */}
            <ul className="border-paper-300 mt-8 flex flex-wrap items-center gap-x-8 gap-y-6 border-t pt-8">
              {site.accreditations.map((a) => (
                <li key={a.slug} className="flex items-center gap-4">
                  <span className="bg-paper-50 border-paper-200 flex h-16 w-32 items-center justify-center rounded-lg border px-3 py-2">
                    <Image
                      src={a.src}
                      alt={a.alt}
                      width={a.width}
                      height={a.height}
                      className="h-auto max-h-full w-auto max-w-full object-contain"
                    />
                  </span>
                  <span className="max-w-[13rem] text-xs leading-relaxed text-slate-500">
                    <strong className="text-ink-900 font-medium">{a.entity}</strong>
                    <br />
                    {a.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>

      </section>

      <CtaBlock
        title={
          <>
            Un cabinet, ça se choisit
            <br />
            <span className="accent">en se parlant</span>.
          </>
        }
        lead="Le premier rendez-vous sert à ça : comprendre votre activité et vous dire franchement ce que nous pouvons apporter."
      />
    </>
  );
}

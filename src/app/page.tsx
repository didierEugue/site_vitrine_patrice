import Link from "next/link";

import ArticleCard from "@/components/cards/ArticleCard";
import ShapeStack from "@/components/liquid/ShapeStack";
import CtaBlock from "@/components/sections/CtaBlock";
import EInvoiceBlock from "@/components/sections/EInvoiceBlock";
import ExpertiseList from "@/components/sections/ExpertiseList";
import PortalPanels from "@/components/sections/PortalPanels";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { sortedArticles } from "@/content/articles";
import { process } from "@/content/expertises";
import { site } from "@/content/site";

const STATS = [
  { value: "02", label: "structures", detail: "Cap Conseils · Finexo Audit" },
  { value: "04", label: "bureaux", detail: "Le Port · Saint-Denis · L'Étang-Salé · Paris" },
  { value: "J+10", label: "engagement", detail: "comptabilité à jour chaque mois" },
  { value: "100 %", label: "dématérialisé", detail: "Pennylane · SharePoint" },
];

const TICKER = [
  "Expertise comptable",
  "Commissariat aux comptes",
  "Facturation électronique 2026",
  "Pennylane",
  "Conseil & pilotage",
  "IA & automatisation",
  "Social & paie",
  "La Réunion · Paris",
];

export default function HomePage() {
  const featured = sortedArticles.slice(0, 3);

  return (
    <>
      {/* ═════════════════════════════════════ Héro */}
      <section className="grid-paper relative overflow-hidden">
        <Container className="relative pt-[calc(var(--header-h)+4rem)] pb-14 sm:pb-20">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow index="01">Expert-comptable · Commissaire aux comptes</Eyebrow>
              </Reveal>

              <Reveal delay={90}>
                <h1 className="mt-8 text-[clamp(2.9rem,7.4vw,5.6rem)]">
                  Vos chiffres donnent
                  <br />
                  <span className="accent text-brand-600">un cap</span>, pas seulement
                  <br />
                  une déclaration.
                </h1>
              </Reveal>

              <Reveal delay={170}>
                <p className="mt-9 max-w-lg text-[1.04rem] leading-relaxed text-slate-600">
                  {site.legalName}{" "}
                  accompagne les dirigeants à La Réunion et à Paris. Comptabilité tenue au
                  rythme réel de l&apos;activité, audit légal, conseil et automatisation — le temps
                  repris sur l&apos;administratif repart vers la décision.
                </p>
              </Reveal>

              <Reveal delay={250}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Button href="/contact" size="lg">
                    Prendre rendez-vous
                  </Button>
                  <Link
                    href="/espace-client"
                    className="label text-ink-900 link-underline px-3 py-4"
                  >
                    Espace client
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Forme liquide principale */}
            <Reveal delay={320} className="lg:col-span-5">
              <div className="relative mx-auto w-[74%] lg:w-full">
                <ShapeStack tone="azur" className="animate-float" />

                {/* Médaillon flottant */}
                <div className="bg-ink-900 text-paper-50 absolute -bottom-4 -left-2 max-w-[13rem] p-5 sm:-left-6">
                  <p className="label text-aqua-300">Rappel mensuel</p>
                  <p className="font-display mt-2 text-2xl leading-tight">
                    Pièces avant le{" "}
                    <span className="numeric text-aqua-300">{site.monthlyDeadline}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Repères chiffrés */}
        <Container>
          <Reveal>
            <dl className="border-paper-200 grid grid-cols-2 border-t lg:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`border-paper-200 px-5 py-8 sm:px-7 ${
                    i % 2 === 0 ? "border-r" : ""
                  } ${i < 2 ? "border-b lg:border-b-0" : ""} ${i === 2 ? "lg:border-r" : ""} ${
                    i === 1 ? "lg:border-r" : ""
                  }`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="numeric text-ink-900 block text-3xl sm:text-4xl">
                      {s.value}
                    </span>
                    <span className="label text-brand-600 mt-2 block">{s.label}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-slate-500">
                      {s.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* ═════════════════════════════════════ Bandeau défilant */}
      <div className="bg-ink-900 text-paper-100 border-y border-white/10">
        <Marquee items={TICKER} />
      </div>

      {/* ═════════════════════════════════════ Manifeste */}
      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <Eyebrow index="02">Notre position</Eyebrow>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-8 lg:col-start-5">
              <p className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.22]">
                La conformité est le socle, pas la destination. Un cabinet doit produire des comptes
                justes — et surtout{" "}
                <span className="accent text-brand-600">dire ce qu&apos;ils veulent dire</span>.
                Nous tenons la comptabilité au mois, pas à l&apos;exercice, pour que les chiffres
                servent encore quand la décision se prend.
              </p>

              <div className="mt-14 grid gap-10 sm:grid-cols-3">
                {[
                  [
                    "Au rythme du mois",
                    "Une comptabilité à jour chaque mois vaut mieux qu'un bilan parfait douze mois trop tard.",
                  ],
                  [
                    "Outillé, pas subi",
                    "Pennylane, Microsoft 365, GED : nous testons chez nous avant de déployer chez vous.",
                  ],
                  [
                    "Deux métiers séparés",
                    "Expertise comptable et audit légal dans deux structures, comme la déontologie l'impose.",
                  ],
                ].map(([title, body], i) => (
                  <Reveal key={title} delay={i * 90} className="rule pt-6">
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>

      </section>

      {/* ═════════════════════════════════════ Expertises */}
      <section className="section bg-paper-100">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Expertises"
            title={
              <>
                Sept domaines,
                <br />
                une <span className="accent">même équipe</span>.
              </>
            }
            lead="De la tenue courante à l'audit légal, de la paie à l'intégration d'outils d'IA et d'automatisation. Chaque mission est cadrée par une lettre de mission."
          />

          <div className="mt-16">
            <ExpertiseList />
          </div>

          <Reveal delay={120} className="mt-10">
            <Button href="/expertises" variant="solid" size="lg">
              Voir le détail des missions
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* ═════════════════════════════════════ Facturation 2026 */}
      <EInvoiceBlock />

      {/* ═════════════════════════════════════ Espace client */}
      <section className="section">
        <Container>
          <SectionHeading
            index="05"
            eyebrow="Espace client"
            title={
              <>
                Deux portails,
                <br />
                un <span className="accent text-brand-600">seul réflexe</span>.
              </>
            }
            lead="Pennylane pour la comptabilité au quotidien, SharePoint pour vos documents. Vos accès sont nominatifs et personnels."
          />
        </Container>

        <div className="bg-paper-200 border-paper-200 mt-16 border-y">
          <Container className="px-0! sm:px-0!">
            <PortalPanels />
          </Container>
        </div>

        <Container>
          <Reveal delay={120}>
            <p className="mt-8 text-sm text-slate-500">
              Pas encore d&apos;accès ?{" "}
              <Link href="/contact" className="text-ink-900 link-underline">
                Demandez l&apos;ouverture de votre espace
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ═════════════════════════════════════ Parcours */}
      <section className="section bg-ink-900 text-paper-100 grain relative overflow-hidden">
        <Container className="relative z-10">
          <SectionHeading
            index="06"
            eyebrow="Comment ça se passe"
            tone="light"
            title={
              <>
                Quatre étapes,
                <br />
                aucune <span className="accent text-aqua-300">zone grise</span>.
              </>
            }
            lead="Le périmètre, le calendrier et le prix sont posés avant de commencer. Pas de mission qui démarre sur un malentendu."
          />

          <ol className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal
                as="li"
                key={s.step}
                delay={i * 90}
                className="border-t border-white/15 pt-7 sm:pr-8"
              >
                <span className="numeric text-aqua-300 text-xs">{s.step}</span>
                <h3 className="text-paper-50 mt-4 text-2xl">{s.title}</h3>
                <p className="text-paper-200/65 mt-3 text-sm leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>

      </section>

      {/* ═════════════════════════════════════ Actualités */}
      <section className="section">
        <Container>
          <SectionHeading
            index="07"
            eyebrow="Actualités"
            title={
              <>
                La veille du cabinet,
                <br />
                remise <span className="accent text-brand-600">en clair</span>.
              </>
            }
            lead="Réglementaire, outils, gestion : ce qui change et ce qu'il faut en faire."
          />

          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90} className="h-full">
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-14">
            <Button href="/actualites" variant="solid" size="lg">
              Tous les articles
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}

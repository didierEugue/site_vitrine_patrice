import type { Metadata } from "next";

import CtaBlock from "@/components/sections/CtaBlock";
import PageHeader from "@/components/sections/PageHeader";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Facturation électronique 2026",
  description:
    "Réforme de la facturation électronique : ce qui change au 1er septembre 2026, qui est concerné, comment s'y préparer avec CAP CONSEILS.",
  alternates: { canonical: "/facturation-electronique" },
};

const STEPS = [
  {
    title: "Recevoir",
    body: "Toutes les entreprises assujetties à la TVA doivent être en mesure de recevoir une facture au format électronique dès l'entrée en vigueur. Aucune exception de taille.",
  },
  {
    title: "Émettre",
    body: "L'obligation d'émettre est déployée par vagues selon la taille de l'entreprise. Elle suppose un outil capable de produire un format structuré, pas un PDF.",
  },
  {
    title: "Transmettre",
    body: "Les factures transitent par une plateforme de dématérialisation immatriculée. Le choix de cette plateforme engage votre organisation pour plusieurs années.",
  },
  {
    title: "Déclarer",
    body: "Certaines opérations — ventes aux particuliers, opérations internationales — font l'objet d'une transmission de données complémentaire.",
  },
];

const CHECKLIST = [
  "Recenser vos canaux de facturation actuels : logiciel, tableur, papier, plateformes tierces.",
  "Fiabiliser votre base clients et fournisseurs : SIREN, adresses de facturation, mentions obligatoires.",
  "Vérifier que votre outil gère les formats structurés (Factur-X, UBL, CII).",
  "Choisir votre plateforme de dématérialisation et l'immatriculer.",
  "Redéfinir le circuit interne de validation, de paiement et d'archivage.",
  "Former les personnes qui saisissent et valident au quotidien.",
];

const FAQ = [
  {
    q: "Mon entreprise est petite, suis-je vraiment concerné ?",
    a: "Oui. Dès l'entrée en vigueur, toute entreprise assujettie à la TVA doit pouvoir recevoir des factures électroniques, quelle que soit sa taille. Seule l'obligation d'émettre est étalée dans le temps.",
  },
  {
    q: "Un PDF envoyé par e-mail suffira-t-il ?",
    a: "Non. Une facture électronique au sens de la réforme est un fichier structuré, lisible par une machine. Un PDF classique ne répond pas à l'obligation ; un Factur-X, qui combine PDF et données structurées, oui.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas prêt à la date ?",
    a: "Vous vous exposez à des sanctions, mais surtout à un blocage opérationnel : vos clients assujettis devront émettre au format électronique, et vos fournisseurs aussi. Une entreprise incapable de recevoir se retrouve hors du circuit.",
  },
  {
    q: "Le cabinet s'en occupe-t-il pour moi ?",
    a: "Nous cartographions vos flux, vous aidons à choisir la plateforme, paramétrons la chaîne et formons vos équipes. La décision reste la vôtre, l'exécution est accompagnée.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EInvoicingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader
        index="01"
        eyebrow="Réforme réglementaire"
        family="lame"
        tone="aiguille"
        spin={1.9}
        title={
          <>
            La facturation
            <br />
            électronique,
            <br />
            <span className="accent text-signal-500">au {site.eInvoicing.date}</span>.
          </>
        }
        lead="La réforme entraînera des changements dans la gestion de votre entreprise. Recevoir, émettre, transmettre : voici ce qui vous attend et l'ordre dans lequel s'y prendre."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg">
            Faire le point sur ma situation
          </Button>
          <Button href={site.eInvoicing.resource} variant="outline" size="lg">
            Vidéos officielles
          </Button>
        </div>
      </PageHeader>

      {/* Les quatre volets */}
      <section className="section">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Ce qui change"
            title={
              <>
                Quatre obligations
                <br />à <span className="accent">distinguer</span>.
              </>
            }
            lead="Les confondre est la première source d'erreur de calendrier."
          />

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 90} className="rule flex gap-6 pt-7">
                <span className="numeric text-signal-500 shrink-0 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Checklist, sur bloc encre */}
      <section className="bg-ink-900 text-paper-100 grain section relative overflow-hidden">
        <Container className="relative z-10">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="03" tone="light">
                  Votre préparation
                </Eyebrow>
                <h2 className="text-paper-50 mt-7 text-[clamp(2.2rem,4.6vw,3.4rem)]">
                  Six chantiers,
                  <br />
                  dans <span className="accent text-ember-400">cet ordre</span>.
                </h2>
                <p className="text-paper-200/70 mt-7 max-w-md leading-relaxed">
                  Commencer par le choix de la plateforme sans avoir fiabilisé sa base clients,
                  c&apos;est refaire le travail deux fois.
                </p>
              </Reveal>
            </div>

            <ol className="border-t border-white/15 lg:col-span-6 lg:col-start-7">
              {CHECKLIST.map((c, i) => (
                <Reveal
                  as="li"
                  key={c}
                  delay={i * 70}
                  className="flex gap-6 border-b border-white/15 py-5"
                >
                  <span className="numeric text-ember-400 shrink-0 pt-0.5 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-paper-200/80 text-sm leading-relaxed">{c}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Questions fréquentes"
            title={
              <>
                Ce qu&apos;on nous
                <br />
                demande <span className="accent text-brand-600">le plus</span>.
              </>
            }
          />

          <div className="mt-14 max-w-3xl">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <details className="group border-paper-200 border-b py-7">
                  <summary className="marker:content-none flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="font-display text-xl leading-snug sm:text-2xl">{f.q}</span>
                    <span className="text-brand-600 mt-1 shrink-0 text-lg transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="border-signal-500/30 bg-signal-500/5 mt-14 max-w-3xl p-7">
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-ink-900 font-medium">
                Le calendrier officiel peut évoluer.
              </strong>{" "}
              Cette page décrit la réforme telle qu&apos;annoncée pour le {site.eInvoicing.date}.
              Nous mettons à jour nos clients dès qu&apos;un texte modifie les échéances — c&apos;est
              l&apos;objet de nos points de suivi.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBlock
        title={
          <>
            Faisons le point
            <br />
            avant <span className="accent">l&apos;échéance</span>.
          </>
        }
        lead="Un diagnostic de vos flux de facturation, puis un plan de mise en conformité chiffré. Mieux vaut maintenant qu'en août 2026."
      />
    </>
  );
}

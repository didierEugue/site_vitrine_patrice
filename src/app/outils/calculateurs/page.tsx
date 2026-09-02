import type { Metadata } from "next";

import Calculators from "@/components/sections/Calculators";
import CtaBlock from "@/components/sections/CtaBlock";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Calculateurs",
  description:
    "Calculez la mensualité d'un emprunt professionnel et l'indemnité légale de rupture (licenciement, rupture conventionnelle, retraite). Calcul immédiat, aucune donnée transmise.",
  alternates: { canonical: "/outils/calculateurs" },
};

export default function CalculatorsPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Outils · Calculateurs"
        family="ecume"
        tone="azur"
        spin={0.9}
        title={
          <>
            Deux calculs,
            <br />
            tout de <span className="accent text-brand-600">suite</span>.
          </>
        }
        lead="Mensualité d'un emprunt et indemnité légale de rupture. Tout est calculé dans votre navigateur : ni le salaire, ni le montant emprunté ne quittent votre poste."
      />

      <section className="section">
        <Container>
          <Reveal>
            <Calculators />
          </Reveal>
        </Container>
      </section>

      {/* Réserve d'usage : la page donne un ordre de grandeur, pas un conseil. */}
      <section className="border-paper-200 border-t">
        <Container className="py-14">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <p className="label lg:col-span-3 text-slate-400">Portée de ces calculs</p>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 lg:col-span-7 lg:col-start-5">
              <p>
                Ces simulateurs appliquent les formules de droit commun. Ils ignorent
                l&apos;assurance emprunteur, les frais de dossier, les garanties, ainsi que les
                barèmes conventionnels souvent plus favorables que le minimum légal.
              </p>
              <p>
                Ils donnent un ordre de grandeur pour préparer une décision. Ils ne constituent ni
                une consultation, ni un engagement du cabinet.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBlock
        title={
          <>
            Le chiffre exact,
            <br />
            sur <span className="accent">vos données</span>.
          </>
        }
        lead="Convention collective, garanties, régime fiscal : c'est là que les montants bougent vraiment. Nous reprenons le calcul avec vous."
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import CtaBlock from "@/components/sections/CtaBlock";
import PageHeader from "@/components/sections/PageHeader";
import { Chart, Clock } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { deadlineCount } from "@/content/echeancier";

export const metadata: Metadata = {
  title: "Outils",
  description:
    "Calculateurs d'échéance d'emprunt et d'indemnité de rupture, échéancier fiscal et social : les repères pratiques du cabinet, en libre accès.",
  alternates: { canonical: "/outils" },
};

const tools = [
  {
    href: "/outils/calculateurs",
    index: "01",
    title: "Calculateurs",
    lead: "Mensualité d'un emprunt, indemnité légale de rupture. Deux calculs qu'on refait sans arrêt, posés une fois pour toutes.",
    meta: "2 calculateurs",
    icon: Chart,
  },
  {
    href: "/outils/echeancier",
    index: "02",
    title: "Échéancier fiscal et social",
    lead: "Les rendez-vous déclaratifs du mois et de l'année, avec ce qu'ils recouvrent et qui est concerné.",
    meta: `${deadlineCount} échéances`,
    icon: Clock,
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Outils"
        family="drop"
        tone="profond"
        spin={1.4}
        title={
          <>
            Des repères,
            <br />
            en <span className="accent text-brand-600">libre accès</span>.
          </>
        }
        lead="Ces outils donnent un ordre de grandeur immédiat. Ils ne remplacent pas l'analyse de votre situation — ils servent à savoir de quoi on parle avant d'en parler."
      />

      <section className="section">
        <Container>
          <ul className="border-paper-200 border-t">
            {tools.map((tool, i) => {
              const Icon = tool.icon;

              return (
                <Reveal
                  as="li"
                  key={tool.href}
                  delay={i * 90}
                  className="border-paper-200 border-b"
                >
                  <Link
                    href={tool.href}
                    className="group hover:bg-ink-900 grid grid-cols-12 items-center gap-x-4 gap-y-3 px-4 py-10 transition-colors duration-500 sm:px-6"
                  >
                    <span className="numeric group-hover:text-aqua-300 col-span-2 text-xs text-slate-400 transition-colors duration-500 sm:col-span-1">
                      {tool.index}
                    </span>

                    <span className="col-span-10 sm:col-span-4">
                      <span className="font-display group-hover:text-paper-50 block text-[clamp(1.5rem,2.6vw,2.1rem)] transition-colors duration-500">
                        {tool.title}
                      </span>
                      <span className="label group-hover:text-aqua-300 mt-2 block text-slate-400 transition-colors duration-500">
                        {tool.meta}
                      </span>
                    </span>

                    <span className="group-hover:text-paper-200/75 col-span-10 col-start-3 text-sm leading-relaxed text-slate-600 transition-colors duration-500 sm:col-span-5 sm:col-start-6">
                      {tool.lead}
                    </span>

                    <span className="col-span-12 flex items-center justify-end sm:col-span-2">
                      <span className="border-paper-200 group-hover:border-aqua-300 group-hover:text-aqua-300 flex h-10 w-10 items-center justify-center rounded-full border text-slate-400 transition-all duration-500 group-hover:translate-x-1">
                        <Icon className="h-4 w-4" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBlock
        title={
          <>
            Un chiffre à <span className="accent">vérifier</span> ?
          </>
        }
        lead="Un ordre de grandeur ne vaut pas une décision. Nous reprenons le calcul sur vos données réelles."
      />
    </>
  );
}

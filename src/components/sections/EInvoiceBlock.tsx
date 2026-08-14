import LiquidShape from "@/components/liquid/LiquidShape";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";
import { site } from "@/content/site";

const POINTS = [
  ["Recevoir", "Obligatoire pour toutes les entreprises assujetties à la TVA, sans exception de taille."],
  ["Émettre", "Déployé par vagues selon la taille. Suppose un format structuré, pas un PDF."],
  ["Transmettre", "Via une plateforme immatriculée, choisie pour plusieurs années."],
];

/**
 * Bloc encre sur la réforme 2026. C'est le seul endroit du site où le rouge
 * de l'aiguille prend toute la place : l'échéance est le sujet d'acquisition
 * prioritaire du cabinet.
 */
export default function EInvoiceBlock() {
  return (
    <section className="bg-ink-900 text-paper-100 grain relative overflow-hidden">
      <LiquidShape
        family="drop"
        tone="aiguille"
        spin={1.2}
        duration={21}
        className="animate-float-slow pointer-events-none absolute -top-[42%] -right-[12%] h-[34rem] w-[34rem] opacity-90"
      />

      <Container className="section relative z-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index="→" tone="light">
                Échéance réglementaire
              </Eyebrow>

              <p className="numeric text-signal-400 mt-8 text-sm">
                {site.eInvoicing.date.toUpperCase()}
              </p>

              <h2 className="text-paper-50 mt-3 text-[clamp(2.2rem,5vw,3.8rem)]">
                La facturation
                <br />
                électronique <span className="accent text-aqua-300">vous concerne</span>.
              </h2>

              <p className="text-paper-200/70 mt-7 max-w-md leading-relaxed">
                Réception obligatoire pour toutes les entreprises, émission par vagues. Nous
                cartographions vos flux, choisissons la plateforme et paramétrons la chaîne avec
                vous — avant que la date ne devienne une urgence.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/facturation-electronique" variant="light" size="lg">
                  Comprendre la réforme
                </Button>
                <Button href={site.eInvoicing.resource} variant="outline" size="lg">
                  Vidéos officielles
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ol className="border-t border-white/12">
              {POINTS.map(([title, body], i) => (
                <Reveal
                  as="li"
                  key={title}
                  delay={i * 90}
                  className="flex gap-6 border-b border-white/12 py-7"
                >
                  <span className="numeric text-signal-400 pt-1 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="text-paper-50 block text-lg font-medium">{title}</span>
                    <span className="text-paper-200/65 mt-2 block text-sm leading-relaxed">
                      {body}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

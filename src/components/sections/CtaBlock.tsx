import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { site } from "@/content/site";

/** Appel à l'action de fin de page, commun à toutes les pages. */
export default function CtaBlock({
  title = (
    <>
      Parlons de <span className="accent">votre cap</span>.
    </>
  ),
  lead = "Un premier échange, sans engagement, pour situer votre organisation actuelle et les échéances qui arrivent.",
}: {
  title?: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="grid-paper border-paper-200 border-t">
      <Container className="section">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="text-[clamp(2.4rem,5.6vw,4.2rem)]">{title}</h2>
            <p className="mt-7 max-w-md leading-relaxed text-slate-600">{lead}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg">
                Prendre rendez-vous
              </Button>
              <a
                href={site.contact.phoneHref}
                className="numeric text-ink-900 link-underline px-2 text-base"
              >
                {site.contact.phone}
              </a>
            </div>
          </Reveal>

          {/* Colonne de droite : coordonnées, pas d'illustration. */}
          <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-paper-300 border-t">
              <div className="border-paper-200 border-b py-5">
                <dt className="label text-slate-400">Écrire</dt>
                <dd className="mt-2 text-sm">
                  <a href={`mailto:${site.contact.email}`} className="text-ink-900 link-underline">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              <div className="border-paper-200 border-b py-5">
                <dt className="label text-slate-400">Horaires</dt>
                <dd className="mt-2 text-sm text-slate-600">{site.hoursShort}</dd>
              </div>
              <div className="py-5">
                <dt className="label text-slate-400">Déjà client</dt>
                <dd className="mt-2 text-sm">
                  <a href="/espace-client" className="text-ink-900 link-underline">
                    Accéder à l&apos;espace client
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

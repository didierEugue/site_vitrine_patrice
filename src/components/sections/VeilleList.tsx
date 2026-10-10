import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { fetchVeille, formatVeilleDate, VEILLE_SOURCE } from "@/lib/veille";

/**
 * Fil réglementaire repris de Service Public Entreprendre.
 *
 * Volontairement distinct des articles du cabinet : titre, date, résumé et
 * lien sortant, sans page de détail. Ce que nous publions sous notre nom et ce
 * que nous relayons ne doivent pas se confondre — d'où la mention de source,
 * exigée par les conditions de reprise du flux, et la flèche sortante sur
 * chaque entrée.
 *
 * Composant serveur : le flux est lu au rendu, jamais par le navigateur. La CSP
 * du site n'a donc pas à s'ouvrir vers un domaine tiers.
 */
export default async function VeilleList() {
  const items = await fetchVeille(6);

  // Flux indisponible : la rubrique disparaît plutôt que d'afficher un vide.
  if (items.length === 0) return null;

  return (
    <section className="section bg-paper-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label text-brand-600">Veille réglementaire</p>
            <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15]">
              Ce que publie
              <br />
              l&apos;<span className="accent text-brand-600">administration</span>.
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-600">
              Les annonces officielles qui touchent les entreprises, relayées telles quelles.
              Nos propres analyses sont au-dessus.
            </p>
          </Reveal>

          <div className="lg:col-span-8 lg:col-start-5">
            <ul className="border-paper-300 border-t">
              {items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(i % 3) * 80}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group border-paper-300 flex gap-6 border-b py-7 transition-colors hover:bg-white/60"
                  >
                    <time
                      dateTime={item.date}
                      className="numeric w-24 shrink-0 pt-1 text-xs text-slate-400"
                    >
                      {formatVeilleDate(item.date)}
                    </time>

                    <div className="min-w-0">
                      <h3 className="group-hover:text-brand-600 text-lg leading-snug transition-colors">
                        {item.title}
                      </h3>
                      {item.summary ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                          {item.summary}
                        </p>
                      ) : null}
                    </div>

                    <span
                      aria-hidden
                      className="text-brand-600 shrink-0 self-start pt-1 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            {/* Mention de source exigée par les conditions de reprise du flux. */}
            <Reveal delay={120}>
              <p className="mt-6 text-xs text-slate-500">
                Source :{" "}
                <a
                  href={VEILLE_SOURCE.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink-900 link-underline"
                >
                  {VEILLE_SOURCE.label}
                </a>{" "}
                — Service Public Entreprendre. Les liens ouvrent le site officiel.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

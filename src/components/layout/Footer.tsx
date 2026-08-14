import Link from "next/link";

import CompassMark from "@/components/brand/CompassMark";
import { Container } from "@/components/ui/Section";
import { expertises } from "@/content/expertises";
import { legalNav, nav, site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-paper-200 grain relative overflow-hidden">
      <Container className="relative z-10 pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <CompassMark idPrefix="footer" className="h-10 w-10" />
              <span className="font-display text-paper-50 text-2xl">Cap Conseils</span>
            </div>

            <p className="font-display accent text-paper-50/90 mt-8 max-w-sm text-2xl leading-tight">
              Le temps repris sur l&apos;administratif repart vers la décision.
            </p>

            <p className="text-paper-200/55 mt-6 max-w-sm text-sm leading-relaxed">
              {site.legalName}. Cabinet d&apos;expertise comptable et de commissariat aux comptes,
              inscrit à l&apos;Ordre des experts-comptables et à la Compagnie nationale des
              commissaires aux comptes.
            </p>
          </div>

          <nav aria-label="Plan du site" className="lg:col-span-2">
            <h2 className="label text-aqua-300">Site</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper-200/65 hover:text-paper-50 link-underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/espace-client"
                  className="text-paper-200/65 hover:text-paper-50 link-underline transition-colors"
                >
                  Espace client
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Expertises" className="lg:col-span-2">
            <h2 className="label text-aqua-300">Expertises</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {expertises.slice(0, 5).map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/expertises#${e.slug}`}
                    className="text-paper-200/65 hover:text-paper-50 link-underline transition-colors"
                  >
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-aqua-300">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="text-paper-200/65">
                {site.contact.address.street}
                <br />
                {site.contact.address.postalCode} {site.contact.address.city}
              </li>
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="numeric text-paper-50 link-underline text-base"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-paper-200/65 hover:text-paper-50 link-underline transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
              {site.hours.map((h) => (
                <li key={h.days} className="text-paper-200/45 text-xs">
                  {h.days} : {h.times.join(" / ")}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rappel repris de la signature mail du cabinet */}
        <div className="mt-16 flex flex-col gap-4 border-y border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-paper-200/70 text-sm">
            Pièces comptables du mois précédent à transmettre{" "}
            <strong className="text-paper-50 font-medium">
              avant le {site.monthlyDeadline} de chaque mois
            </strong>
            .
          </p>
          <Link href="/espace-client" className="label text-aqua-300 hover:text-aqua-400 shrink-0">
            Déposer mes pièces →
          </Link>
        </div>

        <div className="text-paper-200/40 mt-8 flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="numeric">
            © {year} {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper-50 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

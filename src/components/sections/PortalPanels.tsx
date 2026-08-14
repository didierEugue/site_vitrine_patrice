import Reveal from "@/components/ui/Reveal";
import { site } from "@/content/site";

const PORTALS = [
  {
    key: "pennylane",
    name: "Pennylane",
    tag: "Comptabilité & pièces",
    body: "Déposez vos factures, suivez vos comptes bancaires rapprochés, consultez vos indicateurs à jour. C'est ici que passe la production comptable courante.",
    items: ["Dépôt des pièces", "Trésorerie et résultat", "Factures de vente", "Échanges cabinet"],
    href: site.portals.pennylane,
  },
  {
    key: "sharepoint",
    name: "SharePoint",
    tag: "Documents & GED",
    body: "Vos bilans, liasses, rapports d'audit et documents juridiques, classés et accessibles. Le partage est nominatif et tracé.",
    items: ["Bilans et liasses", "Rapports de mission", "Documents juridiques", "Archivage"],
    href: site.portals.sharepoint,
  },
] as const;

/** Les deux portails du cabinet — exigence n°1 du brief (§3). */
export default function PortalPanels() {
  return (
    <div className="grid gap-px md:grid-cols-2">
      {PORTALS.map((p, i) => (
        <Reveal key={p.key} delay={i * 110} className="h-full">
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-paper-50 hover:bg-ink-900 relative flex h-full flex-col overflow-hidden p-8 transition-colors duration-500 sm:p-10"
          >
            <span className="numeric text-slate-400 group-hover:text-aqua-300 text-xs transition-colors duration-500">
              {String(i + 1).padStart(2, "0")}
            </span>

            <p className="label text-brand-600 group-hover:text-aqua-300 mt-10 transition-colors duration-500">
              {p.tag}
            </p>
            <h3 className="group-hover:text-paper-50 mt-3 text-4xl transition-colors duration-500">
              {p.name}
            </h3>
            <p className="group-hover:text-paper-200/70 mt-4 max-w-sm text-sm leading-relaxed text-slate-600 transition-colors duration-500">
              {p.body}
            </p>

            <ul className="border-paper-200 group-hover:border-white/15 mt-8 grid grid-cols-2 gap-y-2 border-t pt-6 transition-colors duration-500">
              {p.items.map((item) => (
                <li
                  key={item}
                  className="label text-slate-400 group-hover:text-paper-200/55 text-[0.6rem] transition-colors duration-500"
                >
                  {item}
                </li>
              ))}
            </ul>

            <span className="label text-ink-900 group-hover:text-aqua-300 mt-auto inline-flex items-center gap-2 pt-8 transition-colors duration-500">
              Se connecter
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

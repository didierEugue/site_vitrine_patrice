import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import { expertises } from "@/content/expertises";

/**
 * Les expertises en lignes de sommaire plutôt qu'en grille de cartes.
 * Au survol, la ligne bascule en encre — pas de forme ajoutée : le mouvement
 * est porté par la lecture.
 */
export default function ExpertiseList({ linked = true }: { linked?: boolean }) {
  return (
    <ul className="border-paper-200 border-t">
      {expertises.map((item, i) => {
        const Icon = item.icon;
        const inner = (
          <>
            <span className="numeric text-slate-400 group-hover:text-aqua-300 col-span-2 text-xs transition-colors duration-500 sm:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="col-span-10 sm:col-span-4">
              <span className="font-display group-hover:text-paper-50 block text-[clamp(1.5rem,2.6vw,2.1rem)] transition-colors duration-500">
                {item.title}
              </span>
            </span>

            <span className="text-slate-600 group-hover:text-paper-200/75 col-span-10 col-start-3 text-sm leading-relaxed transition-colors duration-500 sm:col-span-5 sm:col-start-6">
              {item.lead}
            </span>

            <span className="col-span-12 flex items-center justify-end sm:col-span-2">
              <span className="border-paper-200 text-slate-400 group-hover:border-aqua-300 group-hover:text-aqua-300 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 group-hover:translate-x-1">
                <Icon className="h-4 w-4" />
              </span>
            </span>
          </>
        );

        const rowClass =
          "group relative grid grid-cols-12 items-center gap-x-4 gap-y-3 px-4 py-8 transition-colors duration-500 hover:bg-ink-900 sm:px-6";

        return (
          <Reveal as="li" key={item.slug} delay={i * 60} className="border-paper-200 border-b">
            {linked ? (
              <Link href={`/expertises#${item.slug}`} className={rowClass}>
                {inner}
              </Link>
            ) : (
              <div className={rowClass}>{inner}</div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}

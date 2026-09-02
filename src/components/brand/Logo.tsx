import Link from "next/link";

import CompassMark from "./CompassMark";

/** Marque + nom. Le nom passe en serif : c'est la signature typographique. */
export default function Logo({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="CAP CONSEILS — retour à l'accueil"
    >
      <CompassMark
        idPrefix={light ? "logo-l" : "logo-d"}
        className="h-12 w-12 shrink-0 transition-transform duration-700 group-hover:rotate-180 sm:h-14 sm:w-14"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-2xl whitespace-nowrap sm:text-[1.75rem] ${light ? "text-paper-50" : "text-ink-900"}`}
        >
          Cap Conseils
        </span>
        <span
          className={`label mt-1.5 text-[0.62rem] ${light ? "text-aqua-300/70" : "text-slate-400"}`}
        >
          Stratégie · Orientation · Performance
        </span>
      </span>
    </Link>
  );
}

import Link from "next/link";

import { formatDate, type Article } from "@/content/articles";

/** Un filet coloré par rubrique : le repère visuel tient en 2 pixels. */
const RULE_BY_CATEGORY: Record<Article["category"], string> = {
  Réglementaire: "bg-signal-500",
  Outils: "bg-brand-600",
  Gestion: "bg-aqua-500",
  Cabinet: "bg-ink-900",
};

/**
 * Vignette d'article, sans illustration.
 *
 * Ni photo de banque d'images, ni forme liquide : les formes sont réservées au
 * héros d'accueil. Ici la hiérarchie tient au filet de rubrique, au libellé
 * monospace et au titre serif.
 */
export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col">
      <span className={`block h-0.5 w-10 ${RULE_BY_CATEGORY[article.category]}`} />

      <p className="label mt-5 flex flex-wrap items-center gap-x-3 text-slate-400">
        <span className="text-brand-600">{article.category}</span>
        <span>/</span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span>/</span>
        <span>{article.readingTime} min</span>
      </p>

      <h3 className="mt-4 text-[1.6rem] leading-tight">
        <Link
          href={`/actualites/${article.slug}`}
          className="link-underline before:absolute before:inset-0"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>

      <span className="label text-ink-900 mt-6 inline-flex items-center gap-2">
        Lire
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </article>
  );
}

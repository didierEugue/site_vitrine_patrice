import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/cards/ArticleCard";
import CtaBlock from "@/components/sections/CtaBlock";
import PageHeader from "@/components/sections/PageHeader";
import ReadingProgress from "@/components/ui/ReadingProgress";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { articles, formatDate, getArticle, sortedArticles, type Block } from "@/content/articles";
import type { ShapeTone } from "@/components/liquid/LiquidShape";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

const TONE_BY_CATEGORY: Record<string, ShapeTone> = {
  Réglementaire: "aiguille",
  Outils: "azur",
  Gestion: "glace",
  Cabinet: "profond",
};

/** Pré-rend toutes les fiches au build : pages statiques, servies depuis le CDN. */
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/actualites/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
  };
}

function Blocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-14 mb-5 text-[1.8rem]">
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="border-paper-200 my-8 border-t">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="border-paper-200 flex gap-4 border-b py-3.5 leading-relaxed text-slate-600"
                  >
                    <span className="bg-aqua-500 mt-3 h-0.5 w-3.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="font-display accent border-brand-600 my-12 border-l-2 py-1 pl-7 text-[1.55rem] leading-snug"
              >
                {block.text}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="my-6 leading-[1.8] text-slate-600">
                {block.text}
              </p>
            );
        }
      })}
    </>
  );
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = sortedArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName },
    mainEntityOfPage: `${site.url}/actualites/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <PageHeader
        eyebrow={article.category}
        tone={TONE_BY_CATEGORY[article.category] ?? "azur"}
        spin={article.slug.length * 0.3}
        title={article.title}
        lead={article.excerpt}
      >
        <p className="label mt-8 text-slate-400">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className="mx-3">/</span>
          {article.readingTime} min de lecture
        </p>
      </PageHeader>

      <article className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Colonne latérale collante : repère de lecture */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <p className="label text-slate-400">Rubrique</p>
                <p className="font-display mt-2 text-2xl">{article.category}</p>
                <Link
                  href="/actualites"
                  className="label text-ink-900 link-underline mt-8 inline-block"
                >
                  ← Toutes les actualités
                </Link>
              </div>
            </aside>

            <div className="lg:col-span-7 lg:col-start-5">
              <Blocks body={article.body} />
            </div>
          </div>
        </Container>
      </article>

      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl">À lire aussi</h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90} className="h-full">
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}

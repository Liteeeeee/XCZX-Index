import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { MainLayout } from "@/components/layout/MainLayout";
import { getNewsBySlug, newsItems } from "@/data/site";

export function NewsDetailPage() {
  const { slug } = useParams();
  const article = getNewsBySlug(slug);
  const currentIndex = newsItems.findIndex((item) => item.slug === article.slug);
  const prevArticle = newsItems[currentIndex - 1];
  const nextArticle = newsItems[currentIndex + 1];
  const related = newsItems.filter((item) => item.slug !== article.slug).slice(0, 4);

  return (
    <MainLayout>
      <Seo title={article.title} />
      <PageHero
        eyebrow="News Detail"
        title={article.title}
        description={article.summary}
      />

      <section className="section-space">
        <div className="container grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
          <aside className="space-y-4">
            <div className="rounded-[32px] border border-brand-gold/10 bg-brand-sand/45 p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">Recent News</p>
              <div className="mt-6 space-y-4">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.slug}`}
                    className="block rounded-[24px] border border-brand-gold/10 bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(18,34,25,0.06)]"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-brand-gold/70">{item.date}</p>
                    <p className="mt-3 text-sm leading-7 text-brand-ink">{item.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <Reveal className="rounded-[36px] border border-brand-gold/10 bg-white p-5 shadow-[0_18px_44px_rgba(18,34,25,0.06)] sm:p-8">
            <img src={article.cover} alt={article.title} className="h-[360px] w-full rounded-[28px] object-cover" />
            <div className="mx-auto mt-8 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{article.date}</p>
              <h1 className="mt-5 font-serif-display text-4xl leading-tight text-brand-ink">{article.title}</h1>
              <div className="mt-8 space-y-6 text-base leading-9 text-brand-muted">
                {article.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-4 border-t border-brand-gold/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                {prevArticle ? (
                  <Link to={`/news/${prevArticle.slug}`} className="inline-flex items-center gap-2 text-sm text-brand-forest">
                    <ArrowLeft className="h-4 w-4" />
                    上一篇
                  </Link>
                ) : <span />}
                {nextArticle ? (
                  <Link to={`/news/${nextArticle.slug}`} className="inline-flex items-center gap-2 text-sm text-brand-forest">
                    下一篇
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}

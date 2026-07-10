import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { Skeleton } from "@/components/common/Skeleton";
import { MainLayout } from "@/components/layout/MainLayout";
import { getNewsBySlug, newsItems } from "@/data/site";
import { fetchAllWebsiteArticles, fetchWebsiteArticleDetail, getNewsHref } from "@/data/websiteApi";

const shouldHydrateFromApi = import.meta.env.MODE !== "test";

export function NewsDetailPage() {
  const { slug } = useParams();
  const fallbackArticle = useMemo(() => getNewsBySlug(slug), [slug]);
  const [article, setArticle] = useState(fallbackArticle);
  const [articleList, setArticleList] = useState(newsItems);
  const [isLoading, setIsLoading] = useState(shouldHydrateFromApi);

  useEffect(() => {
    if (!shouldHydrateFromApi) {
      return;
    }

    let disposed = false;
    setIsLoading(true);

    void Promise.all([
      fetchWebsiteArticleDetail(slug),
      fetchAllWebsiteArticles(),
    ]).then(([detail, list]) => {
      if (disposed) {
        return;
      }

      setArticle(detail);
      setArticleList(list);
      setIsLoading(false);
    });

    return () => {
      disposed = true;
    };
  }, [slug]);

  const currentIndex = articleList.findIndex((item) => item.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articleList[currentIndex - 1] : undefined;
  const nextArticle = currentIndex >= 0 ? articleList[currentIndex + 1] : undefined;
  const related = articleList.filter((item) => item.slug !== article.slug).slice(0, 4);

  return (
    <MainLayout>
      <Seo title={isLoading ? "新闻详情" : article.title} />
      <PageHero
        eyebrow="News Detail"
        title={isLoading ? "新闻详情" : article.title}
        description={isLoading ? "正在加载文章内容，请稍候。" : article.summary}
      />

      <section className="section-space">
        <div className="container grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
          <aside className="space-y-4">
            <div className="rounded-[32px] border border-brand-gold/10 bg-brand-sand/45 p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">Recent News</p>
              <div className="mt-6 space-y-4">
                {isLoading
                  ? Array.from({ length: 4 }, (_, index) => (
                      <div
                        key={index}
                        className="rounded-[24px] border border-brand-gold/10 bg-white p-4"
                      >
                        <Skeleton className="h-4 w-24 rounded-full" />
                        <Skeleton className="mt-3 h-5 w-full" />
                        <Skeleton className="mt-2 h-5 w-5/6" />
                      </div>
                    ))
                  : related.map((item) => (
                      <Link
                        key={item.id}
                        to={getNewsHref(item)}
                        className="block rounded-[24px] border border-brand-gold/10 bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(18,34,25,0.06)]"
                      >
                        <p className="text-xs uppercase tracking-[0.24em] text-brand-gold/70">{item.date}</p>
                        <p className="mt-3 text-sm leading-7 text-brand-ink">{item.title}</p>
                      </Link>
                    ))}
              </div>
            </div>
          </aside>

          {isLoading ? (
            <div className="rounded-[36px] border border-brand-gold/10 bg-white p-5 shadow-[0_18px_44px_rgba(18,34,25,0.06)] sm:p-8">
              <Skeleton className="h-[360px] w-full rounded-[28px]" />
              <div className="mx-auto mt-8 max-w-3xl">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="mt-5 h-12 w-4/5 rounded-2xl" />
                <div className="mt-8 space-y-4">
                  {Array.from({ length: 6 }, (_, index) => (
                    <Skeleton key={index} className="h-5 w-full" />
                  ))}
                </div>
                <div className="mt-10 flex flex-col gap-4 border-t border-brand-gold/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[36px] border border-brand-gold/10 bg-white p-5 shadow-[0_18px_44px_rgba(18,34,25,0.06)] sm:p-8">
              <img src={article.cover} alt={article.title} className="h-[360px] w-full rounded-[28px] object-cover" />
              <div className="mx-auto mt-8 max-w-3xl">
                <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{article.date}</p>
                <h1 className="mt-5 font-serif-display text-4xl leading-tight text-brand-ink">{article.title}</h1>
                {article.htmlContent ? (
                  <div
                    className="mt-8 text-base leading-9 text-brand-muted [&_em]:text-brand-ink [&_hr]:my-8 [&_hr]:border-brand-gold/15 [&_img]:mx-auto [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[24px] [&_img]:object-contain [&_p]:my-4 [&_span]:text-inherit [&_strong]:text-brand-ink"
                    dangerouslySetInnerHTML={{ __html: article.htmlContent }}
                  />
                ) : (
                  <div className="mt-8 space-y-6 text-base leading-9 text-brand-muted">
                    {article.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
                <div className="mt-10 flex flex-col gap-4 border-t border-brand-gold/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  {prevArticle ? (
                    <Link to={getNewsHref(prevArticle)} className="inline-flex items-center gap-2 text-sm text-brand-forest">
                      <ArrowLeft className="h-4 w-4" />
                      上一篇
                    </Link>
                  ) : <span />}
                  {nextArticle ? (
                    <Link to={getNewsHref(nextArticle)} className="inline-flex items-center gap-2 text-sm text-brand-forest">
                      下一篇
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

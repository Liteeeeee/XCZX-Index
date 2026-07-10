import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Pagination } from "@/components/common/Pagination";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Skeleton } from "@/components/common/Skeleton";
import { MainLayout } from "@/components/layout/MainLayout";
import { getNewsByPage, totalNewsPages } from "@/data/site";
import { fetchWebsiteArticlesPage, getNewsHref } from "@/data/websiteApi";

const shouldHydrateFromApi = import.meta.env.MODE !== "test";

export function NewsListPage() {
  const { page } = useParams();
  const requestedPage = useMemo(() => Math.max(Number(page ?? 1) || 1, 1), [page]);
  const [pageData, setPageData] = useState(() => {
    if (shouldHydrateFromApi) {
      return {
        currentPage: requestedPage,
        totalPages: 1,
        items: [],
      };
    }

    const currentPage = Math.min(requestedPage, totalNewsPages);
    return {
      currentPage,
      totalPages: totalNewsPages,
      items: getNewsByPage(currentPage),
    };
  });
  const [isLoading, setIsLoading] = useState(shouldHydrateFromApi);

  useEffect(() => {
    if (!shouldHydrateFromApi) {
      return;
    }

    let disposed = false;
    setIsLoading(true);

    void fetchWebsiteArticlesPage(requestedPage).then((result) => {
      if (!disposed) {
        setPageData(result);
        setIsLoading(false);
      }
    });

    return () => {
      disposed = true;
    };
  }, [requestedPage]);

  const [featured, ...restNews] = pageData.items;

  return (
    <MainLayout>
      <Seo title="新闻资讯" />
      <PageHero
        eyebrow="News & Journal"
        title="品牌动态"
        description="记录仙草甄选在中式养生之路上的每一次探索与成长。"
      />

      <section className="section-space">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Story"
            title="最新动态"
            description="每一步都是一次跨越"
          />
          {isLoading ? (
            <div className="mt-12 grid gap-6 overflow-hidden rounded-[36px] border border-brand-gold/10 bg-white p-4 shadow-[0_18px_44px_rgba(18,34,25,0.06)] lg:grid-cols-[0.9fr_1.1fr]">
              <Skeleton className="min-h-[340px] rounded-[28px]" />
              <div className="flex flex-col justify-center gap-4 p-3">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-12 w-4/5 rounded-2xl" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-11/12" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="mt-4 h-10 w-32 rounded-full" />
              </div>
            </div>
          ) : featured ? (
            <Reveal className="mt-12 grid gap-6 overflow-hidden rounded-[36px] border border-brand-gold/10 bg-white p-4 shadow-[0_18px_44px_rgba(18,34,25,0.06)] lg:grid-cols-[0.9fr_1.1fr]">
              <img src={featured.cover} alt={featured.title} className="h-full min-h-[340px] w-full rounded-[28px] object-cover" />
              <div className="flex flex-col justify-center p-3">
                <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{featured.date}</p>
                <h2 className="mt-4 font-serif-display text-4xl leading-tight text-brand-ink">{featured.title}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-brand-muted">{featured.summary}</p>
                <Link to={getNewsHref(featured)} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-forest">
                  了解更多
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="section-space bg-brand-sand/45">
        <div className="container grid gap-6 lg:grid-cols-2">
          {isLoading
            ? Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className="grid gap-5 rounded-[32px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_38px_rgba(18,34,25,0.05)] sm:grid-cols-[220px_1fr]"
                >
                  <Skeleton className="min-h-[220px] rounded-[24px]" />
                  <div className="flex flex-col justify-between gap-6 p-2">
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="h-9 w-4/5 rounded-2xl" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-11/12" />
                      <Skeleton className="h-5 w-3/4" />
                    </div>
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </div>
                </div>
              ))
            : restNews.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={0.05 * index}
                  className="grid gap-5 rounded-[32px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_38px_rgba(18,34,25,0.05)] sm:grid-cols-[220px_1fr]"
                >
                  <img src={item.cover} alt={item.title} className="h-full min-h-[220px] w-full rounded-[24px] object-cover" />
                  <div className="flex flex-col justify-between gap-6 p-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{item.date}</p>
                      <h3 className="mt-4 text-2xl font-medium leading-9 text-brand-ink">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-brand-muted">{item.summary}</p>
                    </div>
                    <Link to={getNewsHref(item)} className="inline-flex items-center gap-2 text-sm font-medium text-brand-forest">
                      阅读详情
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              ))}
        </div>
        <div className="container">
          {isLoading ? (
            <div className="mt-12 flex items-center justify-center gap-3">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-11 w-11 rounded-full" />
              ))}
            </div>
          ) : (
            <Pagination
              currentPage={pageData.currentPage}
              totalPages={pageData.totalPages}
              buildHref={(targetPage) => (targetPage === 1 ? "/news" : `/news/page/${targetPage}`)}
            />
          )}
        </div>
      </section>
    </MainLayout>
  );
}

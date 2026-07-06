import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Pagination } from "@/components/common/Pagination";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Skeleton } from "@/components/common/Skeleton";
import { MainLayout } from "@/components/layout/MainLayout";
import { getProductsByPage, totalProductPages } from "@/data/site";
import { fetchWebsiteProductsPage } from "@/data/websiteApi";

const shouldHydrateFromApi = import.meta.env.MODE !== "test";

export function ProductsPage() {
  const { page } = useParams();
  const requestedPage = useMemo(() => {
    const parsed = Number(page ?? 1);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [page]);
  const [pageData, setPageData] = useState(() => ({
    currentPage: shouldHydrateFromApi ? requestedPage : requestedPage,
    totalPages: shouldHydrateFromApi ? 1 : totalProductPages,
    items: shouldHydrateFromApi ? [] : getProductsByPage(requestedPage),
  }));
  const [isLoading, setIsLoading] = useState(shouldHydrateFromApi);

  useEffect(() => {
    if (!shouldHydrateFromApi) {
      return;
    }

    let disposed = false;
    setIsLoading(true);

    void fetchWebsiteProductsPage(requestedPage).then((result) => {
      if (!disposed) {
        setPageData(result);
        setIsLoading(false);
      }
    });

    return () => {
      disposed = true;
    };
  }, [requestedPage]);

  return (
    <MainLayout>
      <Seo title="产品中心" />
      <PageHero
        eyebrow="Products"
        title="在礼赠、轻饮与节令场景中建立高辨识度产品矩阵"
        description="产品中心页保留复刻站的网格与分页形式，同时加入草本卖点标签、成分气质与更现代的商品表达。"
      />

      <section className="section-space">
        <div className="container">
          <SectionHeading
            eyebrow={`Page 0${pageData.currentPage}`}
            title="仙草甄选产品中心"
            description="当前页面展示品牌核心产品卡片，适合承接详情、社媒传播与招商资料引用。"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[32px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_38px_rgba(18,34,25,0.06)]"
                  >
                    <Skeleton className="h-72 w-full rounded-[24px]" />
                    <div className="px-2 pb-2 pt-6">
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="mt-3 h-8 w-3/4 rounded-2xl" />
                      <Skeleton className="mt-3 h-5 w-full" />
                      <Skeleton className="mt-2 h-5 w-11/12" />
                      <div className="mt-5 flex flex-wrap gap-2">
                        {Array.from({ length: 3 }, (_, tagIndex) => (
                          <Skeleton key={tagIndex} className="h-7 w-16 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              : pageData.items.map((item, index) => (
                  <Reveal
                    key={item.id}
                    delay={0.05 * index}
                    className="group overflow-hidden rounded-[32px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_38px_rgba(18,34,25,0.06)]"
                  >
                    <img src={item.image} alt={item.name} className="h-72 w-full rounded-[24px] object-cover transition duration-500 group-hover:scale-[1.03]" />
                    <div className="px-2 pb-2 pt-6">
                      <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{item.subtitle}</p>
                      <h3 className="mt-3 font-serif-display text-2xl text-brand-ink">{item.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-brand-muted">{item.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-brand-sand px-3 py-1 text-xs text-brand-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
          </div>
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
              buildHref={(targetPage) => (targetPage === 1 ? "/products" : `/products/page/${targetPage}`)}
            />
          )}
        </div>
      </section>
    </MainLayout>
  );
}

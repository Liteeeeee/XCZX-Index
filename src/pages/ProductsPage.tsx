import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Pagination } from "@/components/common/Pagination";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MainLayout } from "@/components/layout/MainLayout";
import { getProductsByPage, totalProductPages } from "@/data/site";

export function ProductsPage() {
  const { page } = useParams();
  const currentPage = useMemo(() => {
    const parsed = Number(page ?? 1);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : Math.min(parsed, totalProductPages);
  }, [page]);

  const items = getProductsByPage(currentPage);

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
            eyebrow={`Page 0${currentPage}`}
            title="仙草甄选产品中心"
            description="当前页面展示品牌核心产品卡片，适合承接详情、社媒传播与招商资料引用。"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalProductPages}
            buildHref={(targetPage) => (targetPage === 1 ? "/products" : `/products/page/${targetPage}`)}
          />
        </div>
      </section>
    </MainLayout>
  );
}

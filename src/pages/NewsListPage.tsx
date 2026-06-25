import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Pagination } from "@/components/common/Pagination";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MainLayout } from "@/components/layout/MainLayout";
import { getNewsByPage, totalNewsPages } from "@/data/site";

export function NewsListPage() {
  const { page } = useParams();
  const currentPage = Math.min(Math.max(Number(page ?? 1) || 1, 1), totalNewsPages);
  const [featured, ...restNews] = getNewsByPage(currentPage);

  return (
    <MainLayout>
      <Seo title="新闻资讯" />
      <PageHero
        eyebrow="News & Journal"
        title="用资讯承接品牌表达、合作传播与内容运营"
        description="新闻资讯页延续复刻站的列表与详情结构，用于展示品牌动态、行业洞察与合作内容。"
      />

      <section className="section-space">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Story"
            title="焦点内容优先承接品牌认知"
            description="列表页顶部保留主推文章区域，通过大图与摘要强化阅读入口。"
          />
          {featured ? (
            <Reveal className="mt-12 grid gap-6 overflow-hidden rounded-[36px] border border-brand-gold/10 bg-white p-4 shadow-[0_18px_44px_rgba(18,34,25,0.06)] lg:grid-cols-[0.9fr_1.1fr]">
              <img src={featured.cover} alt={featured.title} className="h-full min-h-[340px] w-full rounded-[28px] object-cover" />
              <div className="flex flex-col justify-center p-3">
                <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{featured.date}</p>
                <h2 className="mt-4 font-serif-display text-4xl leading-tight text-brand-ink">{featured.title}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-brand-muted">{featured.summary}</p>
                <Link to={`/news/${featured.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-forest">
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
          {restNews.map((item, index) => (
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
                <Link to={`/news/${item.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-brand-forest">
                  阅读详情
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalNewsPages}
            buildHref={(targetPage) => (targetPage === 1 ? "/news" : `/news/page/${targetPage}`)}
          />
        </div>
      </section>
    </MainLayout>
  );
}

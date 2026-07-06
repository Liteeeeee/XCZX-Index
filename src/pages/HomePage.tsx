import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  homeHero,
  homeStats,
  standards,
} from "@/data/site";
import {
  fallbackHomeNews,
  fallbackHomeProducts,
  fetchFeaturedWebsiteArticles,
  fetchFeaturedWebsiteProducts,
  getNewsHref,
} from "@/data/websiteApi";

const shouldHydrateFromApi = import.meta.env.MODE !== "test";

export function HomePage() {
  const [featuredNews, setFeaturedNews] = useState(fallbackHomeNews);
  const [featuredProducts, setFeaturedProducts] = useState(fallbackHomeProducts);

  useEffect(() => {
    if (!shouldHydrateFromApi) {
      return;
    }

    let disposed = false;

    void Promise.all([
      fetchFeaturedWebsiteArticles(),
      fetchFeaturedWebsiteProducts(),
    ]).then(([news, products]) => {
      if (disposed) {
        return;
      }

      if (news.length > 0) {
        setFeaturedNews(news);
      }

      if (products.length > 0) {
        setFeaturedProducts(products);
      }
    });

    return () => {
      disposed = true;
    };
  }, []);

  return (
    <MainLayout>
      <Seo title="首页" />
      <section className="relative overflow-hidden bg-brand-forest pb-20 pt-16 text-brand-paper sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,160,100,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(110,145,104,0.24),transparent_28%)]" />
        <div className="container relative grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal className="space-y-8">
            <div className="inline-flex rounded-full border border-brand-gold/20 bg-brand-paper/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-brand-gold/80">
              {homeHero.eyebrow}
            </div>
            <div className="space-y-6">
              <h1 className="font-serif-display text-5xl leading-tight sm:text-6xl xl:text-7xl">
                {homeHero.title}
              </h1>
              <p className="max-w-xl text-base leading-8 text-brand-paper/72 sm:text-lg">{homeHero.description}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/brand"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-4 text-sm font-medium text-brand-forest transition hover:-translate-y-1"
              >
                {homeHero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/join#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-gold/20 bg-brand-paper/5 px-7 py-4 text-sm text-brand-paper transition hover:border-brand-gold/40 hover:bg-brand-paper/10"
              >
                {homeHero.secondaryCta}
              </Link>
            </div>
            <div className="grid gap-4 pt-6 sm:grid-cols-2 xl:grid-cols-4">
              {homeStats.map((item, index) => (
                <Reveal
                  key={item.label}
                  delay={0.08 * index}
                  className="rounded-[28px] border border-brand-gold/10 bg-brand-paper/5 p-5 backdrop-blur"
                >
                  <p className="font-serif-display text-3xl text-brand-gold">{item.value}</p>
                  <p className="mt-3 text-sm text-brand-paper/72">{item.label}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="absolute -left-8 top-10 hidden h-24 w-24 rounded-full border border-brand-gold/20 lg:block" />
            <div className="absolute -right-4 bottom-10 hidden h-28 w-28 rounded-full bg-brand-gold/15 blur-3xl lg:block" />
            <div className="overflow-hidden rounded-[36px] border border-brand-gold/15 bg-brand-paper/5 p-4 shadow-[0_30px_90px_rgba(11,22,14,0.35)] backdrop-blur">
              <img
                src={homeHero.image}
                alt="仙草甄选品牌主视觉"
                className="h-[520px] w-full rounded-[28px] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            eyebrow="Brand Story"
            title="从东方草本中提炼当代礼赠与轻养的品牌秩序"
            description="仙草甄选不是对传统滋补的简单复述，而是通过原料甄选、产品结构与审美系统，重建更适合今天用户的草本生活方式。"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {standards.map((item, index) => (
              <Reveal
                key={item.id}
                delay={0.06 * index}
                className="rounded-[32px] border border-brand-gold/10 bg-white p-7 shadow-[0_12px_30px_rgba(18,34,25,0.05)]"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/12 text-brand-gold">
                  <Leaf className="h-5 w-5" />
                </div>
                <h3 className="font-serif-display text-2xl text-brand-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-sand/45">
        <div className="container">
          <SectionHeading
            eyebrow="Join Opportunity"
            title="以高端东方草本表达，重构更有成交力的合作场景"
            description="官网延续复刻站的招商结构，但在仙草甄选的品牌语境中，以轻奢、克制、自然的方式呈现合作价值。"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal className="overflow-hidden rounded-[36px] border border-brand-gold/10 bg-brand-forest p-4 text-brand-paper shadow-[0_20px_60px_rgba(18,34,25,0.18)]">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=luxury%20Chinese%20herbal%20retail%20space%2C%20emerald%20green%20walls%2C%20warm%20gold%20shelves%2C%20premium%20gift%20box%20display%2C%20elegant%20interior%20photography%2C%20realistic&image_size=landscape_4_3"
                alt="仙草甄选合作空间"
                className="h-full min-h-[320px] w-full rounded-[28px] object-cover"
              />
            </Reveal>
            <Reveal className="grid gap-5">
              {[
                "以东方草本轻奢美学提升终端陈列辨识度",
                "围绕节令礼赠与企业福利形成高客单场景",
                "官网、内容和渠道视觉形成统一品牌资产",
              ].map((item) => (
                <div key={item} className="rounded-[30px] border border-brand-gold/10 bg-white p-7 shadow-[0_12px_32px_rgba(18,34,25,0.04)]">
                  <div className="flex items-center gap-3 text-brand-gold">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">价值亮点</span>
                  </div>
                  <p className="mt-4 text-lg leading-8 text-brand-ink">{item}</p>
                </div>
              ))}
              <Link
                to="/join"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-forest transition hover:gap-3"
              >
                查看招商方案
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Products"
            title="以礼赠、轻饮与日常轻养三条线建立产品识别"
            description="通过高质感产品卡、成分标签与应用场景描述，让产品页面兼具品牌表达与转化能力。"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <Reveal
                key={product.id}
                delay={0.05 * index}
                className="group overflow-hidden rounded-[32px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_40px_rgba(18,34,25,0.06)]"
              >
                <img src={product.image} alt={product.name} className="h-72 w-full rounded-[24px] object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="px-2 pb-2 pt-6">
                  <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{product.subtitle}</p>
                  <h3 className="mt-3 font-serif-display text-2xl text-brand-ink">{product.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{product.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-brand-sand px-3 py-1 text-xs text-brand-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-brand-gold/15 px-6 py-3 text-sm text-brand-ink transition hover:border-brand-gold/40 hover:bg-brand-gold/10"
            >
              查看全部产品
              <ArrowRight className="h-4 w-4 text-brand-gold" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-sand/45">
        <div className="container">
          <SectionHeading
            eyebrow="Featured News"
            title="用内容建立品牌信任，用资讯承接合作与传播"
            description="新闻与内容模块保留原复刻站的结构逻辑，并替换为更适配仙草甄选品牌语气的叙事内容。"
          />
          {featuredNews[0] ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal className="overflow-hidden rounded-[32px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_40px_rgba(18,34,25,0.06)]">
                <img src={featuredNews[0].cover} alt={featuredNews[0].title} className="h-[320px] w-full rounded-[26px] object-cover" />
                <div className="px-2 pb-2 pt-6">
                  <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">{featuredNews[0].date}</p>
                  <h3 className="mt-4 font-serif-display text-3xl leading-snug text-brand-ink">{featuredNews[0].title}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-muted">{featuredNews[0].summary}</p>
                  <Link to={getNewsHref(featuredNews[0])} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-forest">
                    阅读详情
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              <div className="grid gap-5">
                {featuredNews.slice(1).map((item, index) => (
                  <Reveal
                    key={item.id}
                    delay={0.08 * index}
                    className="grid gap-4 rounded-[30px] border border-brand-gold/10 bg-white p-4 shadow-[0_14px_36px_rgba(18,34,25,0.05)] sm:grid-cols-[180px_1fr]"
                  >
                    <img src={item.cover} alt={item.title} className="h-full min-h-[180px] w-full rounded-[22px] object-cover" />
                    <div className="flex flex-col justify-between gap-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold/75">{item.date}</p>
                        <h3 className="mt-3 text-xl font-medium leading-8 text-brand-ink">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-brand-muted">{item.summary}</p>
                      </div>
                      <Link to={getNewsHref(item)} className="inline-flex items-center gap-2 text-sm font-medium text-brand-forest">
                        继续阅读
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </MainLayout>
  );
}

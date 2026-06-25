import { ShieldCheck, Sparkles, Sprout } from "lucide-react";

import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MainLayout } from "@/components/layout/MainLayout";
import { brandHighlights, brandValues, standards, timeline } from "@/data/site";

const icons = [Sparkles, ShieldCheck, Sprout];

export function BrandPage() {
  return (
    <MainLayout>
      <Seo title="品牌中心" />
      <PageHero
        eyebrow="Brand Center"
        title="让草本品牌拥有更高识别度的当代表达"
        description="仙草甄选以东方本草为精神内核，在产品、内容、礼赠与空间中构建统一的品牌感知。"
      />

      <section className="section-space">
        <div className="container grid gap-6 lg:grid-cols-3">
          {brandValues.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;

            return (
              <Reveal
                key={item.id}
                delay={0.08 * index}
                className="rounded-[32px] border border-brand-gold/10 bg-white p-8 shadow-[0_18px_44px_rgba(18,34,25,0.05)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/12 text-brand-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif-display text-3xl text-brand-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-muted">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-space bg-brand-sand/45">
        <div className="container grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <SectionHeading
            eyebrow="Selection System"
            title="以原料、工艺、体验三重维度建立品牌标准"
            description="品牌中心页承接复刻站中的“企业简介”与“品质背书”功能，但内容表达全面转为仙草甄选的东方草本语言。"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {standards.map((item, index) => (
              <Reveal
                key={item.id}
                delay={0.06 * index}
                className="rounded-[30px] border border-brand-gold/10 bg-white p-7 shadow-[0_12px_32px_rgba(18,34,25,0.05)]"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">标准 {index + 1}</p>
                <h3 className="mt-4 font-serif-display text-2xl text-brand-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <SectionHeading
            eyebrow="Brand Highlights"
            title="用数据与背书强化品牌成长的真实感"
            description="品牌页通过数据卡、合作模块与时间轴展示品牌持续成长的能力，让官网不仅美观，也具有可信度。"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal className="grid gap-5">
              {brandHighlights.map((item, index) => (
                <div key={item.label} className="rounded-[30px] border border-brand-gold/10 bg-brand-forest p-8 text-brand-paper shadow-[0_20px_48px_rgba(18,34,25,0.14)]">
                  <p className="font-serif-display text-5xl text-brand-gold">{item.value}</p>
                  <p className="mt-4 text-sm tracking-[0.05em] text-brand-paper/72">{item.label}</p>
                  {index === 0 ? (
                    <p className="mt-4 text-sm leading-7 text-brand-paper/68">
                      从产品矩阵到内容传播，仙草甄选持续构建更加完整的草本品牌体验。
                    </p>
                  ) : null}
                </div>
              ))}
            </Reveal>

            <Reveal className="overflow-hidden rounded-[36px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_40px_rgba(18,34,25,0.06)]">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=oriental%20herbal%20luxury%20brand%20campaign%2C%20Chinese%20model%20in%20elegant%20green%20fashion%2C%20premium%20wellness%20product%20styling%2C%20editorial%20photography%2C%20realistic&image_size=landscape_16_9"
                alt="仙草甄选品牌氛围图"
                className="h-[420px] w-full rounded-[28px] object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-sand/45">
        <div className="container">
          <SectionHeading
            eyebrow="Timeline"
            title="用清晰的里程碑建立品牌成长叙事"
            description="时间轴保留复刻站中品牌历程的表达方式，但以更现代的模块结构强化阅读节奏。"
          />
          <div className="mt-12 space-y-6">
            {timeline.map((item, index) => (
              <Reveal
                key={item.year}
                delay={0.06 * index}
                className="grid gap-5 rounded-[32px] border border-brand-gold/10 bg-white p-8 shadow-[0_12px_32px_rgba(18,34,25,0.05)] md:grid-cols-[160px_1fr]"
              >
                <div className="font-serif-display text-4xl text-brand-gold">{item.year}</div>
                <div>
                  <h3 className="font-serif-display text-2xl text-brand-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

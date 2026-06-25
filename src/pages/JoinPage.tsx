import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  contactInfo,
  joinAdvantages,
  joinAnchors,
  joinProcess,
  marketStats,
  supportPolicies,
} from "@/data/site";

export function JoinPage() {
  return (
    <MainLayout>
      <Seo title="招商加盟" />
      <PageHero
        eyebrow="Join Us"
        title="建立一套更有品牌感、更有客单价的草本合作模型"
        description="招商加盟页沿用复刻站的强转化结构，通过锚点长页串联投资前景、合作优势、政策支持、流程与联系咨询。"
      />

      <section className="sticky top-20 z-30 border-b border-brand-gold/10 bg-brand-paper/90 backdrop-blur">
        <div className="container overflow-x-auto py-5">
          <div className="flex min-w-max gap-3">
            {joinAnchors.map((anchor) => (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                className="rounded-full border border-brand-gold/15 px-5 py-2 text-sm text-brand-muted transition hover:border-brand-gold/40 hover:bg-brand-gold/10 hover:text-brand-ink"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunity" className="section-space scroll-mt-40">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Market Opportunity"
              title="草本轻养与礼赠场景持续增长，正在形成新的消费窗口"
              description="比起传统滋补表达，仙草甄选更强调高频、轻盈和生活方式感，这使合作渠道拥有更强的内容传播与场景转化能力。"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {marketStats.map((item, index) => (
                <Reveal
                  key={item.label}
                  delay={0.06 * index}
                  className="rounded-[28px] border border-brand-gold/10 bg-white p-6 shadow-[0_14px_34px_rgba(18,34,25,0.05)]"
                >
                  <p className="font-serif-display text-4xl text-brand-gold">{item.value}</p>
                  <p className="mt-4 text-sm leading-7 text-brand-muted">{item.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="overflow-hidden rounded-[36px] border border-brand-gold/10 bg-white p-4 shadow-[0_16px_40px_rgba(18,34,25,0.06)]">
            <img
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Chinese%20premium%20herbal%20gift%20shop%2C%20customers%20viewing%20luxury%20wellness%20products%2C%20emerald%20and%20gold%20retail%20display%2C%20realistic%20photo&image_size=portrait_4_3"
              alt="仙草甄选合作场景"
              className="h-full min-h-[460px] w-full rounded-[28px] object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section id="advantages" className="section-space scroll-mt-40 bg-brand-sand/45">
        <div className="container">
          <SectionHeading
            eyebrow="Advantages"
            title="合作优势来自品牌系统、产品体系与持续运营赋能"
            description="通过统一官网、统一视觉、统一产品表达和统一培训资料，降低合作落地成本。"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {joinAdvantages.map((item, index) => (
              <Reveal
                key={item.id}
                delay={0.06 * index}
                className="rounded-[32px] border border-brand-gold/10 bg-white p-8 shadow-[0_14px_34px_rgba(18,34,25,0.05)]"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">优势 {index + 1}</p>
                <h3 className="mt-4 font-serif-display text-2xl text-brand-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="policy" className="section-space scroll-mt-40">
        <div className="container">
          <SectionHeading
            eyebrow="Support Policy"
            title="通过陈列、内容、活动与运营支持，保障合作效率"
            description="招商政策不强调复杂条款堆叠，而是突出品牌在落地执行中的可协同能力。"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {supportPolicies.map((item, index) => (
              <Reveal
                key={item.id}
                delay={0.06 * index}
                className="rounded-[32px] border border-brand-gold/10 bg-brand-forest p-8 text-brand-paper shadow-[0_18px_40px_rgba(18,34,25,0.14)]"
              >
                <h3 className="font-serif-display text-2xl text-brand-gold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-paper/72">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section-space scroll-mt-40 bg-brand-sand/45">
        <div className="container">
          <SectionHeading
            eyebrow="Join Process"
            title="以清晰流程提升沟通效率与签约体验"
            description="从初步咨询到合作落地，流程模块复刻原站逻辑，但更突出品牌服务感和项目节奏。"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {joinProcess.map((item, index) => (
              <Reveal
                key={item.id}
                delay={0.06 * index}
                className="rounded-[30px] border border-brand-gold/10 bg-white p-6 shadow-[0_12px_30px_rgba(18,34,25,0.05)]"
              >
                <p className="font-serif-display text-4xl text-brand-gold">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-medium text-brand-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-space scroll-mt-40">
        <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            eyebrow="Contact Us"
            title="如果你希望用更高端的草本品牌视觉打开市场，现在就可以开始沟通"
            description="联系咨询区保留原复刻站的强转化目标，支持电话直达、微信承接与线下见面沟通。"
          />
          <Reveal className="rounded-[36px] border border-brand-gold/10 bg-brand-forest p-8 text-brand-paper shadow-[0_24px_60px_rgba(18,34,25,0.18)]">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">招商热线</p>
                <a href={`tel:${contactInfo.hotline.replace(/-/g, "")}`} className="mt-3 block font-serif-display text-4xl">
                  {contactInfo.hotline}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/75">商务微信</p>
                <p className="mt-3 font-serif-display text-3xl">{contactInfo.wechat}</p>
              </div>
            </div>
            <div className="mt-8 border-t border-brand-gold/15 pt-8 text-sm leading-7 text-brand-paper/72">
              <p>商务邮箱：{contactInfo.email}</p>
              <p>办公地址：{contactInfo.address}</p>
            </div>
            <a
              href={`tel:${contactInfo.hotline.replace(/-/g, "")}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-medium text-brand-forest transition hover:-translate-y-1"
            >
              立即电话沟通
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}

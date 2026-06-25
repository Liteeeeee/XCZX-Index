import { ArrowUpRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { contactInfo, navItems } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-gold/10 bg-brand-forest text-brand-paper">
      <div className="container grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold/75">Oriental Herbal Luxury</p>
          <h2 className="font-serif-display text-4xl leading-tight">为东方草本滋养，建立更高级的品牌表达。</h2>
          <p className="max-w-xl text-sm leading-7 text-brand-paper/72">
            仙草甄选聚焦本草轻养、品质礼赠与渠道合作，以当代审美重构东方草本的生活方式价值。
          </p>
          <a
            href={`tel:${contactInfo.hotline.replace(/-/g, "")}`}
            className="inline-flex items-center gap-3 rounded-full border border-brand-gold/20 px-5 py-3 text-sm text-brand-paper transition hover:bg-brand-paper hover:text-brand-forest"
          >
            <Phone className="h-4 w-4" />
            {contactInfo.hotline}
          </a>
        </div>

        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-gold/75">Site Map</p>
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between rounded-2xl border border-brand-gold/10 px-4 py-3 text-sm text-brand-paper/80 transition hover:border-brand-gold/35 hover:bg-brand-paper/5 hover:text-brand-paper"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-brand-gold" />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-gold/75">Contact</p>
          <div className="rounded-[28px] border border-brand-gold/10 bg-brand-paper/5 p-6">
            <div className="space-y-4 text-sm leading-7 text-brand-paper/75">
              <p>微信顾问：{contactInfo.wechat}</p>
              <p>商务邮箱：{contactInfo.email}</p>
              <p>办公地址：{contactInfo.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-gold/10">
        <div className="container flex flex-col gap-3 py-5 text-xs text-brand-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 仙草甄选 XIANGCAO SELECT. All rights reserved.</p>
          <p>本页面为基于复刻 PRD 实现的品牌官网示范站。</p>
        </div>
      </div>
    </footer>
  );
}

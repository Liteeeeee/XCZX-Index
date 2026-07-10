import { ArrowUpRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { BIZ_ADDRESS, BIZ_EMAIL, HOTLINE_DISPLAY, HOTLINE_TEL, ICP_RECORD, WECHAT_ACCOUNT } from "@/config/contact";
import { navItems } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-gold/10 bg-brand-forest text-brand-paper">
      <div className="container grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold/75">Natural Herb Selection</p>
          <h2 className="font-serif-display text-4xl leading-tight">甄选好仙草，健康更放心</h2>
          <p className="max-w-xl text-sm leading-7 text-brand-paper/72">中式养生典范，一站式甄选平台
          </p>
          <a
            href={`tel:${HOTLINE_TEL}`}
            className="inline-flex items-center gap-3 rounded-full border border-brand-gold/20 px-5 py-3 text-sm text-brand-paper transition hover:bg-brand-paper hover:text-brand-forest"
          >
            <Phone className="h-4 w-4" />
            {HOTLINE_DISPLAY}
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
              <p>微信顾问：{WECHAT_ACCOUNT}</p>
              <p>商务邮箱：{BIZ_EMAIL}</p>
              <p>办公地址：{BIZ_ADDRESS}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-gold/10">
        <div className="container flex flex-col gap-3 py-5 text-xs text-brand-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 仙草甄选 XIANGCAO SELECT. All rights reserved.</p>
          <div className="flex flex-col gap-2 sm:items-end">
            {ICP_RECORD ? (
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-brand-paper"
              >
                {ICP_RECORD}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

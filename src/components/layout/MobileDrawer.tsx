import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { contactInfo, navItems } from "@/data/site";
import { useUiStore } from "@/store/useUiStore";

export function MobileDrawer() {
  const location = useLocation();
  const { isDrawerOpen, closeDrawer } = useUiStore();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isDrawerOpen}
    >
      <div
        className={`absolute inset-0 bg-brand-ink/50 backdrop-blur-sm transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeDrawer}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-brand-paper px-6 py-8 shadow-2xl transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-serif-display text-2xl text-brand-ink">仙草甄选</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-brand-gold/70">HERBAL SELECT</p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-full border border-brand-gold/20 p-3 text-brand-ink transition hover:border-brand-gold/40 hover:bg-brand-gold/10"
            aria-label="关闭菜单"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeDrawer}
                className={`block rounded-3xl px-4 py-4 transition ${active ? "bg-brand-forest text-brand-paper" : "bg-brand-paper text-brand-ink hover:bg-brand-gold/10"}`}
              >
                <p className="font-medium">{item.label}</p>
                <p className={`mt-1 text-xs uppercase tracking-[0.28em] ${active ? "text-brand-paper/60" : "text-brand-gold/70"}`}>
                  {item.enLabel}
                </p>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 rounded-[28px] border border-brand-gold/15 bg-brand-forest px-5 py-6 text-brand-paper">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold/75">Consulting</p>
          <a className="mt-4 block font-serif-display text-2xl" href={`tel:${contactInfo.hotline.replace(/-/g, "")}`}>
            {contactInfo.hotline}
          </a>
          <p className="mt-4 text-sm leading-7 text-brand-paper/70">{contactInfo.address}</p>
        </div>
      </aside>
    </div>
  );
}

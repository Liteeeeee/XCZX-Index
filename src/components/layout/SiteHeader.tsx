import { Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { contactInfo, navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/useUiStore";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { toggleDrawer } = useUiStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition duration-300",
        scrolled
          ? "border-brand-gold/10 bg-brand-paper/90 shadow-[0_12px_40px_rgba(22,34,22,0.08)] backdrop-blur-xl"
          : "border-transparent bg-brand-paper/70 backdrop-blur-lg",
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <p className="font-serif-display text-2xl text-brand-ink">仙草甄选</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-brand-gold/75">XIANGCAO SELECT</p>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm transition",
                  isActive ? "bg-brand-forest text-brand-paper" : "text-brand-muted hover:bg-brand-gold/10 hover:text-brand-ink",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${contactInfo.hotline.replace(/-/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-brand-gold/15 px-4 py-2 text-sm text-brand-ink transition hover:border-brand-gold/40 hover:bg-brand-gold/10"
          >
            <Phone className="h-4 w-4 text-brand-gold" />
            {contactInfo.hotline}
          </a>
          <Link
            to="/join#contact"
            className="inline-flex items-center rounded-full bg-brand-forest px-5 py-3 text-sm text-brand-paper transition hover:bg-brand-ink"
          >
            招商咨询
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-brand-gold/15 p-3 text-brand-ink transition hover:border-brand-gold/40 hover:bg-brand-gold/10 lg:hidden"
          onClick={toggleDrawer}
          aria-label="打开菜单"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

import { ArrowUp, MessageCircleMore, PhoneCall } from "lucide-react";

import { HOTLINE_TEL } from "@/config/contact";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
      {/* <a
        href="#contact"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-brand-forest shadow-[0_14px_32px_rgba(185,160,100,0.32)] transition hover:-translate-y-1"
        aria-label="咨询合作"
      >
        <MessageCircleMore className="h-5 w-5" />
      </a> */}
      <a
        href={`tel:${HOTLINE_TEL}`}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-forest text-brand-paper shadow-[0_14px_32px_rgba(18,34,25,0.24)] transition hover:-translate-y-1"
        aria-label="电话咨询"
      >
        <PhoneCall className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-paper text-brand-ink shadow-[0_14px_32px_rgba(18,34,25,0.12)] transition hover:-translate-y-1"
        aria-label="返回顶部"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

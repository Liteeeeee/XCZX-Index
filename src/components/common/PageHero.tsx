import { Reveal } from "@/components/common/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-gold/10 bg-brand-forest text-brand-paper">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(210,179,102,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(120,150,109,0.18),transparent_30%)]" />
      <div className="container relative py-28 sm:py-36">
        <Reveal className="max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-gold/80">{eyebrow}</p>
          <h1 className="font-serif-display text-5xl leading-tight sm:text-6xl">{title}</h1>
          <p className="max-w-2xl text-base leading-8 text-brand-paper/72 sm:text-lg">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}

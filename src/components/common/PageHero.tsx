import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-brand-sand/45 py-20 sm:py-24", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,160,100,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(22,61,45,0.1),transparent_30%)]" />
      <div className="container relative">
        <Reveal className="max-w-4xl">
          <div className="inline-flex rounded-full border border-brand-gold/15 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-brand-gold/80">
            {eyebrow}
          </div>
          <h1 className="mt-6 font-serif-display text-4xl leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-3xl text-base leading-8 text-brand-muted sm:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

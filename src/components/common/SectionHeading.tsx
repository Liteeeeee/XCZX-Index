import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "space-y-4",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.35em] text-brand-gold/80",
          centered && "justify-center",
        )}
      >
        <span className="h-px w-10 bg-brand-gold/50" />
        {eyebrow}
      </div>
      <h2 className="font-serif-display text-4xl leading-tight text-brand-ink sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-8 text-brand-muted sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}

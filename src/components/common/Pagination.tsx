import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export function Pagination({ currentPage, totalPages, buildHref }: PaginationProps) {
  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            to={buildHref(page)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border text-sm transition duration-300",
              isActive
                ? "border-brand-gold bg-brand-gold text-brand-forest shadow-[0_10px_35px_rgba(185,160,100,0.28)]"
                : "border-brand-gold/20 bg-white/80 text-brand-muted hover:border-brand-gold/50 hover:text-brand-ink",
            )}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}

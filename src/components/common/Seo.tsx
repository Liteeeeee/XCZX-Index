import { useEffect } from "react";

interface SeoProps {
  title: string;
}

export function Seo({ title }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | 仙草甄选`;
  }, [title]);

  return null;
}

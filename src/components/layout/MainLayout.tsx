import type { PropsWithChildren } from "react";

import { FloatingContact } from "@/components/layout/FloatingContact";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader />
      <MobileDrawer />
      <main>{children}</main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}

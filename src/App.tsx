import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { BrandPage } from "@/pages/BrandPage";
import { HomePage } from "@/pages/HomePage";
import { JoinPage } from "@/pages/JoinPage";
import { NewsDetailPage } from "@/pages/NewsDetailPage";
import { NewsListPage } from "@/pages/NewsListPage";
import { ProductsPage } from "@/pages/ProductsPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/page/:page" element={<NewsListPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/page/:page" element={<ProductsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

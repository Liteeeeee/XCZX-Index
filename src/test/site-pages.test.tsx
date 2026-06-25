import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/pages/HomePage";
import { NewsListPage } from "@/pages/NewsListPage";
import { ProductsPage } from "@/pages/ProductsPage";

describe("仙草甄选官网页面", () => {
  it("首页展示品牌主标题与关键入口", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /仙草甄选，重塑东方草本滋养的当代表达/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /探索品牌/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /查看全部产品/i })).toBeInTheDocument();
  });

  it("产品分页路由能展示第二页商品", () => {
    render(
      <MemoryRouter initialEntries={["/products/page/2"]}>
        <Routes>
          <Route path="/products/page/:page" element={<ProductsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /仙草甄选产品中心/i })).toBeInTheDocument();
    expect(screen.getByText(/参杞膳饮/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toHaveClass("bg-brand-gold");
  });

  it("新闻列表支持分页路由", () => {
    render(
      <MemoryRouter initialEntries={["/news/page/2"]}>
        <Routes>
          <Route path="/news/page/:page" element={<NewsListPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/节气礼赠场景持续升温/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toHaveClass("bg-brand-gold");
  });
});

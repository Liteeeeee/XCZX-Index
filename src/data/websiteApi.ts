import {
  featuredNews as fallbackFeaturedNews,
  featuredProducts as fallbackFeaturedProducts,
  getNewsByPage as getFallbackNewsByPage,
  getNewsBySlug as getFallbackNewsBySlug,
  getProductsByPage as getFallbackProductsByPage,
  newsItems as fallbackNewsItems,
  newsPageSize,
  products as fallbackProducts,
  totalNewsPages as fallbackTotalNewsPages,
  totalProductPages as fallbackTotalProductPages,
  type NewsItem,
  type ProductItem,
} from "@/data/site";

const TEST_BASE_URL = "https://admin.xiancaozhenxuan.cn/admin-api/";
// const TEST_BASE_URL = "https://server.api.xiancaozhenxuan.cn/admin-api/";
const PROD_BASE_URL = "https://admin.xiancaozhenxuan.cn/admin-api/";
const DEFAULT_TENANT_ID = "1";
const PRODUCT_PAGE_SIZE = 4;

interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

interface PageResult<T> {
  total: number;
  list: T[];
}

interface WebsiteArticleResponse {
  id: number;
  title: string;
  introduction?: string | null;
  picUrl?: string | null;
  bannerPicUrl?: string | null;
  content?: string | null;
  publishTime?: string | null;
  createTime?: string | null;
}

interface WebsiteProductPropertyResponse {
  valueName?: string | null;
}

interface WebsiteProductSkuResponse {
  picUrl?: string | null;
  properties?: WebsiteProductPropertyResponse[] | null;
}

interface WebsiteProductSpuResponse {
  picUrl?: string | null;
}

interface WebsiteProductResponse {
  id: number;
  productName?: string | null;
  productTag?: string | null;
  keyword?: string | null;
  displayReason?: string | null;
  spuName?: string | null;
  skuName?: string | null;
  createTime?: number | null;
  spu?: WebsiteProductSpuResponse | null;
  skus?: WebsiteProductSkuResponse[] | null;
}

interface PagedItems<T> {
  currentPage: number;
  totalPages: number;
  items: T[];
}

const isTestMode = import.meta.env.MODE === "test";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.PROD ? PROD_BASE_URL : TEST_BASE_URL);
const apiOrigin = new URL(apiBaseUrl).origin;
const tenantId = import.meta.env.VITE_TENANT_ID ?? DEFAULT_TENANT_ID;

const toQueryString = (params: Record<string, string | number | boolean | undefined>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

const formatDate = (raw?: string | number | null) => {
  if (!raw) {
    return "";
  }

  let date: Date | undefined;

  if (typeof raw === "number") {
    date = new Date(raw);
  } else {
    const trimmed = raw.trim();

    if (!trimmed) {
      return "";
    }

    if (/^\d+$/.test(trimmed)) {
      const numeric = Number(trimmed);
      const normalized = trimmed.length <= 10 ? numeric * 1000 : numeric;
      date = new Date(normalized);
    } else {
      const normalized = trimmed.replace(" ", "T");
      const parsed = Date.parse(normalized);
      date = Number.isNaN(parsed) ? undefined : new Date(parsed);
    }
  }

  if (!date || Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\//g, "-");
};

const stripHtml = (html?: string | null) =>
  (html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeRichTextUrl = (value: string) => {
  const normalized = value.replace(/`/g, "").trim();

  if (!normalized || /^file:/i.test(normalized) || /^javascript:/i.test(normalized)) {
    return "";
  }

  return normalized;
};

export const normalizeArticleHtml = (html?: string | null) => {
  if (!html) {
    return undefined;
  }

  const normalized = html
    .replace(/\r\n?/g, "\n")
    .replace(/<img\b[^>]*>/gi, (tag) => {
      let shouldDropImage = false;

      const nextTag = tag.replace(/\b(src|data-href)=("([^"]*)"|'([^']*)')/gi, (_, attr: string, _quotedValue, doubleQuotedValue: string | undefined, singleQuotedValue: string | undefined) => {
        const rawValue = doubleQuotedValue ?? singleQuotedValue ?? "";
        const cleanValue = normalizeRichTextUrl(rawValue);

        if (attr.toLowerCase() === "src" && !cleanValue) {
          shouldDropImage = true;
          return "";
        }

        return `${attr}="${cleanValue}"`;
      });

      return shouldDropImage ? "" : nextTag;
    })
    .replace(/<p>\s*(?:<br\s*\/?>|&nbsp;|\s)*<\/p>/gi, "");

  return normalized.trim() || undefined;
};

const buildArticleSlug = (id: number, title: string) => {
  const normalized = title
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");

  return normalized ? `${id}-${normalized}` : String(id);
};

const parseArticleId = (slug?: string) => {
  if (!slug) {
    return undefined;
  }

  const matched = slug.match(/^(\d+)/);
  return matched ? Number(matched[1]) : undefined;
};

const extractProductTags = (item: WebsiteProductResponse) => {
  const tags = new Set<string>();
  const rawTags = item.productTag?.split(/[，,、\s]+/).filter(Boolean) ?? [];

  rawTags.forEach((tag) => tags.add(tag));

  return Array.from(tags).slice(0, 4);
};

const mapArticle = (item: WebsiteArticleResponse): NewsItem => {
  const normalizedHtml = normalizeArticleHtml(item.content);

  return {
    id: String(item.id),
    backendId: item.id,
    slug: buildArticleSlug(item.id, item.title),
    title: item.title,
    summary: item.introduction?.trim() || stripHtml(normalizedHtml) || "暂无摘要",
    date: formatDate(item.publishTime ?? item.createTime),
    cover: item.bannerPicUrl || item.picUrl || "",
    content: stripHtml(normalizedHtml)
      .split(/(?<=[。！？])/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    htmlContent: normalizedHtml,
  };
};

const mapProduct = (item: WebsiteProductResponse, page: number): ProductItem => ({
  id: String(item.id),
  name: item.productName?.trim() || item.spuName?.trim() || `展示商品 ${item.id}`,
  subtitle: item.productTag?.trim() || item.skuName?.trim() || "官网展示商品",
  description: item.displayReason?.trim() || item.keyword?.trim() || item.spuName?.trim() || "暂无商品描述",
  tags: extractProductTags(item),
  image:
    item.spu?.picUrl ||
    item.skus?.find((sku) => sku.picUrl)?.picUrl ||
    "",
  page,
});

async function request<T>(path: string, params: Record<string, string | number | boolean | undefined>) {
  const response = await fetch(`${apiOrigin}${path}${toQueryString(params)}`, {
    headers: {
      "tenant-id": tenantId,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const result = (await response.json()) as ApiResponse<T>;

  if (result.code !== 0) {
    throw new Error(result.msg || "Request failed");
  }

  return result.data;
}

async function getArticlePage(page: number) {
  const data = await request<PageResult<WebsiteArticleResponse>>("/app-api/promotion/website-article/page", {
    pageNo: page,
    pageSize: newsPageSize,
  });
  const totalPages = Math.max(1, Math.ceil(data.total / newsPageSize));

  if (page > totalPages && data.total > 0) {
    return getArticlePage(totalPages);
  }

  return {
    currentPage: Math.min(page, totalPages),
    totalPages,
    items: data.list.map(mapArticle),
  } satisfies PagedItems<NewsItem>;
}

async function getProductPage(page: number) {
  const data = await request<PageResult<WebsiteProductResponse>>("/app-api/promotion/website-product/page", {
    pageNo: page,
    pageSize: PRODUCT_PAGE_SIZE,
  });
  const totalPages = Math.max(1, Math.ceil(data.total / PRODUCT_PAGE_SIZE));

  if (page > totalPages && data.total > 0) {
    return getProductPage(totalPages);
  }

  return {
    currentPage: Math.min(page, totalPages),
    totalPages,
    items: data.list.map((item) => mapProduct(item, Math.min(page, totalPages))),
  } satisfies PagedItems<ProductItem>;
}

const fallbackArticlePage = (page: number): PagedItems<NewsItem> => ({
  currentPage: Math.min(Math.max(page, 1), fallbackTotalNewsPages),
  totalPages: fallbackTotalNewsPages,
  items: getFallbackNewsByPage(Math.min(Math.max(page, 1), fallbackTotalNewsPages)),
});

const fallbackProductPage = (page: number): PagedItems<ProductItem> => ({
  currentPage: Math.min(Math.max(page, 1), fallbackTotalProductPages),
  totalPages: fallbackTotalProductPages,
  items: getFallbackProductsByPage(Math.min(Math.max(page, 1), fallbackTotalProductPages)),
});

export const getNewsHref = (item: Pick<NewsItem, "slug">) => `/news/${item.slug}`;

export async function fetchWebsiteArticlesPage(page: number) {
  if (isTestMode) {
    return fallbackArticlePage(page);
  }

  try {
    const result = await getArticlePage(page);
    return result.items.length > 0 ? result : fallbackArticlePage(page);
  } catch {
    return fallbackArticlePage(page);
  }
}

export async function fetchWebsiteProductsPage(page: number) {
  if (isTestMode) {
    return fallbackProductPage(page);
  }

  try {
    const result = await getProductPage(page);
    return result.items.length > 0 ? result : fallbackProductPage(page);
  } catch {
    return fallbackProductPage(page);
  }
}

export async function fetchFeaturedWebsiteArticles(limit = 3) {
  const page = await fetchWebsiteArticlesPage(1);
  return page.items.slice(0, limit);
}

export async function fetchFeaturedWebsiteProducts(limit = 4) {
  const page = await fetchWebsiteProductsPage(1);
  return page.items.slice(0, limit);
}

export async function fetchWebsiteArticleDetail(slug?: string) {
  if (isTestMode) {
    return getFallbackNewsBySlug(slug);
  }

  const id = parseArticleId(slug);
  if (!id) {
    return getFallbackNewsBySlug(slug);
  }

  try {
    const detail = await request<WebsiteArticleResponse>("/app-api/promotion/website-article/get", { id });
    return mapArticle(detail);
  } catch {
    return getFallbackNewsBySlug(slug);
  }
}

export async function fetchAllWebsiteArticles() {
  if (isTestMode) {
    return fallbackNewsItems;
  }

  try {
    const data = await request<PageResult<WebsiteArticleResponse>>("/app-api/promotion/website-article/page", {
      pageNo: 1,
      pageSize: 200,
    });
    const items = data.list.map(mapArticle);
    return items.length > 0 ? items : fallbackNewsItems;
  } catch {
    return fallbackNewsItems;
  }
}

export const fallbackHomeNews = fallbackFeaturedNews;
export const fallbackHomeProducts = fallbackFeaturedProducts;
export const fallbackAllProducts = fallbackProducts;

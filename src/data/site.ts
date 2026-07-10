import { ENABLE_JOIN } from "@/config/features";

const imageBase = "https://coresg-normal.trae.ai/api/ide/v1/text_to_image";

const makeImage = (prompt: string, imageSize: string) =>
  `${imageBase}?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`;

export interface NavItem {
  label: string;
  enLabel: string;
  path: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  page: number;
}

export interface NewsItem {
  id: string;
  backendId?: number;
  slug: string;
  title: string;
  summary: string;
  date: string;
  cover: string;
  content: string[];
  htmlContent?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface JoinItem {
  id: string;
  title: string;
  description: string;
}

export const navItems: NavItem[] = [
  { label: "首页", enLabel: "HOME", path: "/" },
  { label: "品牌中心", enLabel: "BRAND", path: "/brand" },
  ...(ENABLE_JOIN ? [{ label: "招商加盟", enLabel: "JOIN US", path: "/join" } as const] : []),
  { label: "新闻资讯", enLabel: "NEWS", path: "/news" },
  { label: "产品中心", enLabel: "PRODUCTS", path: "/products" },
];

// 联系方式已统一提取至 @/config/contact，请从该文件直接导入

export const homeHero = {
  eyebrow: "ORIENTAL HERBAL LIFESTYLE",
  title: "以仙草为底蕴，以甄选铸平台。",
  description:
    "厚植中药文化的千年智慧，构筑东方食养的可信阵地——仙草甄选，让中式养生，走进更多人的日常。",
  primaryCta: "探索品牌",
  secondaryCta: "咨询合作",
  image: makeImage(
    "luxury oriental herbal wellness product display, dark emerald glass jars, botanical ingredients like ginseng and goji berries, refined Chinese premium brand campaign, cinematic studio lighting, elegant gold accents, realistic photography",
    "portrait_4_3",
  ),
};

export const homeStats: StatItem[] = [
  { value: "四", label: "大产品品类" },
  { value: "1000", label: "m²直播基地" },
  { value: "6000", label: "+种草矩阵" },
  { value: "30000", label: "+终端链接" },
];

export const standards: JoinItem[] = [
  {
    id: "origin",
    title: "道地溯源，真材实料",
    description: "每一味原料，皆有清晰的地理坐标与生长履历。",
  },
  {
    id: "formula",
    title: "科学验证，安全可循",
    description: "每一份功效，皆有科学依据与安全背书。",
  },
  {
    id: "craft",
    title: "工艺考究，品控严明",
    description: "每一道工序，皆有精细标准与质量把关。",
  },
  {
    id: "quality",
    title: "设计至简，体验至善",
    description: "每一处细节，皆有用户关怀与审美考量。",
  },
];

export const brandValues: JoinItem[] = [
  {
    id: "vision",
    title: "品牌愿景",
    description: "致力推动东方食养的健康哲学，让道地草本融入民生日常，成为一种可触可感、从容自在的生活方式。",
  },
  {
    id: "people",
    title: "品牌承诺",
    description: "甄选好仙草，健康更放心。用户的健康，是最高准则。严苛审鉴，透明溯源，护佑安心。",
  },
  {
    id: "promise",
    title: "产品定位",
    description: "东方草本为根，现代科技为翼。千年食养智慧，化作日常轻养生的温柔陪伴。",
  },
];

export const brandHighlights: StatItem[] = [
  { value: "自研小程序", label: "四大产品品类，药食同源，健康日化，健康食品，仙草文创，丰富的产品矩阵，带来更优质的健康服务。" },
  { value: "1000m²仓储式直播基地", label: "集直播空间、仓储管理、订单履约、物流配送于一体，实现“前播后仓、即播即发”的高效协同。" },
  { value: "6000+种草账号", label: "聚焦抖音输出中医养生、体质调养食疗科普等专业干货，让中式养生，成为更多国人的健康之选。" },
  { value: "30000+线下诊所/药店", label: "上万量级的线下渠道连结，让我们的产品能够便捷抵达更多用户手中。院中店模式携手药食坊，将线下门店开进三甲医院。更高规格的健康认可，更直观的实体感受。" },
];

export const timeline: TimelineItem[] = [
  {
    year: "2021",
    title: "品牌概念提出",
    description: "围绕东方轻养需求与现代礼赠场景，明确仙草甄选品牌定位。",
  },
  {
    year: "2022",
    title: "产品体系建立",
    description: "完成核心配方方向、包装系统与视觉语言的第一轮定义。",
  },
  {
    year: "2023",
    title: "渠道合作扩展",
    description: "围绕城市精品渠道、企业定制礼赠与社区门店开启合作试点。",
  },
  {
    year: "2024",
    title: "品牌升级发布",
    description: "以东方草本轻奢美学重构官网与内容传播体系，形成统一品牌资产。",
  },
];

export const joinAnchors = [
  { id: "opportunity", label: "投资前景" },
  { id: "advantages", label: "合作优势" },
  { id: "policy", label: "招商政策" },
  { id: "process", label: "合作流程" },
  { id: "contact", label: "联系咨询" },
];

export const marketStats: StatItem[] = [
  { value: "18%", label: "草本轻养消费年增长" },
  { value: "85%", label: "高净值礼赠用户关注健康赛道" },
  { value: "6 大", label: "线下合作场景可快速落位" },
];

export const joinAdvantages: JoinItem[] = [
  {
    id: "brand",
    title: "品牌力支撑",
    description: "统一视觉、标准物料与内容模板同步输出，提升门店或渠道陈列效率。",
  },
  {
    id: "product",
    title: "产品力支撑",
    description: "聚焦草本轻养、礼赠礼盒与高频轻饮三条线，兼顾复购与客单价。",
  },
  {
    id: "training",
    title: "培训赋能",
    description: "提供品牌话术、门店成交、直播内容和私域转化的标准方法论。",
  },
  {
    id: "service",
    title: "运营服务",
    description: "围绕节日礼赠、企业团购、社群活动等场景持续提供营销支持。",
  },
];

export const supportPolicies: JoinItem[] = [
  {
    id: "display",
    title: "陈列支持",
    description: "提供橱窗、货架、礼盒陈列与节令氛围物料，帮助渠道快速呈现品牌质感。",
  },
  {
    id: "promotion",
    title: "营销支持",
    description: "围绕内容投放、节气活动、礼赠方案与新品上市提供整合推广支持。",
  },
  {
    id: "operations",
    title: "运营支持",
    description: "按区域提供销售建议、动销节奏规划与培训复盘机制。",
  },
];

export const joinProcess: JoinItem[] = [
  { id: "consult", title: "初步沟通", description: "了解合作城市、场景、渠道体量与资源条件。" },
  { id: "plan", title: "方案匹配", description: "输出合作模式、产品方案与陈列建议。" },
  { id: "sign", title: "签约落地", description: "完成签约、物料准备与开业前培训。" },
  { id: "grow", title: "持续增长", description: "联合活动执行与复购经营，形成长期合作闭环。" },
];

export const products: ProductItem[] = [
  {
    id: "p1",
    name: "灵芝元饮",
    subtitle: "轻养草本礼盒",
    description: "围绕灵芝、陈皮与枣香层次打造的经典轻养礼盒，适合日常送礼与企业伴手礼场景。",
    tags: ["礼赠", "灵芝", "高端包装"],
    image: makeImage(
      "premium Chinese herbal wellness gift box with dark green and gold packaging, lingzhi mushroom ingredients, luxury still life on stone pedestal, realistic product photography",
      "square_hd",
    ),
    page: 1,
  },
  {
    id: "p2",
    name: "人参玉露",
    subtitle: "晨间元气系列",
    description: "以人参和温润本草组合构成晨间轻养方案，适合通勤与高强度工作人群。",
    tags: ["人参", "通勤轻养", "便携"],
    image: makeImage(
      "oriental herbal wellness drink bottle set, ginseng roots, elegant luxury Chinese brand packaging, deep green and gold, soft natural light, realistic",
      "square_hd",
    ),
    page: 1,
  },
  {
    id: "p3",
    name: "茯苓悦养",
    subtitle: "日晚舒缓系列",
    description: "以茯苓与花草复配表达安定舒缓的日晚轻养感受，包装细腻克制。",
    tags: ["茯苓", "舒缓", "轻饮"],
    image: makeImage(
      "premium herbal tea gift set with poria cocos ingredients, elegant Chinese luxury packaging, beige and emerald, clean editorial product photography",
      "square_hd",
    ),
    page: 1,
  },
  {
    id: "p4",
    name: "四时花本",
    subtitle: "节气礼赠系列",
    description: "围绕节气与礼赠场景打造的花本礼盒，适用于品牌礼品与企业团购。",
    tags: ["节气礼盒", "花本", "企业定制"],
    image: makeImage(
      "seasonal Chinese herbal luxury gift box, floral botanicals, premium emerald green packaging with gold foil, lifestyle product photo",
      "square_hd",
    ),
    page: 1,
  },
  {
    id: "p5",
    name: "参杞膳饮",
    subtitle: "日常轻补系列",
    description: "以枸杞和参本风味构建更适合高频复购的轻补产品线。",
    tags: ["日常复购", "枸杞", "轻补"],
    image: makeImage(
      "modern oriental herbal bottled drink with goji berries and ginseng, refined Chinese brand style, realistic product shoot",
      "square_hd",
    ),
    page: 2,
  },
  {
    id: "p6",
    name: "玉竹清润",
    subtitle: "润养调和系列",
    description: "主打温和润养体验，适合女性客群与精致生活方式门店陈列。",
    tags: ["玉竹", "润养", "女性向"],
    image: makeImage(
      "luxury Chinese herbal tonic bottle with polygonatum odoratum ingredient styling, premium minimalist packaging, realistic photography",
      "square_hd",
    ),
    page: 2,
  },
  {
    id: "p7",
    name: "甄选礼卡",
    subtitle: "企业礼赠服务",
    description: "为企业客户提供节令礼赠、员工福利与商务伴手礼卡方案。",
    tags: ["礼卡", "企业服务", "定制"],
    image: makeImage(
      "luxury membership gift card for premium Chinese herbal brand, embossed gold details on emerald green, elegant still life",
      "square_hd",
    ),
    page: 2,
  },
  {
    id: "p8",
    name: "草本月令礼盒",
    subtitle: "节庆限定系列",
    description: "结合节令文化与现代包装审美，强化品牌情绪价值与礼赠属性。",
    tags: ["限定", "节庆", "高端礼盒"],
    image: makeImage(
      "premium festival gift box for oriental herbal luxury brand, dark green and champagne gold, sophisticated editorial product shot",
      "square_hd",
    ),
    page: 2,
  },
];

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    slug: "brand-upgrade",
    title: "仙草甄选完成品牌升级，发布东方草本轻奢视觉体系",
    summary: "品牌以东方本草为灵感，完成官网、包装与内容表达的整体升级，强化礼赠与生活方式场景。",
    date: "2026-04-18",
    cover: makeImage(
      "Chinese luxury herbal brand launch event, emerald and gold visual installation, realistic editorial event photography",
      "landscape_16_9",
    ),
    content: [
      "仙草甄选围绕“东方草本轻奢美学”进行了整体品牌升级，新的视觉体系从色彩、排版、包装到官网体验均建立了更统一的品牌识别。",
      "本次升级重点强化礼赠属性、品牌气质和内容传播效率，使用户在官网、社媒与线下陈列中获得一致的感知。",
      "未来品牌将继续围绕节气轻养、礼赠消费与城市渠道合作三条路径，推动品牌与产品资产持续沉淀。",
    ],
  },
  {
    id: "n2",
    slug: "herbal-selection-standard",
    title: "仙草甄选发布八大草本甄选标准，强化原料与品控透明度",
    summary: "从产地、采收、配伍、稳定性到包装审美，品牌首次对外公开产品甄选逻辑。",
    date: "2026-03-07",
    cover: makeImage(
      "premium herbal ingredients flat lay with Chinese medicine botanicals, laboratory notes and elegant packaging, realistic",
      "landscape_16_9",
    ),
    content: [
      "仙草甄选正式发布八大草本甄选标准，涵盖原料来源、季节采收、配方逻辑、风味表现、稳定性验证和包装交付等多个维度。",
      "品牌希望通过更清晰的标准表达，让消费者与合作方更容易理解产品背后的研发逻辑与品质控制能力。",
      "甄选标准的公开，也将成为未来新品开发和渠道合作的统一基础。",
    ],
  },
  {
    id: "n3",
    slug: "channel-partnership",
    title: "仙草甄选启动城市渠道共创计划，开放精品零售与礼赠合作",
    summary: "面向精品商超、礼赠渠道、企业团购与生活方式门店，仙草甄选开启新的合作计划。",
    date: "2026-02-11",
    cover: makeImage(
      "premium lifestyle retail store display for Chinese herbal brand, elegant shelves, green and gold packaging, realistic interior photo",
      "landscape_16_9",
    ),
    content: [
      "品牌将围绕精品零售、企业礼赠和生活方式门店，开放更多城市合作名额。",
      "通过统一陈列标准、动销方案和内容支持，仙草甄选希望帮助合作方快速建立高质感草本消费场景。",
      "合作计划同时包含节令活动、企业定制礼盒与私域内容支持。",
    ],
  },
  {
    id: "n4",
    slug: "seasonal-gift-box",
    title: "节气礼赠场景持续升温，草本礼盒成为企业福利新选择",
    summary: "在节气营销与企业福利场景中，草本礼盒正在成为兼具健康价值与审美价值的新选择。",
    date: "2025-12-28",
    cover: makeImage(
      "premium seasonal gift box for Chinese herbal wellness brand, office gifting scene, elegant realistic photography",
      "landscape_16_9",
    ),
    content: [
      "随着企业对于礼赠品质与情绪价值的要求提升，兼具审美和健康表达的草本礼盒逐渐获得更多关注。",
      "仙草甄选结合节气内容与品牌叙事，为企业福利、客户维护和商务伴手礼提供更完整的解决方案。",
      "未来品牌还将围绕定制包装、礼卡体系和节日节点持续扩展产品矩阵。",
    ],
  },
  {
    id: "n5",
    slug: "tea-house-pop-up",
    title: "仙草甄选草本快闪空间亮相城市茶生活节",
    summary: "品牌以“草本轻养会客厅”为主题打造沉浸式快闪空间，展示产品和礼赠方案。",
    date: "2025-10-09",
    cover: makeImage(
      "Chinese herbal luxury brand pop-up space, tea lifestyle festival, emerald green pavilion with gold details, realistic event photography",
      "landscape_16_9",
    ),
    content: [
      "此次快闪空间聚焦品牌主视觉、草本配方展示和礼赠方案体验，让用户在场景中理解产品价值。",
      "品牌同时邀请合作渠道、企业客户与内容创作者参与共创，增强品牌传播的立体度。",
      "线下快闪也将成为仙草甄选未来重要的品牌展示方式之一。",
    ],
  },
];

export const featuredNews = newsItems.slice(0, 3);
export const featuredProducts = products.slice(0, 4);
export const newsPageSize = 3;

export const getNewsBySlug = (slug?: string) =>
  newsItems.find((item) => item.slug === slug) ?? newsItems[0];

export const getProductsByPage = (page: number) =>
  products.filter((item) => item.page === page);

export const totalProductPages = Math.max(...products.map((item) => item.page));
export const totalNewsPages = Math.ceil(newsItems.length / newsPageSize);

export const getNewsByPage = (page: number) =>
  newsItems.slice((page - 1) * newsPageSize, page * newsPageSize);

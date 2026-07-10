import { describe, expect, it } from "vitest";

import { normalizeArticleHtml } from "@/data/websiteApi";

describe("normalizeArticleHtml", () => {
  it("清洗富文本中的异常图片地址", () => {
    const html = `
      <p>正文</p>
      <p><img src=" \`https://mp-cdn.xiancaozhenxuan.cn/demo.png\` " data-href=" \`https://mp-cdn.xiancaozhenxuan.cn/demo.png\` " alt="image"></p>
      <p><img src="file:///C:/Users/demo/AppData/Local/Temp/image.jpg" alt=""></p>
      <p><br></p>
    `;

    const normalized = normalizeArticleHtml(html);

    expect(normalized).toContain('src="https://mp-cdn.xiancaozhenxuan.cn/demo.png"');
    expect(normalized).toContain('data-href="https://mp-cdn.xiancaozhenxuan.cn/demo.png"');
    expect(normalized).not.toContain("file:///");
    expect(normalized).not.toContain("<p><br></p>");
  });
});

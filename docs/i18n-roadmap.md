# Pet Memo Shop — 多语言工作计划

> **状态：** Phase 1b 已完成（壳层 + 首页/商品/合集/政策页五语）；Phase 2 待 CMS 多语言字段  
> **目标语言：** en · de · es · fr · zh  
> **后台语言：** 仅中文（不变）  
> **域名：** https://petmemoshop.com

---

## 1. 语言与市场

| 代码 | 语言 | 市场 | 备注 |
|------|------|------|------|
| `en` | 英语 | 美/英/加/澳 + 全球默认 | 主语言，内容最全 |
| `de` | 德语 | 德/奥/瑞 | 高客单，品质向文案 |
| `es` | 西班牙语 | 西/墨/拉美 | 覆盖面大 |
| `fr` | 法语 | 法/比/瑞/魁北克 | 礼品文化成熟 |
| `zh` | 中文（简体） | 海外华人 | 与主站同 checkout；国内独立站另议 |

---

## 2. URL 方案

```
/              → 英语（默认）
/en/           → 英语（可选别名）
/de/           → 德语
/es/           → 西班牙语
/fr/           → 法语
/zh/           → 中文
```

- 产品 slug **保持英文**（如 `carbon-fiber-nfc-memorial-tag`），只译 UI 与描述
- 博客：en 全量；其他语言先 5–10 篇支柱文
- 法律页：de/fr 需人工审校

---

## 3. 技术方案（开工时）

- **框架：** Next.js App Router + [next-intl](https://next-intl.dev/)
- **路由：** `src/app/[locale]/...`
- **文案：** `src/messages/{en,de,es,fr,zh}.json`
- **SEO：** `hreflang` + 分语言 sitemap + `og:locale:alternate`
- **字体：** 拉丁语系现有字体 + `Noto Sans SC`（zh）
- **依赖后台：** 商品/首页多语言字段可存 CMS（见 `docs/admin.md`），Phase 2 在 CMS 加 `locale` 维度

---

## 4. 内容分批

### Phase 1 — MVP（五语壳层 + 核心转化）

- [x] `[locale]` 路由、next-intl、语言切换、hreflang（壳层）
- [x] Header / Footer / 公告 / Trust badges（五语 JSON）
- [x] 首页 Hero、分类、How it works、NFC 区块（`messages/content/*.json`，en 仍读 CMS）
- [x] 全部 13 SKU 标题、短描述、SEO（非 en 语言）
- [x] About、Shipping、Returns、Contact 五语
- [x] 7 个核心 Collection meta + 列表页标题
- [x] 畅销榜页五语

### Phase 2

- [ ] 全部 SKU
- [ ] FAQ 全文
- [ ] Privacy / Terms（de、fr 法务审校）

### Phase 3

- [ ] 博客支柱文（每语言 5–10 篇）
- [ ] 分语言 Google Ads 落地页

---

## 5. 实施顺序（预估 8–10 周，多语言开工后）

| 周 | 任务 |
|----|------|
| 1–2 | `[locale]` 路由、next-intl、语言切换、hreflang |
| 3 | 壳层 + 首页 + About/Contact 五语 |
| 4–5 | Top 产品 + Collections 五语 |
| 6 | 政策页 + FAQ；de/fr 审校 |
| 7 | sitemap、Search Console |
| 8+ | 博客、剩余 SKU、广告落地页 |

---

## 6. 前置条件（当前阶段）

1. ✅ 站点已上线（Coolify + GitHub）
2. 🔄 **后台管理** — 首页/商品可编辑（进行中）
3. ⬜ CMS 支持多语言字段结构（后台 v2）
4. ⬜ 翻译流程（TMS 或 JSON + 译员）

---

## 7. 相关文档

- 产品目录对照：`docs/product-catalog-bilingual.md`
- 后台说明：`docs/admin.md`
- 部署：`docs/deploy.md`

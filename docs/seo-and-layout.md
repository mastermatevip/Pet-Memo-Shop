# Pet Memo Shop — SEO 分析与站点布局记录

> 域名：**petmemoshop.com**  
> 代码目录：`pawaura/`（Next.js 16 + TypeScript + Tailwind v4）  
> 最后更新：2026-06-30

---

## 1. 品牌资产

| 资产 | 路径 | 用途 |
|------|------|------|
| 完整 Logo（含文字） | `public/brand/logo-full.png` | Header 导航 |
| 图标 Logo | `public/brand/logo-icon.png` | Footer、favicon、apple-touch-icon |
| 品牌配置 | `src/config/brand.ts` | 全站名称、URL、邮箱、社交链接 |

**品牌名：** Pet Memo Shop  
**邮箱：** hello@petmemoshop.com  
**组件：** `src/components/layout/BrandLogo.tsx`

---

## 2. Semrush 关键词研究摘要（US 数据库）

### 2.1 主词簇 — Pet Memorial（已实施 Phase 1）

| 页面 | 主关键词 | 搜索量 | KD |
|------|----------|--------|-----|
| `/` | personalized pet memorial gifts | 720+ | 29 |
| `/collections/pet-memorial-gifts` | pet memorial gifts | 6,600 | 29 |
| `/collections/pet-memorial-jewelry` | pet memorial jewelry | 1,900 | 17 |
| `/collections/pet-memorial-frames` | pet memorial frames | 480 | 11 |
| `/collections/pet-memorial-plaques` | pet memorial plaques | 480 | 8 |
| `/collections/dog-memorial-gifts` | pet memorials for dogs | — | — |
| `/collections/pet-loss-sympathy-gifts` | pet memory gifts | 390 | 21 |
| `/collections/pet-urns` | pet memorial urns | 260 | 28 |
| `/best-sellers` | unique pet memorial gifts | 720 | 21 |

**避开：** pet memorial stones（3.6K，本地服务/户外石碑，非电商）

### 2.2 Digital / NFC 词簇（Phase 2 — 本次实施）

| 搜索词 | Semrush 结果 | 结论 |
|--------|-------------|------|
| **NFC pet memorial** | ❌ 零数据 | 不能作 SEO 主词 |
| **digital pet memorial** | 8 词 / 90 月 | 量小，可作辅助 |
| **online pet memorial** | 45 词 / **290 月** / KD **24%** | **Digital 页主战场** |
| **nfc memorial card** | 被 memory card 污染 | 不宜单独做主 Title |
| **qr code pet memorial** | 0 月 | 放描述即可 |
| **pet memorial tag** | 17 词 / ~100 月 | 碳纤维 Tag 产品层 |

**online pet memorial 高价值词：**

- online memorial for pets — 50/月，KD 25，CPC $2.14
- online pet memorial — 40/月，KD 24
- create / make pet memorial online — 各 20/月

### 2.3 SEO 分层策略（Digital/NFC 产品线）

```
引流层 → online pet memorial, digital pet memorial, create pet memorial online
         页面：/digital-pet-memorial

产品层 → pet memorial tags, pet memorial dog tags
         产品：/products/carbon-fiber-nfc-memorial-tag

大词层 → pet memorial gifts (6,600)
         通过 Collection 内链导入 NFC 产品

差异化 → carbon fiber NFC memorial（自创品类，内容/社媒教育）
```

**原则：** Title 用 online/digital pet memorial tag；NFC、QR、carbon fiber 放描述和功能点。

---

## 3. 产品架构（NFC / Digital）

### 3.1 产品线 tiers

| SKU | Slug | 价格 | 定位 |
|-----|------|------|------|
| Digital Page Only | `digital-memorial-page-standalone` | $19.99 | 纯线上 |
| NFC Memorial Card | `nfc-pet-memorial-card` | $34.99 | 入门物理+NFC |
| **Carbon Fiber NFC Tag** | `carbon-fiber-nfc-memorial-tag` | **$69.99** | **旗舰 Signature** |

### 3.2 Collection — NFC Memorial Tags

- **Slug（URL 不变）：** `nfc-memorial-cards`
- **显示名：** NFC Memorial Tags
- **H1：** Digital Pet Memorial Tags & NFC Keepsakes
- **Meta Title：** Digital Pet Memorial Tags | NFC & QR Code Keepsakes
- **数据文件：** `src/data/collections.ts`

### 3.3 Digital Memorial 落地页

- **URL：** `/digital-pet-memorial`
- **H1：** Create an Online Pet Memorial
- **Meta Title：** Online Pet Memorial | Create a Digital Pet Memorial Page
- **CTA 优先级：** Carbon Fiber Tag → Digital Page → NFC Card
- **文件：** `src/app/digital-pet-memorial/page.tsx`

---

## 4. 站点页面地图

```
/                                    首页（12 sections）
/collections/[slug]                  11 个 Collection
/products/[slug]                     13 个产品（含碳纤维 Tag）
/digital-pet-memorial                Digital 落地页
/best-sellers                        畅销页
/blog + /blog/[slug]                 12 篇文章
/about, /contact, /reviews, /faqs
/shipping-policy, /returns-refunds, /privacy-policy, /terms-of-service
/track-order, /wholesale
```

**静态页面数：** 60（build 后验证）

---

## 5. 设计系统

| Token | 色值 | 用途 |
|-------|------|------|
| bg | `#F8F3EA` | 主背景 |
| bg-secondary | `#E7D8C5` | 次级背景 |
| text | `#3A2E25` | 正文 |
| btn | `#1F1A17` | 按钮/页脚 |
| gold | `#C8A96A` | 强调 |
| border | `#DED0BD` | 边框 |
| card | `#FFFFFF` | 卡片 |
| highlight | `#F3E8D8` | 高亮区块 |

字体：Cormorant Garamond（标题）+ Inter（正文）

---

## 6. 已完成 vs 待办

### ✅ 已完成

- [x] Phase 1 SEO：Meta / H1 / Collection copy（Semrush Pet Memorial 词簇）
- [x] 品牌更名 Pet Memo Shop + Logo 上线
- [x] Carbon Fiber NFC Memorial Tag 产品数据
- [x] NFC Collection SEO 重构（Digital Pet Memorial Tags）
- [x] Digital Memorial 落地页文案升级
- [x] 产品 metaTitle / metaDescription 字段

### 🔲 待办（Phase 3+）

- [ ] 替换碳纤维 Tag 产品图为真实产品摄影
- [ ] 博客：`pet memorial ideas`（1.6K vol）、`What is a digital pet memorial?`
- [ ] 博客更新：NFC 文章加入 Carbon Fiber Tag 链接
- [ ] Google Search Console 提交 sitemap（petmemoshop.com 上线后）
- [ ] 扩展 SKU：ornaments（KD 2）、wind chimes（KD 1）
- [ ] 导出 Semrush CSV 做更细 keyword-to-page 映射
- [ ] 考虑 Collection slug 301：`nfc-memorial-cards` → `nfc-memorial-tags`（可选，当前保留旧 slug 避免断链）

---

## 7. 本地开发

```bash
cd pawaura
npm run dev    # http://localhost:3000
npm run build  # 生产构建验证
```

---

## 8. 关键文件索引

| 用途 | 文件 |
|------|------|
| 品牌 | `src/config/brand.ts` |
| Logo 组件 | `src/components/layout/BrandLogo.tsx` |
| 产品数据 | `src/data/products.ts` |
| Collection 数据 | `src/data/collections.ts` |
| SEO 工具 | `src/lib/seo.ts` |
| 首页 | `src/components/home/HomePage.tsx` |
| Digital 页 | `src/app/digital-pet-memorial/page.tsx` |
| 类型定义 | `src/types/index.ts` |

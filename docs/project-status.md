# Pet Memo Shop — 项目完成记录

> **记录日期：** 2026-07-08  
> **域名：** https://petmemoshop.com  
> **仓库：** `mastermatevip/Pet-Memo-Shop` · 分支 `main`  
> **Coolify 应用：** `pet--memo--shop:main-utmizb6yoyc2bdj78dblhyy3`  
> **状态：** ✅ 后台 CMS + 订单/会员 + PayPal 结账已上线；移动端 PageSpeed ~80 分

---

## 一、已完成里程碑

| 阶段 | 内容 | 状态 | 关键 Commit |
|------|------|------|-------------|
| 站点上线 | Next.js 独立站 + Coolify Docker 部署 | ✅ | `61bcac7` |
| 后台 CMS v1 | 中文管理后台：首页 + 商品编辑 | ✅ | `1ea225a` |
| 商品图片 | 多图编辑、本地上传、Sharp 压缩 WebP | ✅ | `680d8b7`–`770c50c` |
| 上传修复 | 自动保存 CMS、卷权限、Standalone 图片服务 | ✅ | `f4d808d`–`ada4af3` |
| 博客 CMS | 博客文章列表 + 单篇编辑，草稿/发布状态 | ✅ | `25b3098`–`edc2d4f` |
| 多语言 i18n | next-intl：en/de/es/fr/zh，前台语言切换 + 内容翻译 | 🔄 | `5011265`–`5c505d7` |
| 订单管理 | 后台订单 CRUD、物流状态、前台查单 | ✅ | `23f6213` |
| SEO 基础 | sitemap.xml、robots.txt | ✅ | `23f6213` |
| PayPal 结账 | 购物车、Checkout、PayPal 收款、自动建单 | ✅ | `f585c5a` |
| 会员 CRM | 后台会员管理、订单/结账自动同步 | ✅ | `17fd94d` |
| 博客发布流程 | 代码部署默认草稿，仅后台手动发布 | ✅ | `90780f9` |
| 博客卷同步 | 生产 CMS 卷自动合并缺失文章（草稿） | ✅ | `8805221` |
| 性能优化 | 移动端 PageSpeed ~80（LCP 从 7.2s 改善） | ✅ | `3ba3376` |

---

## 二、后台功能清单

### 访问路径

| 路径 | 功能 |
|------|------|
| `/admin` | 控制台（商品/博客数量概览） |
| `/admin/login` | 登录 |
| `/admin/homepage` | 首页编辑 |
| `/admin/products` | 商品列表 |
| `/admin/products/[slug]` | 单商品编辑（含多图上传） |
| `/admin/blog` | 博客文章列表 |
| `/admin/blog/[slug]` | 单篇文章编辑 |
| `/admin/orders` | 订单列表 |
| `/admin/orders/new` | 新建订单 |
| `/admin/orders/[orderNumber]` | 单订单编辑 |
| `/admin/members` | 会员列表 |
| `/admin/members/new` | 新建会员 |
| `/admin/members/[email]` | 单会员编辑 |

### 前台新增路径

| 路径 | 功能 |
|------|------|
| `/cart` | 购物车 |
| `/checkout` | PayPal 结账 |
| `/checkout/success` | 支付成功页 |
| `/account` | 查单入口 + 联系信息（无密码登录） |
| `/track-order` | 订单号 + 邮箱查物流 |

### 可编辑内容

**首页：** Hero 标题/副标题/CTA/主图、各区块标题、NFC 区块文案与要点

**商品：** 标题、价格、促销价、描述、Story、SEO、Tags、规格、卖点、**多图上传**（自动压缩为 WebP，最大 2000px）

**博客：** 标题、摘要、分类、发布日期、阅读时长、SEO、正文（Markdown 风格）、FAQ、关联商品/合集 Slug

**只读字段：** 商品 Slug、collection；博客 Slug（保护 URL）

---

## 三、数据与存储

| 路径 | 内容 | 持久化 |
|------|------|--------|
| `data/cms/homepage.json` | 首页 CMS 数据 | ✅ Coolify 卷 `/app/data/cms` |
| `data/cms/products.json` | 商品 CMS 数据 | ✅ 同上 |
| `data/cms/blog.json` | 博客 CMS 数据（分类 + 文章，含草稿） | ✅ 同上 |
| `data/cms/orders.json` | 订单数据 | ✅ 同上 |
| `data/cms/members.json` | 会员 CRM 数据 | ✅ 同上 |
| `public/uploads/products/` | 商品上传图片 | ✅ Coolify 卷 `/app/public/uploads` |
| `public/images/` | 静态资源（如 Hero 主图） | ✅ 随 Git 部署 |

- 首次启动若 JSON 不存在，从 `src/data/*.static.ts` 自动 seed
- **博客：** 代码中新文章默认 `draft`；生产卷缺失 slug 时，`readBlogFile()` 自动从 seed 合并为草稿（`8805221`）
- 保存后 `revalidatePath`；首页使用 **ISR（1 小时）**，保存后立即刷新，**无需重新 build**
- 本地上传图片通过 App Route `/uploads/products/[filename]` 服务（解决 Standalone 动态文件问题）

---

## 四、生产环境配置

### 环境变量（Coolify）

```env
NODE_ENV=production
PORT=3000
ADMIN_PASSWORD=强密码
ADMIN_SECRET=至少32位随机字符串
NEXT_PUBLIC_PAYPAL_CLIENT_ID=PayPal Client ID
PAYPAL_CLIENT_SECRET=PayPal Secret
PAYPAL_MODE=sandbox   # 上线后改为 live
```

> PayPal 详细配置见 `docs/paypal.md`。修改 `NEXT_PUBLIC_*` 后需 **Redeploy**，不能只 Restart。

### 持久卷挂载

| 容器路径 | 用途 |
|----------|------|
| `/app/data/cms` | CMS JSON（首页、商品、博客） |
| `/app/public/uploads` | 上传的商品图片 |

### 权限

`docker-entrypoint.sh` 启动时将 `/app/data`、`/app/public/uploads` 属主改为 `nextjs:nodejs`，解决 Coolify 卷默认 root 导致上传失败的问题。

---

## 五、部署流程

```powershell
cd I:\独立站\宠物纪念\pawaura
.\deploy.ps1    # 内含 npm ci + build，与 Coolify Docker 一致
# 或
npm run deploy
```

`deploy.ps1` 会先跑 **`npm ci`** 再 **`npm run build`**，避免 lock 不同步只在 Coolify 上才报错。

国内 push 需代理：

```powershell
git -c "http.proxy=http://127.0.0.1:10808" -c "https.proxy=http://127.0.0.1:10808" push origin main
```

### Coolify 构建失败记录（2026-07-02）

| 问题 | 原因 | 修复 |
|------|------|------|
| `Missing: @swc/helpers@0.5.23` | `npm ci` 时 lock 与 `package.json` 不同步 | `5c505d7` 添加 `@swc/helpers` 并提交 lock |
| `Failed to fetch Google Fonts` | `next/font/google` 构建期访问外网 | `d06e289` 改为运行时 `<link>` 加载 |

**详细排障与禁止事项：** `docs/deploy.md` →「Coolify 构建失败记录」

---

## 六、验收清单（已通过）

- [x] https://petmemoshop.com/ 首页正常
- [x] 商品页、合集页、博客页正常
- [x] `/admin` 登录与编辑
- [x] 首页/商品/博客保存后前台即时更新
- [x] 商品图片上传、压缩、后台预览、前台显示
- [x] Coolify 持久卷 + 权限正常
- [x] www → 非 www 301
- [x] HTTPS 有效
- [x] PayPal Sandbox 结账流程
- [x] 订单后台 + 前台查单
- [x] sitemap / robots 可访问
- [x] 移动端 PageSpeed ~80 分（目标已达成）

---

## 七、2026-07-08 更新记录

### 7.1 订单与 SEO（`23f6213`）

- 后台 `/admin/orders`：订单列表、新建、编辑（状态、物流、客户信息）
- 前台 `/track-order`：订单号 + 邮箱查询物流
- `data/cms/orders.json` 持久化
- `sitemap.xml` / `robots.txt` 自动生成（含多语言、商品、已发布博客）

### 7.2 PayPal 结账（`f585c5a`）

- 购物车 `/cart`、结账 `/checkout`、成功页 `/checkout/success`
- PayPal JS SDK + 服务端 create/capture API
- 支付成功后自动写入订单
- 前台 `/account`：查单入口（非会员密码登录）
- 文档：`docs/paypal.md`

### 7.3 会员 CRM（`17fd94d`）

- 后台 `/admin/members`：会员列表、新建、编辑
- PayPal 结账 / 后台建单时自动创建或更新会员
- 「从订单同步」批量导入历史客户
- `data/cms/members.json` 持久化

### 7.4 博客发布流程（`90780f9`、`8805221`）

**固定流程：代码部署的新文章一律草稿，仅后台手动发布。**

| 规则 | 说明 |
|------|------|
| Git 默认 | 新 slug 在 `blog.static.ts` / `data/cms/blog.json` 中为 `"status": "draft"` |
| 发布动作 | 仅在 `/admin/blog` 改为「已发布」 |
| 生产卷 | Coolify 卷内 `blog.json` 为准；Redeploy 后自动合并缺失文章为草稿 |

**示例文章：** *How to Create a Pet Memory Corner at Home*  
Slug: `how-to-create-a-pet-memory-corner-at-home`

### 7.5 性能优化（`3ba3376`）

**背景：** Google PageSpeed 移动端 Performance 71，LCP 7.2s。优化后 **~80 分**，用户确认可接受。

| 改动 | 文件 | 效果 |
|------|------|------|
| 首页 ISR（1h 缓存） | `src/app/[locale]/page.tsx` | 降低 TTFB，后台保存仍即时刷新 |
| 非阻塞 Google Fonts | `src/components/layout/AsyncGoogleFonts.tsx` | 消除 ~1.9s 渲染阻塞 |
| 移动端 Hero 图优先 | `src/components/home/HomePage.tsx` | LCP 元素改为图片 |
| Hero 图本地化 | `public/images/hero-memorial.jpg` | 减少 Unsplash 外链延迟 |
| 仅 Hero 使用 `priority` | `Header.tsx` | 避免与 Logo 争抢 preload |
| AVIF + 图片缓存 | `next.config.ts` | 更小体积、长期缓存 |
| GTM 空闲加载 | `GoogleTagManager.tsx` | 减少主线程占用 |
| 商品图走 next/image | `ProductImageDisplay.tsx` | 响应式尺寸，节省 ~314 KiB |

**生产注意：** 若 Hero 仍指向 Unsplash，请在 `/admin/homepage` 改为 `/images/hero-memorial.jpg` 并保存。

---

## 八、待办（下一期）

| 优先级 | 内容 | 文档 |
|--------|------|------|
| P1 | PayPal 切换 live 模式 | `docs/paypal.md` |
| P1 | Google Search Console 持续提交 sitemap | — |
| P1 | 博客 Phase 3 多语言 | `docs/i18n-roadmap.md` |
| P2 | 个性化商品照片上传 | — |
| P2 | 订单确认邮件 | — |
| P2 | 首页分类卡片/步骤可视化编辑 | — |
| P3 | 博客 Featured Image | — |
| P4 | Cloudflare Access / IP 限制（可选） | `docs/admin.md` |

---

## 九、相关文档

| 文档 | 说明 |
|------|------|
| `docs/admin.md` | 后台使用说明 |
| `docs/deploy.md` | Coolify 部署指南 |
| `docs/i18n-roadmap.md` | 多语言工作计划 |
| `docs/paypal.md` | PayPal 结账配置 |
| `docs/seo-and-layout.md` | SEO 与布局 |
| `docs/product-catalog-bilingual.md` | 商品目录双语参考 |

---

## 十、Git 提交历史（近期）

```
3ba3376 Improve mobile PageSpeed: ISR homepage, async fonts, LCP hero tuning
8805221 Auto-merge missing blog posts from seed into production CMS volume
90780f9 Enforce draft-first blog deploy workflow; publish only via admin
17fd94d Add admin member management with auto-sync from orders and checkout
f585c5a Add PayPal checkout, cart flow, account page, and purchase feedback
23f6213 Add admin order management, track-order lookup, and sitemap/robots
edc2d4f Add blog draft status with manual publish from admin
25b3098 Add blog editing to admin CMS
1ea225a Add Chinese admin CMS for homepage and product editing
```

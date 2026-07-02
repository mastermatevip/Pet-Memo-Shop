# Pet Memo Shop — 项目完成记录

> **记录日期：** 2026-06-30  
> **域名：** https://petmemoshop.com  
> **仓库：** `mastermatevip/Pet-Memo-Shop` · 分支 `main`  
> **Coolify 应用：** `pet--memo--shop:main-utmizb6yoyc2bdj78dblhyy3`  
> **状态：** ✅ 后台 CMS 一期全部完成，已上线

---

## 一、已完成里程碑

| 阶段 | 内容 | 状态 | 关键 Commit |
|------|------|------|-------------|
| 站点上线 | Next.js 独立站 + Coolify Docker 部署 | ✅ | `61bcac7` |
| 后台 CMS v1 | 中文管理后台：首页 + 商品编辑 | ✅ | `1ea225a` |
| 商品图片 | 多图编辑、本地上传、Sharp 压缩 WebP | ✅ | `680d8b7`–`770c50c` |
| 上传修复 | 自动保存 CMS、卷权限、Standalone 图片服务 | ✅ | `f4d808d`–`ada4af3` |
| 博客 CMS | 博客文章列表 + 单篇编辑，前台即时生效 | ✅ | `25b3098` |
| 多语言 i18n | next-intl：en/de/es/fr/zh，前台语言切换 + 内容翻译 | 🔄 | `5011265`–`5c505d7` |

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
| `data/cms/blog.json` | 博客 CMS 数据（18 篇 + 7 分类） | ✅ 同上 |
| `public/uploads/products/` | 商品上传图片 | ✅ Coolify 卷 `/app/public/uploads` |

- 首次启动若 JSON 不存在，从 `src/data/*.static.ts` 自动 seed
- 保存后 `revalidatePath`，前台 **无需重新 build**
- 本地上传图片通过 App Route `/uploads/products/[filename]` 服务（解决 Standalone 动态文件问题）

---

## 四、生产环境配置

### 环境变量（Coolify）

```env
NODE_ENV=production
PORT=3000
ADMIN_PASSWORD=强密码
ADMIN_SECRET=至少32位随机字符串
```

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

---

## 七、待办（下一期）

| 优先级 | 内容 | 文档 |
|--------|------|------|
| P1 | 多语言上线验收（Coolify 部署 `5c505d7`+） | `docs/deploy.md` |
| P1 | 多语言 Phase 2（CMS 多 locale、博客翻译） | `docs/i18n-roadmap.md` |
| P2 | 首页分类卡片/步骤等可视化编辑 | — |
| P3 | 博客分类管理、Featured Image | — |
| P4 | Cloudflare Access / IP 限制（可选安全加固） | `docs/admin.md` |

---

## 八、相关文档

| 文档 | 说明 |
|------|------|
| `docs/admin.md` | 后台使用说明 |
| `docs/deploy.md` | Coolify 部署指南 |
| `docs/i18n-roadmap.md` | 多语言工作计划 |
| `docs/seo-and-layout.md` | SEO 与布局 |
| `docs/product-catalog-bilingual.md` | 商品目录双语参考 |

---

## 九、Git 提交历史（CMS 相关）

```
25b3098 Add blog editing to admin CMS
ada4af3 Fix local upload image display in standalone Docker
b5fc80b Fix upload volume permissions on Coolify via entrypoint chown
f4d808d Fix product image upload to auto-save and replace in CMS immediately
770c50c Compress product uploads with sharp: resize to 2000px and convert to WebP
680d8b7 Add admin product image editor with multi-image support and upload API
1ea225a Add Chinese admin CMS for homepage and product editing
```

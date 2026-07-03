# Pet Memo Shop — 后台管理

> 文件型 CMS，用于编辑首页、商品与博客。多语言字段将在 v2 接入（见 `docs/i18n-roadmap.md`）。  
> **完成状态见：** `docs/project-status.md`

## 访问

| 路径 | 说明 |
|------|------|
| `/admin` | 控制台 |
| `/admin/login` | 登录 |
| `/admin/homepage` | 首页编辑 |
| `/admin/products` | 商品列表 |
| `/admin/products/[slug]` | 单商品编辑（含图片上传） |
| `/admin/blog` | 博客文章列表 |
| `/admin/blog/[slug]` | 单篇文章编辑 |
| `/admin/orders` | 订单列表 |
| `/admin/orders/new` | 新建订单 |
| `/admin/orders/[orderNumber]` | 单订单编辑（状态、物流、客户信息） |

## 环境变量

在 Coolify 或 `.env.local` 中设置：

```env
ADMIN_PASSWORD=你的强密码
ADMIN_SECRET=至少32位随机字符串
```

- `ADMIN_PASSWORD`：登录密码
- `ADMIN_SECRET`：用于签名 session cookie（可与密码不同，建议更长更随机）

未配置时无法登录；控制台会显示提示。

## 数据存储

| 文件 | 内容 |
|------|------|
| `data/cms/homepage.json` | 首页 Hero、区块标题、NFC 文案等 |
| `data/cms/products.json` | 全部商品 |
| `data/cms/blog.json` | 博客分类 + 全部文章 |
| `data/cms/orders.json` | 全部订单（状态、物流、客户资料） |

首次启动时，若 JSON 不存在，会从 `src/data/*.static.ts` 静态数据自动 seed。

上传目录：`public/uploads/products/`（商品图片，WebP 压缩）

## 生产部署（Coolify）

1. 在 Environment Variables 添加 `ADMIN_PASSWORD`、`ADMIN_SECRET`
2. 挂载持久卷：
   - `/app/data/cms` → CMS JSON（首页、商品、博客、订单）
   - `/app/public/uploads` → 上传的商品图片
3. Redeploy 后访问 `https://petmemoshop.com/admin`

> Docker 镜像通过 `docker-entrypoint.sh` 在启动时将 `/app/data`、`/app/public/uploads` 属主改为 `nextjs:nodejs`，解决 Coolify 卷默认 root 权限导致上传失败的问题。

## 本地开发

```bash
cp .env.example .env.local
# 编辑 ADMIN_PASSWORD / ADMIN_SECRET
npm run dev
```

打开 http://localhost:3000/admin

## 可编辑字段

### 首页

- Hero：标题、副标题、CTA、主图
- 各区块标题（分类、畅销、How it works、博客等）
- NFC 区块：标题、描述、图片、要点列表、CTA

分类卡片、步骤、个性化选项等仍来自静态 seed；后续版本可加入可视化编辑。

### 商品

- 标题、价格、促销价
- 短描述、长描述、Story
- SEO meta
- **多图编辑**：类型（主图/场景/细节等）、URL、Alt、排序
- **上传并替换**：本地选图 → Sharp 压缩（最大 2000px，WebP）→ 自动写入 CMS
- Tags、规格、Benefits

Slug 与 collection 只读（避免破坏 URL 与分类关联）。

### 博客

- 标题、摘要、分类、**发布状态（草稿 / 已发布）**、发布日期、阅读时长
- SEO 标题 / 描述
- 正文（Markdown 风格：`##` 标题、`###` 小标题、列表、表格、`[文字](链接)`）
- FAQ（格式：`问题|||答案`，每行一条）
- 关联商品 Slug、关联合集 Slug（英文逗号分隔）

Slug 只读（避免破坏 URL）。

**草稿与发布：**

- 代码中新增的文章默认为 **草稿**，前台不可见
- 在 `/admin/blog` 打开文章，将「发布状态」改为 **已发布** 并保存，前台即时上线
- 草稿不会出现在博客列表、首页推荐或 sitemap 中

### 订单

- 客户姓名、邮箱、电话、收货地址
- 订单商品（名称、数量、单价、关联商品 Slug）
- **订单状态**：待确认 / 样稿已发送 / 生产中 / 已发货 / 已完成 / 已取消
- **物流状态**：未发货 / 备货中 / 运输中 / 已签收 / 物流异常
- 物流公司、物流单号、发货时间
- 内部备注（仅后台可见）

订单号格式 `PA-100001`，新建时自动生成。客户可在前台 `/track-order` 用订单号 + 邮箱查询物流（不含内部备注）。

## SEO / Sitemap

- `https://petmemoshop.com/sitemap.xml` — 自动生成，含全部语言版本、商品、合集、已发布博客
- `https://petmemoshop.com/robots.txt` — 禁止爬取 `/admin` 与 `/api`

可在 Google Search Console 提交 sitemap URL。

## 图片上传说明

- 上传 API：`POST /api/admin/upload`（需登录，multipart，字段 `file` + `slug` + `imageIndex`）
- 文件保存至 `public/uploads/products/`，URL 形如 `/uploads/products/xxx.webp`
- Standalone 模式下通过 App Route `/uploads/products/[filename]` 提供图片访问
- 后台预览对本地上传使用原生 `<img>`，外链仍用 `next/image`

## 保存与前台

保存后 API 会调用 `revalidatePath`，前台页面使用 `force-dynamic` 读取最新 JSON，**无需重新 build**。

## 安全

- Session cookie：`httpOnly`、`sameSite=lax`、生产环境 `secure`
- 密码比对使用 `timingSafeEqual`
- `/admin` 与 `/api/admin/*`（除 login/logout）由 middleware 保护

建议：

- 使用长随机 `ADMIN_SECRET`
- 勿将 `.env.local` 提交到 Git
- 可考虑 IP 限制或 Cloudflare Access（可选）

## 相关文档

- 项目完成记录：`docs/project-status.md`
- 多语言计划：`docs/i18n-roadmap.md`
- 部署：`docs/deploy.md`

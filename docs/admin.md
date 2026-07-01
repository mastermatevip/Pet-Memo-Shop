# Pet Memo Shop — 后台管理

> 文件型 CMS，用于编辑首页文案与商品信息。多语言字段将在 v2 接入（见 `docs/i18n-roadmap.md`）。

## 访问

| 路径 | 说明 |
|------|------|
| `/admin` | 控制台 |
| `/admin/login` | 登录 |
| `/admin/homepage` | 首页编辑 |
| `/admin/products` | 商品列表 |
| `/admin/products/[slug]` | 单商品编辑 |

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

首次启动时，若 JSON 不存在，会从 `src/data/*.static.ts` 静态数据自动 seed。

上传目录（预留）：`public/uploads/`

## 生产部署（Coolify）

1. 在 Environment Variables 添加 `ADMIN_PASSWORD`、`ADMIN_SECRET`
2. 为持久化编辑内容，挂载 volume：
   - `/app/data/cms` → 持久卷
   - `/app/public/uploads` → 持久卷（若后续启用图片上传）
3. Redeploy 后访问 `https://petmemoshop.com/admin`

> Docker 镜像已创建 `data/cms` 与 `public/uploads` 目录并赋予 `nextjs` 用户写权限。

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
- 主图 URL / alt
- Tags、规格、Benefits

Slug 与 collection 只读（避免破坏 URL 与分类关联）。

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

- 多语言计划：`docs/i18n-roadmap.md`
- 部署：`docs/deploy.md`

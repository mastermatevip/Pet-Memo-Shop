# 数字纪念页 — 创建与发布流程

> 客户购买含数字纪念服务的商品后，在后台创建独立纪念页，通过专属链接与二维码访问。

---

## 适用商品

| 商品 Slug | 说明 |
|-----------|------|
| `digital-memorial-page-standalone` | 纯数字纪念页 |
| `carbon-fiber-nfc-memorial-tag` | 碳纤维 NFC 吊牌 + 数字页 |
| `nfc-pet-memorial-card` | NFC 纪念卡 + 数字页 |

---

## 完整流程

```
客户下单（PayPal 沙盒/正式）
    ↓ 自动
系统创建「草稿」纪念页（若订单含上述商品）
    ↓ 人工
后台 /admin/memorials 编辑内容
    ↓
上传照片 / 视频、填写故事、家人留言
    ↓
状态改为「已发布」并保存
    ↓
复制专属链接 + 下载 QR 码
    ↓
发给客户 / 写入 NFC 芯片 / 激光刻在卡片背面
```

---

## 1. 客户下单后（自动）

PayPal 付款成功后，若订单包含数字纪念类商品，系统会：

- 在 `data/cms/memorials.json` 创建 **草稿** 纪念页
- 将 slug 写入订单的 `memorialSlugs`
- 内部备注中的 `Pet name: xxx` 会尝试解析为宠物名

---

## 2. 后台编辑纪念页

| 路径 | 说明 |
|------|------|
| `/admin/memorials` | 纪念页列表 |
| `/admin/memorials/[slug]` | 编辑单页 |
| `/admin/orders/[orderNumber]` | 订单页可一键创建/跳转纪念页 |

### 可编辑内容

- 宠物名字、种类、生卒日期
- 主图（头像）
- 故事 / 生平（支持 `**粗体**`）
- 照片画廊（本地上传）与视频（上传或 YouTube/Vimeo 链接）
- 家人留言
- 访客留言（Guestbook，需审核后显示）
- **发布状态**：草稿 → 已发布

---

## 3. 专属链接与二维码

发布后访问地址：

```
https://petmemoshop.com/memorial/{slug}
```

示例：`https://petmemoshop.com/memorial/max-a1b2c3`

在纪念页编辑界面：

- **复制链接** — 发给客户微信/邮件
- **二维码预览 + 下载 PNG** — 用于 NFC 卡片背面、吊牌激光、印刷品

NFC 芯片编程：将上述 URL 写入 NFC 标签（使用 NFC Tools 等 App，线下操作）。

---

## 4. 前台纪念页内容

公开页（仅 **已发布** 状态）包含：

- 宠物头像、名字、日期
- Their Story（故事）
- Memories（照片 / 视频画廊）
- Messages from Family（家人留言）
- Guestbook（访客留言，可选）
- 页脚 Pet Memo Shop 品牌

---

## 5. 数据存储

| 路径 | 内容 |
|------|------|
| `data/cms/memorials.json` | 全部纪念页数据 |
| `public/uploads/memorials/` | 上传的照片 / 视频 |

Coolify 卷：`/app/data/cms` 与 `/app/public/uploads` 需已挂载。

---

## 6. API

| 路径 | 说明 |
|------|------|
| `GET /memorial/[slug]` | 公开纪念页 |
| `POST /api/memorial/[slug]/guestbook` | 访客提交留言 |
| `GET/POST /api/admin/memorials` | 后台列表 / 创建 |
| `PUT/DELETE /api/admin/memorials/[slug]` | 编辑 / 删除 |
| `POST /api/admin/memorials/upload` | 上传媒体 |
| `GET /api/admin/memorials/[slug]/qr` | 下载二维码 PNG |

---

## 相关文档

- PayPal 沙盒测试：`docs/paypal.md`
- 后台总览：`docs/admin.md`
- 项目状态：`docs/project-status.md`

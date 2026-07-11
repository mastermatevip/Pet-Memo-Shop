# 邮件配置

> 订单确认邮件与联系表单留言均通过 SMTP 发送。

---

## 联系表单

客户提交 `/contact` 表单后，留言发送至 **`hello@petmemoshop.com`**（即 `CONTACT_INBOX`，默认与 `BRAND.email` 相同）。

- API：`POST /api/contact`
- 邮件 `Reply-To` 设为客户填写的邮箱，便于直接回复
- 未配置 SMTP 时表单返回 503，页面提示改用 WhatsApp 或直接发邮件

可选环境变量：

```env
CONTACT_INBOX=hello@petmemoshop.com
```

---

## 订单确认邮件

> PayPal 结账或后台新建订单后，自动向客户邮箱发送订单确认邮件。

---

## 触发时机

| 场景 | 行为 |
|------|------|
| PayPal 支付成功 | 自动发送（异步，不阻塞订单创建） |
| 后台新建订单 | 默认发送；可取消勾选「创建后发送订单确认邮件」 |
| 后台编辑订单 | 不发送 |

未配置 SMTP 时，订单照常创建，仅在服务端日志输出警告，不影响结账流程。

---

## 环境变量

在 Coolify 或 `.env.local` 中设置：

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM=Pet Memo Shop <hello@petmemoshop.com>
# SMTP_SECURE=false   # 端口 465 时设为 true
```

| 变量 | 说明 |
|------|------|
| `SMTP_HOST` | SMTP 服务器地址 |
| `SMTP_PORT` | 端口，默认 `587` |
| `SMTP_USER` | 登录用户名 |
| `SMTP_PASS` | 登录密码或应用专用密码 |
| `SMTP_FROM` | 发件人显示名与地址；未设置时用 `SMTP_USER` |
| `SMTP_SECURE` | `true` 时使用 TLS（端口 465 时自动启用） |

修改环境变量后需 **Redeploy**（不能只 Restart）。

---

## 常用 SMTP 提供商

### Gmail（测试 / 小流量）

1. Google 账号开启两步验证
2. 生成 [应用专用密码](https://myaccount.google.com/apppasswords)
3. 配置：

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Pet Memo Shop <your@gmail.com>
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=Pet Memo Shop <hello@petmemoshop.com>
```

### 企业邮箱（腾讯/阿里/Outlook 等）

使用服务商提供的 SMTP 地址、端口与授权码即可。

---

## 邮件内容

确认邮件包含：

- 订单号
- 商品列表（名称、数量、单价）
- 订单总额
- 收货地址
- 设计稿确认说明（个性化商品）
- 「Track Order」与「My Account」链接

---

## 相关文件

| 文件 | 说明 |
|------|------|
| `src/lib/email/config.ts` | SMTP 配置读取 |
| `src/lib/email/send.ts` | 通用发送 |
| `src/lib/email/order-confirmation.ts` | 确认邮件模板与队列 |
| `src/lib/checkout/create-order.ts` | PayPal 结账后触发 |
| `src/app/api/admin/orders/route.ts` | 后台新建订单触发 |

---

## 本地测试

```bash
# .env.local 填入 SMTP 配置
npm run dev
```

1. 完成一次 Sandbox 结账，或
2. 在 `/admin/orders/new` 新建订单并勾选发送邮件

检查客户邮箱是否收到主题为 `Order Confirmation — PA-xxxxx | Pet Memo Shop` 的邮件。

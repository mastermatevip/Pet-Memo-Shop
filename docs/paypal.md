# PayPal Business 收款配置

> Pet Memo Shop 使用 **PayPal Checkout**（Smart Payment Buttons）收款。  
> 支付成功后自动写入 `data/cms/orders.json`，客户可用订单号 + 邮箱在 `/track-order` 查单。

---

## 目录

1. [前置条件](#1-前置条件)
2. [PayPal Developer 创建 REST App（详细步骤）](#2-paypal-developer-创建-rest-app详细步骤)
3. [Coolify 环境变量配置（详细步骤）](#3-coolify-环境变量配置详细步骤)
4. [Sandbox 测试完整流程](#4-sandbox-测试完整流程)
5. [切换到 Live 正式收款](#5-切换到-live-正式收款)
6. [购物流程说明](#6-购物流程说明)
7. [API 路由](#7-api-路由)
8. [常见问题](#8-常见问题)
9. [上线检查清单](#9-上线检查清单)

---

## 1. 前置条件

| 要求 | 说明 |
|------|------|
| **PayPal Business 账户** | 必须用 **企业/商家账户**，个人 PayPal 账户无法正式收款 |
| **账户验证** | Live 收款前需完成：邮箱验证、绑定银行卡/银行账户、身份/企业信息（按 PayPal 提示） |
| **Developer 账户** | 用 **同一个 Business 账户** 登录 Developer Dashboard，凭证与商家账户绑定 |
| **Coolify 已部署** | 站点 `https://petmemoshop.com` 可访问，且 `/app/data/cms` 卷已挂载（订单持久化） |

**注册 Business 账户（若还没有）：**

1. 打开 https://www.paypal.com/bizsignup
2. 选择 **Business Account**，按提示填写企业/个体信息
3. 完成邮箱验证与收款账户绑定

---

## 2. PayPal Developer 创建 REST App（详细步骤）

PayPal 有两套完全独立的凭证：**Sandbox（测试）** 和 **Live（正式）**。  
Client ID / Secret **不能混用**——Sandbox 凭证只能配 `PAYPAL_MODE=sandbox`，Live 凭证只能配 `PAYPAL_MODE=live`。

### 2.1 登录 Developer Dashboard

1. 打开 **https://developer.paypal.com/dashboard/**
2. 点击右上角 **Log in to Dashboard**
3. 使用你的 **PayPal Business 账户** 登录（与收款账户相同）

> 若首次登录，PayPal 可能要求同意 Developer 条款，按提示确认即可。

### 2.2 先创建 Sandbox App（建议先做测试）

1. 进入 Dashboard 后，左侧菜单点击 **Apps & Credentials**
2. 页面右上角找到 **Sandbox / Live** 切换开关，确保当前为 **Sandbox**
3. 点击 **Create App**（或 **Create App** 按钮）

**填写创建表单：**

| 字段 | 建议填写 |
|------|----------|
| **App Name** | `Pet Memo Shop Sandbox`（任意，便于识别） |
| **App Type** | 选 **Merchant**（商家收款，默认即可） |
| **Sandbox Business Account** | 下拉选择默认生成的 Sandbox 商家账户（通常已有一个） |

4. 点击 **Create App**

### 2.3 复制 Sandbox 凭证

创建成功后进入 App 详情页，页面顶部显示：

| 字段 | 操作 |
|------|------|
| **Client ID** | 直接复制（一长串字母数字） |
| **Secret** | 点击 **Show** → 复制 Secret（只显示一次，务必保存到密码管理器） |

**示例格式（非真实密钥）：**

```
Client ID:  AbCdEf1234567890_sandbox_xxxxxxxxxxxx
Secret:     EFGHiJ9876543210_sandbox_xxxxxxxxxxxx
```

> **注意：** Secret 泄露后可在同一页面 **Regenerate** 重新生成，旧 Secret 立即失效。

### 2.4 创建 Live App（正式收款）

测试通过后再做此步：

1. 回到 **Apps & Credentials**
2. 右上角切换为 **Live**
3. 再次点击 **Create App**

| 字段 | 建议填写 |
|------|----------|
| **App Name** | `Pet Memo Shop Live` |
| **App Type** | **Merchant** |
| **Live Business Account** | 选择你的真实 Business 收款账户 |

4. 点击 **Create App**
5. 同样复制 **Client ID** 和 **Secret（Show）**

> Live Secret 与 Sandbox Secret **完全不同**，请分别保存并标注环境。

### 2.5 获取 Sandbox 测试买家账户（用于模拟付款）

1. Developer Dashboard 左侧 → **Testing Tools** → **Sandbox Accounts**
2. 列表中会有 PayPal 自动创建的账户，例如：
   - **Business** 类型 → 模拟商家（收款方，一般不用来登录付款）
   - **Personal** 类型 → 模拟买家（用来测试付款）
3. 点击 Personal 账户右侧 **⋯** → **View/Edit account**
4. 记录 **Email** 和 **Password**（系统生成的测试密码）
5. 结账时在 PayPal 弹窗中用此 **Personal 沙箱账户** 登录并完成支付

> Sandbox 付款不会产生真实扣款。

### 2.6 凭证对应关系（重要）

```
┌─────────────────────────────────────────────────────────┐
│  Sandbox 环境                                            │
│  PAYPAL_MODE=sandbox                                     │
│  NEXT_PUBLIC_PAYPAL_CLIENT_ID = Sandbox App 的 Client ID │
│  PAYPAL_CLIENT_SECRET         = Sandbox App 的 Secret    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Live 环境（正式收款）                                    │
│  PAYPAL_MODE=live                                        │
│  NEXT_PUBLIC_PAYPAL_CLIENT_ID = Live App 的 Client ID    │
│  PAYPAL_CLIENT_SECRET         = Live App 的 Secret       │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Coolify 环境变量配置（详细步骤）

> 通用 Coolify 操作（进入面板、Add Variable、Redeploy、验证）见 **`docs/deploy.md` →「Coolify 环境变量设置（逐步）」**。  
> 本节侧重 PayPal 相关变量值与 Sandbox/Live 切换。

### 3.1 进入 Coolify 应用设置

1. 登录你的 Coolify 面板
2. 找到 Pet Memo Shop 应用（例如 `pet--memo--shop`）
3. 进入应用 → **Environment Variables**（环境变量）

### 3.2 添加 PayPal 变量（Sandbox 测试阶段）

点击 **Add Variable**，逐个添加：

| Key | Value | 说明 |
|-----|-------|------|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `（Sandbox Client ID）` | 前台加载 PayPal 按钮，**必须带 NEXT_PUBLIC_ 前缀** |
| `PAYPAL_CLIENT_SECRET` | `（Sandbox Secret）` | 服务端 API，**切勿泄露、勿提交 Git** |
| `PAYPAL_MODE` | `sandbox` | 测试阶段固定为 sandbox |

**可选（与上面 Client ID 相同即可）：**

| Key | Value |
|-----|-------|
| `PAYPAL_CLIENT_ID` | 同 Sandbox Client ID（服务端备用读取） |

**完整示例（Sandbox）：**

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AbCdEf1234567890_sandbox_xxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=EFGHiJ9876543210_sandbox_xxxxxxxxxxxx
PAYPAL_MODE=sandbox
```

### 3.3 保存并重新部署

1. 保存所有环境变量
2. 点击 **Redeploy**（或 **Restart**）使变量生效  
   > Next.js 在 **构建时** 会内联 `NEXT_PUBLIC_*` 变量，修改后 **必须 Redeploy**，不能只 Restart。

### 3.4 切换到 Live（正式收款）

测试通过后，在 Coolify 中 **替换** 为 Live 凭证：

| Key | 修改为 |
|-----|--------|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Live App 的 Client ID |
| `PAYPAL_CLIENT_SECRET` | Live App 的 Secret |
| `PAYPAL_MODE` | `live` |

再次 **Redeploy**。

### 3.5 本地开发（.env.local）

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=你的Sandbox_Client_ID
PAYPAL_CLIENT_SECRET=你的Sandbox_Secret
PAYPAL_MODE=sandbox
```

```bash
npm run dev
```

打开 http://localhost:3000/checkout 验证 PayPal 按钮是否出现。

### 3.6 变量说明汇总

| 变量 | 必填 | 暴露范围 | 说明 |
|------|------|----------|------|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | ✅ | 浏览器可见（正常） | PayPal SDK 公开 Client ID |
| `PAYPAL_CLIENT_SECRET` | ✅ | 仅服务端 | 创建/捕获订单，**绝不可加 NEXT_PUBLIC_** |
| `PAYPAL_MODE` | 推荐 | 服务端 | `sandbox` 或 `live`，默认 sandbox |
| `PAYPAL_CLIENT_ID` | 可选 | 服务端 | 与上面 Client ID 相同，作备用 |

未配置时，结账页显示「PayPal is not configured」，站点其他功能不受影响。

---

## 4. Sandbox 测试完整流程

1. Coolify 已设置 Sandbox 凭证 + `PAYPAL_MODE=sandbox`，并已 Redeploy
2. 打开 https://petmemoshop.com → 任选商品 → **Add to Cart**
3. 进入 **/checkout**，填写：
   - Full Name、Email、Shipping Address（测试数据即可）
   - Personalization（可选）
4. 点击 **PayPal** 按钮 → 在弹窗中用 **Sandbox Personal 账户** 登录
5. 确认 Sandbox 余额/测试卡完成付款
6. 应跳转到 **/checkout/success?order=PA-xxxxx**
7. 验证：
   - **/admin/orders** 出现新订单，状态「待确认」
   - 内部备注含 `PayPal capture: xxxxx`
   - **/track-order** 用订单号 + 结账邮箱可查到

---

## 5. 切换到 Live 正式收款

| 步骤 | 操作 |
|------|------|
| 1 | 确认 PayPal Business 账户已完成全部验证（可收到真实付款） |
| 2 | Developer Dashboard → **Live** → 创建 Live App，复制凭证 |
| 3 | Coolify 替换为 Live Client ID + Secret |
| 4 | `PAYPAL_MODE=live` |
| 5 | **Redeploy** |
| 6 | 用真实 PayPal 账户做 **一笔小额真实订单**（如最便宜 SKU） |
| 7 | 在 PayPal Business 后台 **Activity** 确认入账 |
| 8 | 在 **/admin/orders** 确认订单已生成 |

---

## 6. 购物流程说明

```
商品页 Add to Cart / Buy Now
    → /cart
    → /checkout（填写地址 + 个性化说明）
    → PayPal 按钮支付
    → /checkout/success?order=PA-100003
    → 后台 /admin/orders 可见新订单
```

- 价格在服务端从 CMS 商品数据校验，不信任前端传价
- 支付捕获成功后订单状态为 **待确认**（`pending`）
- PayPal 交易号写入订单 **内部备注**

---

## 7. API 路由

| 路径 | 说明 |
|------|------|
| `POST /api/paypal/create-order` | 创建 PayPal 订单 |
| `POST /api/paypal/capture-order` | 捕获付款并写入 CMS 订单 |

---

## 8. 常见问题

### 结账页显示「PayPal is not configured」

- Coolify 未设置 `NEXT_PUBLIC_PAYPAL_CLIENT_ID` 或 `PAYPAL_CLIENT_SECRET`
- 修改 `NEXT_PUBLIC_*` 后未 **Redeploy**（仅 Restart 不够）

### 点击 PayPal 按钮报错 / 无法创建订单

- `PAYPAL_MODE` 与凭证环境不匹配（Sandbox 凭证 + `live` 模式）
- Secret 复制不完整或含多余空格
- Secret 已 Regenerate 但 Coolify 仍用旧值

### Sandbox 能付，Live 失败

- Business 账户未完成验证或未绑定银行账户
- Live App 未创建或用了 Sandbox 的 Client ID
- 确认 `PAYPAL_MODE=live` 且已 Redeploy

### 付款成功但后台无订单

- Coolify 未挂载 `/app/data/cms` 卷，订单 JSON 未持久化
- 查看 Coolify 应用日志中 `/api/paypal/capture-order` 是否报错

### Client ID 可以公开吗？

可以。PayPal Client ID 设计为可在前端使用；**Secret 必须保密**，仅存在于服务端环境变量。

### 需要配置 Webhook 吗？

当前版本在客户完成支付时通过 **capture API** 同步建单，不强制 Webhook。  
若后续需要 PayPal 后台退款/争议通知，可在 Developer Dashboard → App → **Webhooks** 添加。

---

## 9. 上线检查清单

- [ ] PayPal Business 账户验证完成
- [ ] Live REST App 已创建，Client ID + Secret 已保存
- [ ] Coolify 环境变量：`NEXT_PUBLIC_PAYPAL_CLIENT_ID`、`PAYPAL_CLIENT_SECRET`、`PAYPAL_MODE=live`
- [ ] 修改环境变量后已 **Redeploy**
- [ ] `/app/data/cms` 卷已挂载
- [ ] Sandbox 测试订单全流程通过
- [ ] Live 小额真实测试订单通过
- [ ] `/admin/orders` 与 PayPal Activity 金额一致

---

## 相关文档

- 后台订单管理：`docs/admin.md`
- 部署：`docs/deploy.md`

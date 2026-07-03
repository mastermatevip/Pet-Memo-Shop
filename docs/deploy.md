# Pet Memo Shop — 部署指南

> 域名：**petmemoshop.com**  
> 仓库：`mastermatevip/Pet-Memo-Shop` · 分支 `main`  
> 方式：与 **carbonfactorys.com（碳工厂）** 相同 — **GitHub push → Coolify 自动构建上线**  
> **完成状态见：** `docs/project-status.md`

---

## 架构

```
本地改代码 → .\deploy.ps1 → GitHub main 更新 → Coolify webhook → Docker build → 上线
```

Pet Memo Shop 为 Next.js Standalone + **文件型 CMS 后台**，需挂载持久卷保存编辑内容与上传图片。

---

## 一、首次部署（Coolify 面板，只做一次）

在 **与 carbonfactorys 同一台 Coolify VPS** 上：

1. **GitHub** — 仓库：`mastermatevip/Pet-Memo-Shop`

2. **Coolify** → **+ New Resource** → **Application** → **Public Repository**  
   - Repository：`https://github.com/mastermatevip/Pet-Memo-Shop`  
   - Branch：`main`  
   - Build Pack：**Dockerfile**（项目根目录已有 `Dockerfile`）  
   - Port：`3000`  
   - Domain：`petmemoshop.com`（及可选 `www.petmemoshop.com` → 站内已 301 到非 www）

3. **Environment Variables**（详见下方 [「Coolify 环境变量设置（逐步）」](#coolify-环境变量设置逐步)）

4. **持久卷挂载**（Storages / Volumes）：
   | 容器路径 | 用途 |
   |----------|------|
   | `/app/data/cms` | CMS JSON（homepage、products、blog、orders） |
   | `/app/public/uploads` | 商品上传图片 |

5. **Deploy** — 首次手动点 Deploy，确认 Build 成功、容器 Running。

6. **DNS** — 域名 A/CNAME 指向 Coolify 服务器（与 carbonfactorys 同 IP 即可，Coolify 按域名路由）。

7. **SSL** — Coolify 里为 `petmemoshop.com` 开启 Let's Encrypt。

8. **验收后台** — 访问 `https://petmemoshop.com/admin`，用 `ADMIN_PASSWORD` 登录。

---

## Coolify 环境变量设置（逐步）

> 适用于 Pet Memo Shop 在 Coolify 上的全部环境变量。PayPal 凭证获取见 `docs/paypal.md`。

### 1. 打开环境变量页面

1. 浏览器登录 **Coolify 面板**（与 carbonfactorys 同一台 VPS）
2. 左侧 **Projects** → 选择 Pet Memo Shop 所在项目
3. 点击应用 **petmemoshop**（或 `Pet-Memo-Shop`）
4. 顶部标签页选择 **Environment Variables**（部分版本显示为 **Environment**）

页面上通常有两块：

| 区域 | 说明 |
|------|------|
| **Production Environment Variables** | 生产环境（本站点用这个） |
| **Preview / Development** | 预览环境（若未启用可忽略） |

以下变量均加在 **Production** 区域。

### 2. 添加一条变量

对每条变量重复以下操作：

1. 点击 **+ Add** / **New Variable** / **Add Environment Variable**
2. **Key（名称）** — 必须与下表完全一致（区分大小写）
3. **Value（值）** — 粘贴实际内容，**前后不要有空格或换行**
4. 若有关闭 **「Available at Buildtime」** / **Build Variable** 选项：
   - `NEXT_PUBLIC_*` 变量 → **勾选 Buildtime**（构建时需要）
   - `PAYPAL_CLIENT_SECRET`、`ADMIN_*` → 仅 Runtime 即可（勾选 Buildtime 也无妨）
5. 点击 **Save** / **Add**

> Coolify 不同版本界面略有差异；核心是 Key + Value 成对保存。

### 3. 完整变量清单

#### 必填（站点 + 后台）

| Key | 示例值 | 说明 |
|-----|--------|------|
| `NODE_ENV` | `production` | 生产模式 |
| `PORT` | `3000` | 容器监听端口，与 Dockerfile 一致 |
| `ADMIN_PASSWORD` | `（强密码）` | `/admin` 登录密码 |
| `ADMIN_SECRET` | `（32位以上随机字符串）` | Session 签名密钥，可与密码不同 |

#### 必填（PayPal 收款）

| Key | 示例值 | 说明 |
|-----|--------|------|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `AbCdEf...` | PayPal App 的 Client ID，**必须有 `NEXT_PUBLIC_` 前缀** |
| `PAYPAL_CLIENT_SECRET` | `EFGHiJ...` | PayPal App 的 Secret，**仅服务端，勿泄露** |
| `PAYPAL_MODE` | `sandbox` 或 `live` | 测试用 `sandbox`，正式收款用 `live` |

#### 可选

| Key | 示例值 | 说明 |
|-----|--------|------|
| `PAYPAL_CLIENT_ID` | 同 Client ID | 服务端备用，与 `NEXT_PUBLIC_PAYPAL_CLIENT_ID` 相同即可 |
| `NEXT_PUBLIC_SITE_URL` | `https://petmemoshop.com` | 默认已从 `brand.ts` 读取，一般可不设 |

**Sandbox 测试阶段示例：**

```env
NODE_ENV=production
PORT=3000
ADMIN_PASSWORD=你的强密码
ADMIN_SECRET=至少32位随机字符串
NEXT_PUBLIC_PAYPAL_CLIENT_ID=Sandbox的Client_ID
PAYPAL_CLIENT_SECRET=Sandbox的Secret
PAYPAL_MODE=sandbox
```

**正式上线示例：**

```env
PAYPAL_MODE=live
NEXT_PUBLIC_PAYPAL_CLIENT_ID=Live的Client_ID
PAYPAL_CLIENT_SECRET=Live的Secret
```

> Sandbox 与 Live 的 Client ID / Secret **不能混用**。详见 `docs/paypal.md`。

### 4. 保存后必须 Redeploy

修改环境变量后：

1. 回到应用主页，点击 **Redeploy** / **Deploy**
2. 等待 **Deployments** 中最新一条变为 **Success / Running**

**为什么必须 Redeploy？**

- `NEXT_PUBLIC_*` 变量在 **`npm run build` 时**写入前端代码
- 只 **Restart** 容器不会重新 build，PayPal 按钮可能仍显示「未配置」
- 修改 `PAYPAL_CLIENT_SECRET`、`ADMIN_PASSWORD` 等纯服务端变量，Restart 有时够用，但 **Redeploy 最稳妥**

### 5. 编辑 / 删除已有变量

1. **Environment Variables** 列表中找到对应 Key
2. 点击 **Edit**（铅笔图标）→ 修改 Value → **Save**
3. 删除：点击 **Delete** / 垃圾桶图标
4. 修改后同样执行 **Redeploy**

### 6. 验证是否生效

| 检查项 | 方法 |
|--------|------|
| 后台登录 | 访问 `https://petmemoshop.com/admin`，用 `ADMIN_PASSWORD` 登录 |
| PayPal 按钮 | 加商品 → `/checkout`，应出现 PayPal 按钮（非「未配置」提示） |
| 构建含新变量 | Coolify → **Deployments** → 最新 Build Log 无 env 相关报错 |
| 服务端 Secret | 故意填错 Secret 时，点击 PayPal 支付会在创建订单阶段报错 |

**在容器内确认（可选）：**

Coolify → 应用 → **Terminal** / **Execute Command**：

```bash
printenv | grep -E 'PAYPAL|ADMIN|NODE_ENV|PORT'
```

应能看到已设置的 Key（Secret 会显示，注意勿截图外泄）。

### 7. 安全注意

- **不要**把 `PAYPAL_CLIENT_SECRET`、`ADMIN_PASSWORD`、`ADMIN_SECRET` 提交到 Git
- **不要**给 Secret 类变量加 `NEXT_PUBLIC_` 前缀
- PayPal Secret 若在 Developer Dashboard **Regenerate**，需同步更新 Coolify 并 Redeploy
- 建议使用密码管理器保存 Coolify 与 PayPal 凭证

### 8. 常见问题

| 现象 | 处理 |
|------|------|
| 改了 PayPal 变量但结账页仍「未配置」 | 确认 Key 为 `NEXT_PUBLIC_PAYPAL_CLIENT_ID`，且已 **Redeploy**（非仅 Restart） |
| `/admin` 无法登录 | 检查 `ADMIN_PASSWORD`、`ADMIN_SECRET` 是否已设且已 Redeploy |
| PayPal 按钮出现但支付失败 | 检查 `PAYPAL_MODE` 是否与凭证环境一致（Sandbox 配 `sandbox`） |
| 变量列表为空但站点能跑 | 可能变量设在错误环境（Preview）；确认在 **Production** 区域添加 |

---

## 二、日常更新（一条命令）

```powershell
cd I:\独立站\宠物纪念\pawaura
.\deploy.ps1
```

或：

```powershell
npm run deploy
```

脚本流程：

1. `npm ci`（与 Coolify Docker 相同，校验 lock 文件）
2. `npm run build`（本地验证构建）
3. `git add` + `commit`（有变更时）
4. `git push origin main`
5. Coolify 收到 webhook 后自动 rebuild + 切换容器

跳过本地构建（仅推送已有 commit）：

```powershell
.\deploy.ps1 -SkipBuild
```

> **重要：** 不要跳过本地构建就 push 依赖变更。Coolify 使用 `npm ci`，lock 不同步会在服务器上直接失败（见下方「Coolify 构建失败记录」）。

---

## 三、GitHub Push 失败（国内网络）

与碳工厂相同，直连 `github.com:443` 可能超时。在 `deploy.local.config` 里配置代理：

```ini
GIT_PROXY=http://127.0.0.1:10808
```

或单次 push：

```powershell
git -c "http.proxy=http://127.0.0.1:10808" -c "https.proxy=http://127.0.0.1:10808" push origin main
```

详细排障见碳工厂文档：`I:\独立站\碳工厂\碳工厂\carbonedge\GitHub-Push排障.md`

---

## 四、Push 成功但线上未更新

1. 打开 Coolify → **petmemoshop** → **Deployments**
2. 确认最新 deployment 对应刚 push 的 commit SHA
3. 若 Failed：看 Build Log（常见：Node 版本、npm ci 失败）
4. 必要时手动 **Redeploy**

---

## 五、Coolify 构建失败记录（必读）

> **记录日期：** 2026-07-02  
> **现象：** Push 成功，Coolify Deployment **Failed**（约 14 秒），线上仍是旧版本（无 i18n、无语言切换、`/zh` 404）。

### 事故 1：`npm ci` — lock 文件不同步

| 项目 | 内容 |
|------|------|
| **报错** | `Missing: @swc/helpers@0.5.23 from lock file` |
| **阶段** | Dockerfile `RUN npm ci` |
| **原因** | 加入 `next-intl` 后只改了 `package.json`，lock 未同步；`next-intl` 内嵌的 `@swc/core` 需要 `@swc/helpers >= 0.5.17`，lock 里仍是 Next 自带的 `0.5.15` |
| **修复 commit** | `5c505d7` — 显式添加 `@swc/helpers@^0.5.23` 并提交 `package-lock.json` |

**以后避免：**

- 执行 `npm install <包名>` 或改 `package.json` 后，**必须** `git add package-lock.json` 一并提交
- 推送前本地跑 **`npm ci`**（`deploy.ps1` 已自动执行，与 Docker 一致）
- 不要只用 `npm run build` 而跳过 `npm ci` — 本地 npm 11 有时能 build，Docker 里 npm 10 的 `npm ci` 仍会失败

### 事故 2：`next/font/google` — 构建期访问 Google Fonts

| 项目 | 内容 |
|------|------|
| **报错** | `Failed to fetch Cormorant Garamond / Inter from Google Fonts` |
| **阶段** | Dockerfile `RUN npm run build` |
| **原因** | `next/font/google` 在 **build 时**请求 `fonts.googleapis.com`；Coolify VPS 常无法访问 |
| **修复 commit** | `d06e289` — 改为 `layout.tsx` 内 `<link>` 运行时加载字体 |

**以后避免：**

- **禁止**在项目中使用 `next/font/google`
- 字体用 `layout.tsx` 的 `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` + `globals.css` 里的 `font-family` 字符串
- 若需完全离线构建，改为自托管字体文件（`public/fonts/` + `@font-face`）

### 推送前检查清单

```powershell
cd I:\独立站\宠物纪念\pawaura
npm ci          # 必须通过（模拟 Coolify）
npm run build   # 必须通过
git status      # 若有 package-lock.json 变更，必须 commit
.\deploy.ps1    # 或手动 push
```

### Coolify 验收（部署成功后）

- [ ] Deployments 最新 commit SHA 与 GitHub `main` 一致
- [ ] Build Log 中 `npm ci`、`npm run build` 均为成功
- [ ] https://petmemoshop.com/ Header 有语言切换（🌐 EN ▼）
- [ ] https://petmemoshop.com/zh 返回 200（非 404）

---

## 六、常见问题

### 上传图片失败 / 后台图片不显示

1. 确认 `/app/public/uploads` 卷已挂载
2. 进入容器检查文件是否存在：
   ```bash
   ls -la /app/public/uploads/products/
   ```
3. 确认属主为 `nextjs:nodejs`（entrypoint 会自动 chown；旧容器可手动执行）：
   ```bash
   chown -R nextjs:nodejs /app/public/uploads
   ```
4. 直接访问图片 URL 验证：
   `https://petmemoshop.com/uploads/products/xxx.webp`

### CMS 编辑丢失

确认 `/app/data/cms` 卷已挂载，且包含 `homepage.json`、`products.json`、`blog.json`。

---

## 七、本地开发 vs 生产

| 命令 | 用途 |
|------|------|
| `npm run dev` | 本地开发 http://localhost:3000 |
| `npm ci` | 与 Docker 相同的依赖安装（推送前必跑） |
| `npm run build` | 生产构建验证 |
| `npm start` | 本地跑生产构建（需先 build） |
| `.\deploy.ps1` | npm ci + build + 推 GitHub + 触发 Coolify |

---

## 八、文件清单

| 文件 | 作用 |
|------|------|
| `Dockerfile` | Coolify Docker 构建（Next.js standalone + gosu） |
| `docker-entrypoint.sh` | 启动时修复卷权限 |
| `next.config.ts` | `output: 'standalone'`、www 重定向、安全头 |
| `deploy.ps1` | 一键构建 + git push |
| `deploy.local.config.example` | 仓库 URL、代理端口模板 |
| `.env.example` | 环境变量说明 |

---

## 九、与碳工厂的差异

| 项目 | 碳工厂 | Pet Memo Shop |
|------|--------|---------------|
| 仓库 | `mastermatevip/carbonfactorys` | `mastermatevip/Pet-Memo-Shop` |
| 多语言 | `/[lang]/...` | `/` 英文；`/de/` `/es/` `/fr/` `/zh/`（next-intl） |
| 后台 | Supabase + 管理后台 | 文件型 CMS（首页/商品/博客），仅中文 |
| 数据目录 | `data/`、`public/uploads/` | 同上，需 Coolify 卷 |
| 部署复杂度 | 较高 | 中等；注意 `npm ci` 与字体加载约束 |

---

## 十、验收清单（上线后）

- [x] https://petmemoshop.com/ 首页正常
- [x] 商品页、博客页正常
- [x] https://petmemoshop.com/admin 登录与编辑
- [x] 商品图片上传与显示
- [x] 博客编辑保存后前台更新
- [x] https://petmemoshop.com/sitemap.xml
- [x] www → 非 www 301
- [x] HTTPS 证书有效
- [ ] 多语言路由 `/zh` 等 + Header 语言切换（i18n 部署成功后）

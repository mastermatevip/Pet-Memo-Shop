# Pet Memo Shop — 部署指南

> 域名：**petmemoshop.com**  
> 仓库：`mastermatevip/petmemoshop` · 分支 `main`  
> 方式：与 **carbonfactorys.com（碳工厂）** 相同 — **GitHub push → Coolify 自动构建上线**

---

## 架构

```
本地改代码 → .\deploy.ps1 → GitHub main 更新 → Coolify webhook → Docker build → 上线
```

Pet Memo Shop 是纯展示型 Next.js 站点（无后台上传目录），比碳工厂更简单，不需要 `data/` / `public/uploads/` 权限配置。

---

## 一、首次部署（Coolify 面板，只做一次）

在 **与 carbonfactorys 同一台 Coolify VPS** 上：

1. **GitHub** — 创建仓库 `mastermatevip/petmemoshop`（Private 即可），不要初始化 README（本地已有代码）。

2. **Coolify** → **+ New Resource** → **Application** → **Public Repository**  
   - Repository：`https://github.com/mastermatevip/petmemoshop`  
   - Branch：`main`  
   - Build Pack：**Dockerfile**（项目根目录已有 `Dockerfile`）  
   - Port：`3000`  
   - Domain：`petmemoshop.com`（及可选 `www.petmemoshop.com` → 站内已 301 到非 www）

3. **Environment Variables**（Coolify → Environment）：
   ```
   NODE_ENV=production
   PORT=3000
   ```

4. **Deploy** — 首次手动点 Deploy，确认 Build 成功、容器 Running。

5. **DNS** — 域名 A/CNAME 指向 Coolify 服务器（与 carbonfactorys 同 IP 即可，Coolify 按域名路由）。

6. **SSL** — Coolify 里为 `petmemoshop.com` 开启 Let's Encrypt。

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

1. `npm run build`（本地验证构建）
2. `git add` + `commit`（有变更时）
3. `git push origin main`
4. Coolify 收到 webhook 后自动 rebuild + 切换容器

跳过本地构建（仅推送已有 commit）：

```powershell
.\deploy.ps1 -SkipBuild
```

---

## 三、GitHub Push 失败（国内网络）

与碳工厂相同，直连 `github.com:443` 可能超时。在 `deploy.local.config` 里配置代理：

```ini
GIT_PROXY=http://127.0.0.1:10808
```

或全局一次配置：

```powershell
git config --global http.https://github.com.proxy http://127.0.0.1:10808
```

详细排障见碳工厂文档：`I:\独立站\碳工厂\碳工厂\carbonedge\GitHub-Push排障.md`

---

## 四、Push 成功但线上未更新

1. 打开 Coolify → **petmemoshop** → **Deployments**
2. 确认最新 deployment 对应刚 push 的 commit SHA
3. 若 Failed：看 Build Log（常见：Node 版本、npm ci 失败）
4. 必要时手动 **Redeploy**

---

## 五、本地开发 vs 生产

| 命令 | 用途 |
|------|------|
| `npm run dev` | 本地开发 http://localhost:3000 |
| `npm run build` | 生产构建验证 |
| `npm start` | 本地跑生产构建（需先 build） |
| `.\deploy.ps1` | 构建 + 推 GitHub + 触发 Coolify |

---

## 六、文件清单

| 文件 | 作用 |
|------|------|
| `Dockerfile` | Coolify Docker 构建（Next.js standalone） |
| `next.config.ts` | `output: 'standalone'`、www 重定向、安全头 |
| `deploy.ps1` | 一键构建 + git push |
| `deploy.local.config.example` | 仓库 URL、代理端口模板 |
| `.env.example` | 环境变量说明 |

---

## 七、与碳工厂的差异

| 项目 | 碳工厂 | Pet Memo Shop |
|------|--------|---------------|
| 仓库 | `mastermatevip/carbonfactorys` | `mastermatevip/petmemoshop` |
| 多语言 | `/[lang]/...` | 仅英文，无语言前缀 |
| 后台/API | Supabase + 管理后台 + uploads | 无（静态产品数据在 `src/data/`） |
| 数据目录 | `data/`、`public/uploads/` 需权限 | 不需要 |
| 部署复杂度 | 较高 | 较低 |

---

## 八、验收清单（上线后）

- [ ] https://petmemoshop.com/ 首页 Logo + 产品正常
- [ ] https://petmemoshop.com/products/carbon-fiber-nfc-memorial-tag
- [ ] https://petmemoshop.com/digital-pet-memorial
- [ ] https://petmemoshop.com/sitemap.xml
- [ ] www → 非 www 301
- [ ] HTTPS 证书有效

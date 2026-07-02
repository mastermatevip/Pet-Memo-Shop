# Pet Memo Shop — deploy to production (GitHub → Coolify)
# Same workflow as carbonfactorys.com:
#   local push → GitHub main → Coolify webhook → Docker build → live
#
# Usage:
#   1. Copy deploy.local.config.example → deploy.local.config (edit repo/proxy if needed)
#   2. .\deploy.ps1
#   3. Or: npm run deploy
param(
  [switch]$SkipBuild,
  [switch]$SkipCommit,
  [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$CfgFile = Join-Path $Root "deploy.local.config"

$Repo = "https://github.com/mastermatevip/Pet-Memo-Shop.git"
$Branch = "main"
$Proxy = ""

if (Test-Path $CfgFile) {
  Get-Content $CfgFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -eq "" -or $line.StartsWith("#")) { return }
    $i = $line.IndexOf("=")
    if ($i -le 0) { return }
    $k = $line.Substring(0, $i).Trim()
    $v = $line.Substring($i + 1).Trim()
    if ($k -eq "GITHUB_REPO" -and $v) { $Repo = $v }
    if ($k -eq "GIT_BRANCH" -and $v) { $Branch = $v }
    if ($k -eq "GIT_PROXY" -and $v) { $Proxy = $v }
    if ($k -eq "COMMIT_MESSAGE" -and $v -and -not $Message) { $Message = $v }
  }
}

Push-Location $Root
try {
  if (-not $SkipBuild) {
    Write-Host ">> npm ci (same as Coolify Docker deps stage)"
    npm ci 2>&1 | Out-Host
    if ($LASTEXITCODE -ne 0) {
      throw @"
npm ci failed — package.json and package-lock.json are out of sync.
Run: npm install
Then commit package-lock.json and retry.
See docs/deploy.md section 'Coolify build failures'.
"@
    }

    Write-Host ">> npm run build"
    npm run build 2>&1 | Out-Host
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }
  }

  if (-not (Test-Path ".git")) {
    Write-Host ">> git init"
    git init
    git branch -M $Branch
  }

  $remote = git remote get-url origin 2>$null
  if (-not $remote) {
    Write-Host ">> git remote add origin $Repo"
    git remote add origin $Repo
  } elseif ($remote -ne $Repo) {
    Write-Host ">> git remote set-url origin $Repo"
    git remote set-url origin $Repo
  }

  if ($Proxy) {
    Write-Host ">> git push via proxy $Proxy"
    git -c "http.proxy=$Proxy" -c "https.proxy=$Proxy" config --local http.https://github.com.proxy $Proxy
  }

  if (-not $SkipCommit) {
    git add -A
    $status = git status --porcelain
    if ($status) {
      if (-not $Message) { $Message = "Deploy Pet Memo Shop — $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
      Write-Host ">> git commit"
      git commit -m $Message
      if ($LASTEXITCODE -ne 0) { throw "Commit failed" }
    } else {
      Write-Host ">> No local changes to commit"
    }
  }

  $ahead = git rev-list --count "origin/$Branch..HEAD" 2>$null
  if ($null -eq $ahead) {
    Write-Host ">> First push to origin/$Branch"
  } elseif ([int]$ahead -eq 0) {
    Write-Host ">> Already up to date with origin/$Branch"
    Write-Host ">> Done. https://petmemoshop.com/"
    return
  }

  Write-Host ">> git push origin $Branch"
  if ($Proxy) {
    git -c "http.proxy=$Proxy" -c "https.proxy=$Proxy" push -u origin $Branch 2>&1 | Out-Host
  } else {
    git push -u origin $Branch 2>&1 | Out-Host
  }
  if ($LASTEXITCODE -ne 0) {
    throw @"
Push failed. If github.com:443 times out, set GIT_PROXY in deploy.local.config
(e.g. http://127.0.0.1:10808) — see docs/deploy.md and carbon factory GitHub-Push排障.md
"@
  }

  Write-Host ">> Push OK — Coolify will auto-deploy from GitHub main"
  Write-Host ">> Live site: https://petmemoshop.com/"
  Write-Host ">> Check Coolify Deployments if the site does not update within a few minutes"
} finally {
  Pop-Location
}

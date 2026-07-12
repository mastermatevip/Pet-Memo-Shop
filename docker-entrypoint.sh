#!/bin/sh
set -e

# Coolify 持久卷默认属主为 root，启动前改为 nextjs 以便读写 CMS / 上传
for dir in /app/data /app/data/cms /app/public/uploads /app/public/uploads/.cms-backup /app/public/uploads/homepage /app/public/uploads/products; do
  mkdir -p "$dir" 2>/dev/null || true
  if [ -d "$dir" ]; then
    chown -R nextjs:nodejs "$dir" 2>/dev/null || true
  fi
done

# 启动自愈：若 CMS 卷被清空但 uploads 备份仍在，先拷回 homepage.json
if [ ! -f /app/data/cms/homepage.json ] && [ -f /app/public/uploads/.cms-backup/homepage.json ]; then
  cp /app/public/uploads/.cms-backup/homepage.json /app/data/cms/homepage.json
  chown nextjs:nodejs /app/data/cms/homepage.json 2>/dev/null || true
  echo "[entrypoint] Restored homepage.json from uploads backup"
fi

# 写探测文件，便于确认卷可写（失败不阻断启动）
gosu nextjs sh -c 'echo ok > /app/data/cms/.write-test && rm -f /app/data/cms/.write-test' 2>/dev/null \
  || echo "[entrypoint] WARNING: /app/data/cms not writable by nextjs"
gosu nextjs sh -c 'mkdir -p /app/public/uploads/.cms-backup && echo ok > /app/public/uploads/.cms-backup/.write-test && rm -f /app/public/uploads/.cms-backup/.write-test' 2>/dev/null \
  || echo "[entrypoint] WARNING: /app/public/uploads/.cms-backup not writable by nextjs"

exec gosu nextjs "$@"

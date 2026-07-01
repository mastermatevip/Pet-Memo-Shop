#!/bin/sh
set -e

# Coolify 持久卷默认属主为 root，启动前改为 nextjs 以便上传图片
for dir in /app/data /app/public/uploads; do
  if [ -d "$dir" ]; then
    chown -R nextjs:nodejs "$dir" 2>/dev/null || true
  fi
done

exec gosu nextjs "$@"

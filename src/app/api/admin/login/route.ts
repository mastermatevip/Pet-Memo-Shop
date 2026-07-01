import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  isAdminConfigured,
  sessionCookieOptions,
  createSessionToken,
  verifyPassword,
} from "@/lib/cms/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "后台未配置" }, { status: 503 });
  }

  const body = (await request.json()) as { password?: string };
  if (!body.password || !verifyPassword(body.password)) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }

  const token = createSessionToken();
  const jar = await cookies();
  jar.set(sessionCookieOptions(token));

  return NextResponse.json({ ok: true });
}

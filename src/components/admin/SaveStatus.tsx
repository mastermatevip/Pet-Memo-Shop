"use client";

interface SaveStatusProps {
  status: "idle" | "saving" | "saved" | "error";
  message?: string;
}

export function SaveStatus({ status, message }: SaveStatusProps) {
  if (status === "idle") return null;

  const text =
    message ??
    (status === "saving"
      ? "保存中…"
      : status === "saved"
        ? "已保存"
        : "保存失败");

  const color =
    status === "error" ? "text-red-700" : status === "saved" ? "text-green-700" : "text-muted";

  return <p className={`text-sm ${color}`}>{text}</p>;
}

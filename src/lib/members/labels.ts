export const MEMBER_STATUS_LABELS = {
  active: "正常",
  blocked: "已禁用",
} as const;

export const MEMBER_SOURCE_LABELS = {
  checkout: "结账自动",
  manual: "手动创建",
  import: "订单同步",
} as const;

export const MEMBER_STATUS_OPTIONS = Object.entries(MEMBER_STATUS_LABELS) as [
  keyof typeof MEMBER_STATUS_LABELS,
  string,
][];

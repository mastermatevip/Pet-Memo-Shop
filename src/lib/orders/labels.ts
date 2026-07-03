import type { OrderStatus, ShippingStatus } from "@/types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "待确认",
  proof_sent: "样稿已发送",
  in_production: "生产中",
  shipped: "已发货",
  delivered: "已完成",
  cancelled: "已取消",
};

export const SHIPPING_STATUS_LABELS: Record<ShippingStatus, string> = {
  not_shipped: "未发货",
  processing: "备货中",
  in_transit: "运输中",
  delivered: "已签收",
  exception: "物流异常",
};

export const ORDER_STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS) as [OrderStatus, string][];
export const SHIPPING_STATUS_OPTIONS = Object.entries(SHIPPING_STATUS_LABELS) as [
  ShippingStatus,
  string,
][];

export const PUBLIC_ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Order received",
  proof_sent: "Design proof sent",
  in_production: "In production",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PUBLIC_SHIPPING_STATUS_LABELS: Record<ShippingStatus, string> = {
  not_shipped: "Not shipped yet",
  processing: "Preparing your order",
  in_transit: "In transit",
  delivered: "Delivered",
  exception: "Delivery exception",
};

import "server-only";

import type { MemorialPage, Order } from "@/types";
import {
  generateMemorialSlug,
} from "@/lib/memorial/slug";
import { orderIncludesMemorialProduct } from "@/lib/memorial/constants";
import {
  getMemorialByOrderNumber,
  getMemorialSlugs,
  getOrderByNumberFromStore,
  saveMemorialPage,
  updateOrderMemorialSlugs,
} from "@/lib/cms/store";

function parsePetNameFromNotes(notes?: string): string | undefined {
  if (!notes) return undefined;
  const patterns = [
    /pet\s*name\s*[:：]\s*([^\n,]+)/i,
    /name\s*[:：]\s*([^\n,]+)/i,
    /宠物名\s*[:：]\s*([^\n,]+)/i,
  ];
  for (const pattern of patterns) {
    const match = notes.match(pattern);
    if (match?.[1]?.trim()) return match[1].trim();
  }
  return undefined;
}

export function createDraftMemorialFromOrder(order: Order, petName?: string): MemorialPage {
  const now = new Date().toISOString();
  const existingSlugs = new Set(getMemorialSlugs());
  const resolvedPetName =
    petName?.trim() ||
    parsePetNameFromNotes(order.internalNotes) ||
    "Beloved Companion";

  const page: MemorialPage = {
    slug: generateMemorialSlug(resolvedPetName, existingSlugs),
    orderNumber: order.orderNumber,
    customerEmail: order.customerEmail,
    petName: resolvedPetName,
    story: order.internalNotes?.trim() || undefined,
    gallery: [],
    familyMessages: [],
    guestbookEnabled: true,
    guestbook: [],
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  saveMemorialPage(page);
  return page;
}

/** Create a draft memorial when order includes digital memorial products. */
export function provisionMemorialsFromOrder(order: Order): MemorialPage | undefined {
  if (!orderIncludesMemorialProduct(order.items)) return undefined;
  if (order.memorialSlugs?.length) {
    const existing = getMemorialByOrderNumber(order.orderNumber);
    if (existing) return existing;
  }

  const page = createDraftMemorialFromOrder(order);
  updateOrderMemorialSlugs(order.orderNumber, [page.slug]);
  return page;
}

export function createMemorialForOrder(orderNumber: string, petName?: string): MemorialPage | undefined {
  const order = getOrderByNumberFromStore(orderNumber);
  if (!order) return undefined;

  const existing = getMemorialByOrderNumber(orderNumber);
  if (existing) return existing;

  const page = createDraftMemorialFromOrder(order, petName);
  const slugs = [...new Set([...(order.memorialSlugs ?? []), page.slug])];
  updateOrderMemorialSlugs(order.orderNumber, slugs);
  return page;
}

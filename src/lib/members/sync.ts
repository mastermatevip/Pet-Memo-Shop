import "server-only";

import type { Member, Order } from "@/types";
import { getMemberByEmailFromStore, loadMembers, saveMembers } from "@/lib/cms/store";
import { memberEmailToParam, memberParamToEmail, normalizeMemberEmail } from "@/lib/members/email";

export { memberEmailToParam, memberParamToEmail, normalizeMemberEmail };

export function upsertMemberFromOrder(order: Order): Member {
  const email = normalizeMemberEmail(order.customerEmail);
  if (!email) {
    throw new Error("Order is missing customer email");
  }

  const members = loadMembers();
  const now = new Date().toISOString();
  const index = members.findIndex((m) => m.email === email);

  if (index === -1) {
    const member: Member = {
      email,
      name: order.customerName.trim(),
      phone: order.customerPhone?.trim(),
      defaultShippingAddress: order.shippingAddress.trim(),
      status: "active",
      source: "checkout",
      orderCount: 1,
      totalSpent: order.totalAmount,
      currency: order.currency,
      orderNumbers: [order.orderNumber],
      createdAt: now,
      updatedAt: now,
    };
    members.push(member);
    saveMembers(members);
    return member;
  }

  const existing = members[index];
  const orderNumbers = existing.orderNumbers.includes(order.orderNumber)
    ? existing.orderNumbers
    : [...existing.orderNumbers, order.orderNumber];

  const isNewOrder = !existing.orderNumbers.includes(order.orderNumber);
  const totalSpent = isNewOrder
    ? existing.totalSpent + order.totalAmount
    : existing.totalSpent;

  members[index] = {
    ...existing,
    name: order.customerName.trim() || existing.name,
    phone: order.customerPhone?.trim() || existing.phone,
    defaultShippingAddress: order.shippingAddress.trim() || existing.defaultShippingAddress,
    orderNumbers,
    orderCount: orderNumbers.length,
    totalSpent,
    currency: order.currency || existing.currency,
    updatedAt: now,
  };

  saveMembers(members);
  return members[index];
}

export function syncAllMembersFromOrders(orders: Order[]): Member[] {
  const sorted = [...orders].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const byEmail = new Map<string, Member>();
  const now = new Date().toISOString();

  for (const order of sorted) {
    const email = normalizeMemberEmail(order.customerEmail);
    if (!email) continue;

    const existing = byEmail.get(email);
    if (!existing) {
      byEmail.set(email, {
        email,
        name: order.customerName.trim(),
        phone: order.customerPhone?.trim(),
        defaultShippingAddress: order.shippingAddress.trim(),
        status: "active",
        source: "import",
        orderCount: 1,
        totalSpent: order.totalAmount,
        currency: order.currency,
        orderNumbers: [order.orderNumber],
        createdAt: order.createdAt,
        updatedAt: now,
      });
      continue;
    }

    const orderNumbers = existing.orderNumbers.includes(order.orderNumber)
      ? existing.orderNumbers
      : [...existing.orderNumbers, order.orderNumber];

    byEmail.set(email, {
      ...existing,
      name: order.customerName.trim() || existing.name,
      phone: order.customerPhone?.trim() || existing.phone,
      defaultShippingAddress: order.shippingAddress.trim() || existing.defaultShippingAddress,
      orderNumbers,
      orderCount: orderNumbers.length,
      totalSpent: existing.totalSpent + order.totalAmount,
      currency: order.currency || existing.currency,
      updatedAt: now,
    });
  }

  const previous = loadMembers();
  for (const member of previous) {
    if (!byEmail.has(member.email)) {
      byEmail.set(member.email, member);
    } else {
      const synced = byEmail.get(member.email)!;
      byEmail.set(member.email, {
        ...synced,
        status: member.status,
        source: member.source === "manual" ? "manual" : synced.source,
        internalNotes: member.internalNotes,
        createdAt: member.createdAt,
      });
    }
  }

  const members = [...byEmail.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  saveMembers(members);
  return members;
}

export function getMemberOrders(member: Member, orders: Order[]): Order[] {
  const numbers = new Set(member.orderNumbers);
  return orders
    .filter((o) => numbers.has(o.orderNumber))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getMemberByEmail(email: string): Member | undefined {
  return getMemberByEmailFromStore(normalizeMemberEmail(email));
}

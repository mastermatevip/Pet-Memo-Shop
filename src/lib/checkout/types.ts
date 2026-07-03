export interface CheckoutLineInput {
  productSlug: string;
  quantity: number;
}

export interface CheckoutInput {
  items: CheckoutLineInput[];
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  personalizationNotes?: string;
  giftBox?: boolean;
}

export interface ValidatedCheckoutLine {
  productSlug: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface ValidatedCheckout {
  items: ValidatedCheckoutLine[];
  totalAmount: number;
  currency: string;
  giftBox: boolean;
  giftBoxAmount: number;
}

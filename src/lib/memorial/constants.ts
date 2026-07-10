/** Products that include a digital memorial page. */
export const MEMORIAL_PRODUCT_SLUGS = new Set([
  "digital-memorial-page-standalone",
  "carbon-fiber-nfc-memorial-tag",
  "nfc-pet-memorial-card",
]);

export function orderIncludesMemorialProduct(
  items: { productSlug?: string }[]
): boolean {
  return items.some((item) => item.productSlug && MEMORIAL_PRODUCT_SLUGS.has(item.productSlug));
}

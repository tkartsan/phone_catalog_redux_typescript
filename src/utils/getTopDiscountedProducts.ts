import { Product } from "types/global";

export const getTopDiscountedProducts = (
  productsData: Product[],
  limit: number = 10
): Product[] => {
  return [...productsData]
    .sort((a, b) => {
      const discountA = a.priceRegular - (a.priceDiscount ?? 0);
      const discountB = b.priceRegular - (b.priceDiscount ?? 0);
      return discountB - discountA;
    })
    .slice(0, limit);
};

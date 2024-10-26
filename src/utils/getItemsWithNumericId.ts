import { ProductItems, Products } from "types/global";

export const getItemsWithNumericId = (
  items: ProductItems = [],
  products: Products = []
): Products => {
  if (!items || !products) {
    return [];
  }

  const productIdMap = items.reduce<Record<string, number>>((map, product) => {
    if ('itemId' in product) { 
      map[product.itemId] = product.id;
    }
    return map;
  }, {});

  return items.map((item) => {
    const numericId = productIdMap[item.itemId] || 0;   
    return { ...item, numericId };
  });
};

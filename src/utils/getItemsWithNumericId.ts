import { Product, ProductItems, Products } from "types/global";

export const getItemsWithNumericId = (
  items: Product[] | null,
  products: ProductItems | null,
): Products => {
  if (!items || !products) {
    return [];
  }

  const productIdMap = products.reduce<Record<string, number>>((map, product) => {
    if ('itemId' in product) { 
      map[product.itemId] = product.id;
    }
    return map;
  }, {});

  return items.map((item) => {
    const numericId = productIdMap[item.id] || 0;   
    return { ...item, numericId };
  });
};

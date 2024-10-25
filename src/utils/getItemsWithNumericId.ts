interface Product {
  id: number;
  itemId: string;
  // Add other properties if necessary
}

interface Item {
  id: string;
  // Add other properties if necessary
}

interface ItemWithNumericId extends Item {
  numericId: number | string;
}

export const getItemsWithNumericId = (
  items: Item[] = [],
  products: Product[] = []
): ItemWithNumericId[] => {
  if (!items || !products) {
    return [];
  }

  const productIdMap = products.reduce<Record<string, number>>((map, product) => {
    map[product.itemId] = product.id;
    return map;
  }, {});

  return items.map((item) => {
    const numericId = productIdMap[item.id] || 'Unknown';
    return { ...item, numericId };
  });
};

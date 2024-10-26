export const getItemsWithNumericId = (items = [], products = []) => {
  if (!items || !products) {
    return [];
  }

  const productIdMap = items.reduce((map, product) => {
    if ('itemId' in product) {
      map[product.itemId] = product.id;
    }

    return map;
  }, {});

  return items.map((item) => {
    const numericId = productIdMap[item.itemId] || 0;

    return Object.assign(Object.assign({}, item), { numericId });
  });
};

export const getItemsWithNumericId = (items = [], products = []) => {
  if (!items || !products) {
    return [];
  }

  const productIdMap = products.reduce((map, product) => {
    map[product.itemId] = product.id;

    return map;
  }, {});

  return items.map((item) => {
    const numericId = productIdMap[item.id] || 'Unknown';

    return { ...item, numericId };
  });
};

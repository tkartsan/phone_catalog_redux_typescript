export const getMostRecentPhones = (phones, products) => {
  const productYearMap = products.reduce((map, product) => {
    map[product.name.toLowerCase()] = product.year;

    return map;
  }, {});

  const phonesWithYear = phones.map((phone) => {
    const productName = phone.name.toLowerCase();
    const year = productYearMap[productName] || 0;

    return { ...phone, year };
  });

  const sortedPhones = phonesWithYear.sort((a, b) => b.year - a.year);

  return sortedPhones.slice(0, 10);
};

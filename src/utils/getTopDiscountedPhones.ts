interface PhoneData {
  priceRegular: number;
  priceDiscount: number;
}

export const getTopDiscountedPhones = (
  phonesData: PhoneData[],
  limit: number = 10
): PhoneData[] => {
  return [...phonesData]
    .sort((a, b) => {
      const discountA = a.priceRegular - a.priceDiscount;
      const discountB = b.priceRegular - b.priceDiscount;
      return discountB - discountA;
    })
    .slice(0, limit);
};

export const getTopDiscountedPhones = (phonesData, limit = 10) => {
    return [...phonesData]
        .sort((a, b) => {
        const discountA = a.priceRegular - a.priceDiscount;
        const discountB = b.priceRegular - b.priceDiscount;
        return discountB - discountA;
    })
        .slice(0, limit);
};

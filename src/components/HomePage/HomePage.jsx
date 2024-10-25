import React from 'react';

import { CategoriesPick } from '../CategoriesPick';
import { CoverSlider } from '../CoverSlider';
import { DeviceSlider } from '../Shared/DeviceSlider';

import { getMostRecentPhones } from './../../utils/getMostRecentPhones';
import { getTopDiscountedPhones } from './../../utils/getTopDiscountedPhones';

export const HomePage = ({
  phonesData,
  productsData,
  tabletsData,
  accessoriesData,
}) => {
  return (
    <>
      <CoverSlider />
      {phonesData && productsData ? (
        <DeviceSlider
          items={getMostRecentPhones(phonesData, productsData)}
          title="Brand new models"
          itemType="phones"
          isShowDiscount={false}
          sliderId="brand-new-models"
        />
      ) : (
        <p>Loading...</p>
      )}
      <CategoriesPick
        phones={phonesData}
        tablets={tabletsData}
        accessories={accessoriesData}
      />
      {phonesData && productsData ? (
        <DeviceSlider
          items={getTopDiscountedPhones(phonesData)}
          title="Hot prices"
          itemType="phones"
          isShowDiscount={true}
          sliderId="hot-prices"
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

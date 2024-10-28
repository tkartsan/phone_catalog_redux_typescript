import React from 'react';
import { useSelector } from 'react-redux';

import { DeviceSlider } from '../Shared/DeviceSlider';

import { getMostRecentPhones } from '../../utils/getMostRecentPhones';
import { getTopDiscountedPhones } from '../../utils/getTopDiscountedPhones';
import { RootState } from '../../store/store';

import { CategoriesPick } from './../CategoriesPick/CategoriesPick';
import { CoverSlider } from './../CoverSlider/CoverSlider';

export const HomePage: React.FC = () => {
  const data = useSelector(
    (state: RootState) => state.itemsData
  );
 
  const { productsData, tabletsData, accessoriesData, phonesData } = data || {};

  console.log({ phonesData, productsData, data });

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

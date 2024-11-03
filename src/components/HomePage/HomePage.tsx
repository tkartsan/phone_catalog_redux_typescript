import React from 'react';
import { useSelector } from 'react-redux';

import { DeviceSlider } from '../Shared/DeviceSlider';

import { getMostRecentProducts } from '../../utils/getMostRecentProducts';
import { getTopDiscountedProducts } from '../../utils/getTopDiscountedProducts';
import { RootState } from '../../store/store';

import { CategoriesPick } from './../CategoriesPick/CategoriesPick';
import { CoverSlider } from './../CoverSlider/CoverSlider';

export const HomePage: React.FC = () => {
  const data = useSelector(
    (state: RootState) => state.itemsData
  );
 
  const { productsData, tabletsData, accessoriesData, phonesData } = data || {};

  return (
    <>
      <CoverSlider />
      {phonesData && productsData ? (
        <DeviceSlider
          items={getMostRecentProducts(phonesData, productsData)}
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
          items={getTopDiscountedProducts(phonesData)}
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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setAccessoriesData,
  setPhonesData,
  setProductsData,
  setTabletsData,
} from '../store/itemsDataSlice';

import { useFetch } from './useFetch';

export const useDataFetch = () => {
  const dispatch = useDispatch();

  const { data: phonesData } = useFetch('/api/phones.json');
  const { data: tabletsData } = useFetch('/api/tablets.json');
  const { data: accessoriesData } = useFetch('/api/accessories.json');
  const { data: productsData } = useFetch('/api/products.json');

  useEffect(() => {
    if (phonesData) {
      dispatch(setPhonesData(phonesData));
    }
  }, [phonesData]);

  useEffect(() => {
    if (tabletsData) {
      dispatch(setTabletsData(tabletsData));
    }
  }, [tabletsData]);

  useEffect(() => {
    if (accessoriesData) {
      dispatch(setAccessoriesData(accessoriesData));
    }
  }, [accessoriesData]);

  useEffect(() => {
    if (productsData) {
      dispatch(setProductsData(productsData));
    }
  }, [productsData]);
};

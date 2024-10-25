import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setAccessoriesData,
  setPhonesData,
  setProductsData,
  setTabletsData,
} from '../store/itemsDataSlice';

import { useFetch } from './useFetch';
import { AppDispatch } from '../store/store';

export const useDataFetch = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: phonesData } = useFetch<any[]>('/api/phones.json');
  const { data: tabletsData } = useFetch<any[]>('/api/tablets.json');
  const { data: accessoriesData } = useFetch<any[]>('/api/accessories.json');
  const { data: productsData } = useFetch<any[]>('/api/products.json');

  useEffect(() => {
    if (phonesData) {
      dispatch(setPhonesData(phonesData));
    }
  }, [phonesData, dispatch]);

  useEffect(() => {
    if (tabletsData) {
      dispatch(setTabletsData(tabletsData));
    }
  }, [tabletsData, dispatch]);

  useEffect(() => {
    if (accessoriesData) {
      dispatch(setAccessoriesData(accessoriesData));
    }
  }, [accessoriesData, dispatch]);

  useEffect(() => {
    if (productsData) {
      dispatch(setProductsData(productsData));
    }
  }, [productsData, dispatch]);
};

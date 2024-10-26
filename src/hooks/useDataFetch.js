import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessoriesData, setPhonesData, setProductsData, setTabletsData, } from '../store/itemsDataSlice';
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

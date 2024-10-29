import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductItem } from 'types/global';

export interface ItemsDataState {
  phonesData: Product[] | null;
  tabletsData: Product[] | null;
  accessoriesData: Product[] | null;
  productsData: ProductItem[] | null;
}

const initialState: ItemsDataState = {
  phonesData: null,
  tabletsData: null,
  accessoriesData: null,
  productsData: null,
};

const itemsDataSlice = createSlice({
  name: 'itemsData',
  initialState,
  reducers: {
    setPhonesData: (state, action: PayloadAction<Product[]>) => {
      state.phonesData = action.payload;
    },
    setTabletsData: (state, action: PayloadAction<Product[]>) => {
      state.tabletsData = action.payload;
    },
    setAccessoriesData: (state, action: PayloadAction<Product[]>) => {
      state.accessoriesData = action.payload;
    },
    setProductsData: (state, action: PayloadAction<ProductItem[]>) => {
      state.productsData = action.payload;
    },
  },
});

export const {
  setPhonesData,
  setTabletsData,
  setAccessoriesData,
  setProductsData,
} = itemsDataSlice.actions;

export default itemsDataSlice.reducer;

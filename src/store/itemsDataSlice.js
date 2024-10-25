import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phonesData: null,
  tabletsData: null,
  accessoriesData: null,
  productsData: null,
};

const itemsDataSlice = createSlice({
  name: 'itemsData',
  initialState,
  reducers: {
    setPhonesData: (state, action) => {
      state.phonesData = action.payload;
    },
    setTabletsData: (state, action) => {
      state.tabletsData = action.payload;
    },
    setAccessoriesData: (state, action) => {
      state.accessoriesData = action.payload;
    },
    setProductsData: (state, action) => {
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Products } from 'types/global';

interface FavoritesState {
  favorites: Products;
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      const phone = action.payload;
      state.favorites.push(phone);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.favorites = state.favorites.filter((product) => product.id !== productId);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

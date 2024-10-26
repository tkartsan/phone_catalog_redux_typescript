import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  favorites: [],
};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const phone = action.payload;

      state.favorites.push(phone);
    },
    removeFavorite: (state, action) => {
      const productId = action.payload;

      state.favorites = state.favorites.filter(
        (product) => product.id !== productId,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

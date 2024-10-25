import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Phone {
  id: number;
  name: string;
  price: number;
}

interface FavoritesState {
  favorites: Phone[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Action for adding a favorite, with a typed payload (Phone)
    addFavorite: (state, action: PayloadAction<Phone>) => {
      const phone = action.payload;
      state.favorites.push(phone);
    },
    // Action for removing a favorite by its ID (number)
    removeFavorite: (state, action: PayloadAction<number>) => {
      const phoneId = action.payload;
      state.favorites = state.favorites.filter((phone) => phone.id !== phoneId);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

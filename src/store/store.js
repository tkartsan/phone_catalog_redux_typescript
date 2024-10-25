import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import compareReducer from './compareSlice';
import favoritesReducer from './favoritesSlice';
import itemsDataReducer from './itemsDataSlice';

const store = configureStore({
  reducer: {
    itemsData: itemsDataReducer,
    compare: compareReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export default store;

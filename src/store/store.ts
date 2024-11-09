import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cartSlice';
import compareReducer from './compareSlice';
import favoritesReducer from './favoritesSlice';
import itemsDataReducer from './itemsDataSlice';

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const comparePersistConfig = {
  key: 'compare',
  storage,
};

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedCompareReducer = persistReducer(comparePersistConfig, compareReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);

const store = configureStore({
  reducer: {
    itemsData: itemsDataReducer,
    compare: persistedCompareReducer,
    cart: persistedCartReducer,
    favorites: persistedFavoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;

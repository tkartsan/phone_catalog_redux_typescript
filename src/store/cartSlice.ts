import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Products } from 'types/global';

interface CartItem extends Product {
  quantity: number;
}

type CartItems = CartItem[];

interface CartState {
  cart: CartItems;
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const phone = action.payload;
      const existsInCart = state.cart.some((item) => item.id === phone.id);

      if (!existsInCart) {
        state.cart.push({ ...phone, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const phoneId = action.payload;
      state.cart = state.cart.filter((phone) => phone.id !== phoneId);
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ phoneId: number; newQuantity: number }>
    ) => {
      const { phoneId, newQuantity } = action.payload;
      const item = state.cart.find((item) => item.id === phoneId);

      if (item) {
        item.quantity = newQuantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

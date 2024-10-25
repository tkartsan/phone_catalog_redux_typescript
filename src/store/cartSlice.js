import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const phone = action.payload;
      const existsInCart = state.cart.some((item) => item.id === phone.id);

      if (!existsInCart) {
        state.cart.push({ ...phone, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const phoneId = action.payload;

      state.cart = state.cart.filter((phone) => phone.id !== phoneId);
    },
    updateCartQuantity: (state, action) => {
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

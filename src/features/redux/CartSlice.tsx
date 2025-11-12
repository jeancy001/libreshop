import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../constants/Product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: CartState = {
  cart: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.cart[index].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      saveCartToStorage(state.cart);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item._id !== action.payload);
      saveCartToStorage(state.cart);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(item => item._id === action.payload);
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1;
        } else {
          state.cart.splice(index, 1);
        }
      }
      saveCartToStorage(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      saveCartToStorage(state.cart);
    }
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

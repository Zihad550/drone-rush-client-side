import type { RootState } from "@/redux/store";
import type { IPurchasableProduct } from "@/types/product.type";
import type IProduct from "@/types/product.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  cartProducts: IPurchasableProduct[];
}

const initialState: ICartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCard: (state, action: PayloadAction<IProduct>) => {
      const exists = state.cartProducts.find(
        (item) => item._id === action.payload._id,
      );
      if (exists?.quantity) exists.quantity += 1;
      else
        state.cartProducts.unshift({
          ...action.payload,
          quantity: 1,
        });
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cartProducts.findIndex(
        (product) => product._id === action.payload,
      );
      if (state.cartProducts[index].quantity > 1)
        state.cartProducts[index].quantity -= 1;
      else if (index !== -1) {
        state.cartProducts.splice(index, 1);
      }
    },
    deleteProductFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cartProducts.findIndex(
        (product) => product._id === action.payload,
      );
      if (index !== -1) {
        state.cartProducts.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const selectCartProducts = (state: RootState) => state.cart.cartProducts;

export const {
  deleteProductFromCart,
  addProductToCard,
  removeProductFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

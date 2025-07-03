import type { RootState } from "@/redux/store";
import type IProduct from "@/types/product.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  cartProducts: IProduct[];
}

const initialState: ICartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCard: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts.unshift(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product._id !== action.payload,
      );
    },
  },
});

export const selectCartProducts = (state: RootState) => state.cart.cartProducts;

export const { addProductToCard, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;

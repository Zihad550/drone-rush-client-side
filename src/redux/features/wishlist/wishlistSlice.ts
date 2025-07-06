import type { RootState } from '@/redux/store';
import type IProduct from '@/types/product.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addProductToCard } from '../cart/cartSlice';

interface IWishlistState {
  wishlistProducts: IProduct[];
}

const initialState: IWishlistState = {
  wishlistProducts: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addProductToWishlist: (state, action: PayloadAction<IProduct>) => {
      const exists = state.wishlistProducts.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.wishlistProducts.unshift(action.payload);
      }
    },
    removeProductFromWishlist: (state, action: PayloadAction<string>) => {
      const index = state.wishlistProducts.findIndex(
        (product) => product._id === action.payload
      );
      if (index !== -1) {
        state.wishlistProducts.splice(index, 1);
      }
    },
    clearWishlist: (state) => {
      state.wishlistProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCard, (state, action) => {
      const index = state.wishlistProducts.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) state.wishlistProducts.splice(index, 1);
    });
  },
});

export const selectWishlistProducts = (state: RootState) =>
  state.wishlist.wishlistProducts;

export const {
  addProductToWishlist,
  removeProductFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;

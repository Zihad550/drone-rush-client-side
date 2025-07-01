import {
  AddToWishlist,
  ClearWishlist,
  RemoveFromWishlist,
  wishlistActionTypes,
} from "redux/types";
import IProduct from "types/ProductType";

export const addToWishlist = (payload: IProduct): AddToWishlist => {
  return {
    type: wishlistActionTypes.ADD_TO_WISHLIST,
    payload: payload,
  };
};

export const removeFromWishlist = (payload: string): RemoveFromWishlist => {
  return {
    type: wishlistActionTypes.REMOVE_FROM_WISHLIST,
    payload,
  };
};

export const clearWishlist = (): ClearWishlist => {
  return {
    type: wishlistActionTypes.CLEAR_WISHLIST,
  };
};

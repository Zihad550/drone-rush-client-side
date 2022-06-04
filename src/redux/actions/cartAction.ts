import IProduct from "types/ProductType";
import {
  AddToCart,
  cartActionTypes,
  ClearCart,
  RemoveFromCart,
} from "../types";

export const addToCart = (payload: IProduct): AddToCart => {
  return {
    type: cartActionTypes.ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (_id: string): RemoveFromCart => {
  return {
    type: cartActionTypes.REMOVE_FROM_CART,
    payload: _id,
  };
};

export const clearCart = (): ClearCart => {
  return {
    type: cartActionTypes.CLEAR_CART,
  };
};

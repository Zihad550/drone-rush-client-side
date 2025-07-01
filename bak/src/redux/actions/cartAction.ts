import IProduct from "types/ProductType";
import {
  AddToCart,
  cartActionTypes,
  ClearCart,
  DecreaseQty,
  IncreaseQty,
  RemoveFromCart,
} from "../types";

export const addToCart = (payload: IProduct): AddToCart => {
  return {
    type: cartActionTypes.ADD_TO_CART,
    payload,
  };
};

export const increaseQty = (payload: string): IncreaseQty => {
  return {
    type: cartActionTypes.INCREASE_QTY,
    payload,
  };
};

export const decreaseQty = (payload: string): DecreaseQty => {
  return {
    type: cartActionTypes.DECREASE_QTY,
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

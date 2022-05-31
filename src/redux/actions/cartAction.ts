import IDrone from "../../types/DroneType";
import { cartActionTypes } from "../types";

export const addToCart = (payload: IDrone) => {
  return {
    type: cartActionTypes.ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (_id: string) => {
  return {
    type: cartActionTypes.REMOVE_FROM_CART,
    payload: _id,
  };
};

export const clearCart = () => {
  return {
    type: cartActionTypes.CLEAR_CART,
  };
};

type x = ReturnType<typeof addToCart>;
type y = ReturnType<typeof removeFromCart>;
type z = ReturnType<typeof clearCart>;

export type cartActionType = x | y | z;

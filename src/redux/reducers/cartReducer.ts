import IProduct from "types/ProductType";
import { cartActionType, cartActionTypes } from "../types";

const cartReducer = (
  state: IProduct[] = [],
  // !! action type should be fixed
  action: cartActionType
): IProduct[] => {
  switch (action.type) {
    case cartActionTypes.ADD_TO_CART:
      return [...state, action.payload];

    case cartActionTypes.REMOVE_FROM_CART:
      return state.filter((product) => action.payload !== product._id);

    case cartActionTypes.CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export default cartReducer;

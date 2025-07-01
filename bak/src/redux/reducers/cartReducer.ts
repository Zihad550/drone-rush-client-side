import IProduct from "types/ProductType";
import { cartActionType, cartActionTypes } from "../types";

const cartReducer = (
  state: IProduct[] = [],
  action: cartActionType,
): IProduct[] => {
  switch (action.type) {
    case cartActionTypes.ADD_TO_CART:
      const existingProduct: any = state.find(
        (product) => product._id === action.payload._id,
      );

      if (!existingProduct) {
        return [
          ...state,
          {
            ...action.payload,
            qty: 1,
            totalPrice: Number(action.payload.price),
          },
        ];
      }
      const cartProducts = state.filter(
        (product) => product._id !== existingProduct._id,
      );
      return [
        ...cartProducts,
        {
          ...action.payload,
          qty: existingProduct.qty + 1,
          totalPrice: existingProduct.totalPrice + Number(action.payload.price),
        },
      ];

    case cartActionTypes.INCREASE_QTY:
      const product: any = state.find(
        (product) => product._id === action.payload,
      );
      const index = state.findIndex(
        (product) => product._id === action.payload,
      );
      state[index].qty = product.qty + 1;
      state[index].totalPrice = product.totalPrice + Number(product.price);
      return [...state];

    case cartActionTypes.DECREASE_QTY:
      const product2 = state.find((product) => product._id === action.payload);
      if (!product2) return state;
      if (product2.qty === 1) {
        return state.filter((product) => product._id !== action.payload);
      }
      const productIndex = state.findIndex(
        (product) => product._id === action.payload,
      );
      if (product2.qty && product2.totalPrice) {
        state[productIndex].qty = product2.qty - 1;
        state[productIndex].totalPrice =
          product2?.totalPrice - Number(product2.price);
        return [...state];
      }
      return state;
    case cartActionTypes.REMOVE_FROM_CART:
      return state.filter((product) => action.payload !== product._id);

    case cartActionTypes.CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export default cartReducer;

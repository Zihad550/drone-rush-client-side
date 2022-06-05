import { wishlistActionType, wishlistActionTypes } from "redux/types";
import IProduct from "types/ProductType";

const wishlistReducer = (
  state: IProduct[] = [],
  action: wishlistActionType
) => {
  switch (action.type) {
    case wishlistActionTypes.ADD_TO_WISHLIST:
      const existingProduct: any = state.find(
        (product) => product._id === action.payload._id
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
        (product) => product._id !== existingProduct._id
      );
      return [
        ...cartProducts,
        {
          ...action.payload,
          qty: existingProduct.qty + 1,
          totalPrice: existingProduct.totalPrice + Number(action.payload.price),
        },
      ];

    case wishlistActionTypes.REMOVE_FROM_WISHLIST:
      return state.filter((product) => action.payload !== product._id);
    case wishlistActionTypes.CLEAR_WISHLIST:
      return [];

    default:
      return state;
  }
};

export default wishlistReducer;

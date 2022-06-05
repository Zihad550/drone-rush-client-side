import IProduct from "types/ProductType";
import IUser from "../types/UserType";

export enum cartActionTypes {
  ADD_TO_CART = "addToCart",
  INCREASE_QTY = "increaseQty",
  DECREASE_QTY = "decreaseQty",
  REMOVE_FROM_CART = "removeFromCart",
  CLEAR_CART = "clearCart",
}

export interface AddToCart {
  type: cartActionTypes.ADD_TO_CART;
  payload: IProduct;
}

export interface IncreaseQty {
  type: cartActionTypes.INCREASE_QTY;
  payload: string;
}

export interface DecreaseQty {
  type: cartActionTypes.DECREASE_QTY;
  payload: string;
}

export interface RemoveFromCart {
  type: cartActionTypes.REMOVE_FROM_CART;
  payload: string;
}

export interface ClearCart {
  type: cartActionTypes.CLEAR_CART;
}

export enum wishlistActionTypes {
  ADD_TO_WISHLIST = "addToWishlist",
  REMOVE_FROM_WISHLIST = "removeFromWishlist",
  CLEAR_WISHLIST = "clearWishlist",
}

export interface AddToWishlist {
  type: wishlistActionTypes.ADD_TO_WISHLIST;
  payload: IProduct;
}

export interface RemoveFromWishlist {
  type: wishlistActionTypes.REMOVE_FROM_WISHLIST;
  payload: string;
}

export interface ClearWishlist {
  type: wishlistActionTypes.CLEAR_WISHLIST;
}

export enum authActionTypes {
  LOGIN_SUCCESS = "login/success",
  LOGIN_PENDING = "login/pending",
  LOGIN_FAIL = "login/fail",
  LOGOUT = "logout",
  REGISTER = "register",
}

interface loginSuccess {
  type: authActionTypes.LOGIN_SUCCESS;
  payload: IUser;
}
interface loginPending {
  type: authActionTypes.LOGIN_PENDING;
}
interface loginFail {
  type: authActionTypes.LOGIN_FAIL;
  payload: string;
}

interface logout {
  type: authActionTypes.LOGOUT;
}

export type authActionType = loginSuccess | loginPending | loginFail | logout;

export type cartActionType =
  | AddToCart
  | IncreaseQty
  | DecreaseQty
  | RemoveFromCart
  | ClearCart;

export type wishlistActionType =
  | AddToWishlist
  | RemoveFromWishlist
  | ClearWishlist;

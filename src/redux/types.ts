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
  REGISTER_SUCCESS = "register/success",
  REGISTER_PENDING = "register/pending",
  REGISTER_FAIL = "register/fail",
  LOGOUT = "logout",
}

interface LoginSuccess {
  type: authActionTypes.LOGIN_SUCCESS;
  payload: IUser;
}
interface LoginPending {
  type: authActionTypes.LOGIN_PENDING;
}
interface LoginFail {
  type: authActionTypes.LOGIN_FAIL;
  payload: string;
}

export interface RegisterSuccess {
  type: authActionTypes.REGISTER_SUCCESS;
  payload: IUser;
}
export interface RegisterPending {
  type: authActionTypes.REGISTER_PENDING;
}
export interface RegisterFail {
  type: authActionTypes.REGISTER_FAIL;
  payload: string;
}

interface logout {
  type: authActionTypes.LOGOUT;
}

export type authActionType =
  | LoginSuccess
  | LoginPending
  | LoginFail
  | RegisterSuccess
  | RegisterFail
  | RegisterPending
  | logout;

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

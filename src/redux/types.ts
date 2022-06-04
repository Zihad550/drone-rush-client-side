import IProduct from "types/ProductType";
import IUser from "../types/UserType";

export enum cartActionTypes {
  ADD_TO_CART = "addToCart",
  REMOVE_FROM_CART = "removeFromCart",
  CLEAR_CART = "clearCart",
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

export interface AddToCart {
  type: cartActionTypes.ADD_TO_CART;
  payload: IProduct;
}

export interface RemoveFromCart {
  type: cartActionTypes.REMOVE_FROM_CART;
  payload: string;
}

export interface ClearCart {
  type: cartActionTypes.CLEAR_CART;
}

export type cartActionType = AddToCart | RemoveFromCart | ClearCart;

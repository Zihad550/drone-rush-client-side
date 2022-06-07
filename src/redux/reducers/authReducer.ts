import IUser from "../../types/UserType";
import { authActionType, authActionTypes } from "../types";

interface IAuthState {
  data: IUser | null;
  state: "pending" | "success" | "idle" | "error";
  error: string | null;
}

const initialState: IAuthState = {
  data: null,
  state: "idle",
  error: null,
};

const authReducer = (
  state: IAuthState = initialState,
  action: authActionType
): IAuthState => {
  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      return {
        data: action.payload,
        state: "success",
        error: null,
      };

    case authActionTypes.LOGIN_PENDING:
      return {
        data: null,
        state: "pending",
        error: null,
      };

    case authActionTypes.LOGIN_FAIL:
      return {
        data: null,
        state: "error",
        error: action.payload,
      };

    case authActionTypes.REGISTER_SUCCESS:
      return {
        data: action.payload,
        state: "success",
        error: null,
      };

    case authActionTypes.REGISTER_PENDING:
      return {
        data: null,
        state: "pending",
        error: null,
      };

    case authActionTypes.REGISTER_FAIL:
      return {
        data: null,
        state: "error",
        error: action.payload,
      };

    case authActionTypes.LOGOUT:
      return {
        data: null,
        state: "idle",
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;

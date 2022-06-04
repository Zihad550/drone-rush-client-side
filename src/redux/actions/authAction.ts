import { Dispatch } from "redux";
import AuthService from "../../services/Auth.service";
import { ILoginData } from "../../types/LoginType";
import { authActionType, authActionTypes } from "../types";

export const login = (payload: ILoginData) => {
  // email, password => backend
  // verity
  // response
  return (dispatch: Dispatch<authActionType>) => {
    dispatch({
      type: authActionTypes.LOGIN_PENDING,
    });
    AuthService.login(payload)
      .then((user) =>
        dispatch({
          type: authActionTypes.LOGIN_SUCCESS,
          payload: user,
        })
      )
      .catch((error) => {
        dispatch({
          type: authActionTypes.LOGIN_FAIL,
          payload: error?.res?.data,
        });
      });
  };
};

export const logout = (payload: string) => {
  return {
    type: authActionTypes.LOGOUT,
    payload,
  };
};

// const register = (payload: IRegisterData)

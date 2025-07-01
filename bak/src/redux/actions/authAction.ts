import { Dispatch } from "redux";
import IRegisterData from "types/RegisterType";
import AuthService from "../../services/Auth.service";
import { ILoginData } from "../../../../src/types/LoginType";
import { authActionType, authActionTypes } from "../types";

export const register = (payload: IRegisterData) => {
  return (dispatch: Dispatch<authActionType>) => {
    dispatch({ type: authActionTypes.REGISTER_PENDING });
    AuthService.register(payload)
      .then((user) =>
        dispatch({
          type: authActionTypes.REGISTER_SUCCESS,
          payload: user,
        }),
      )
      .catch((error) => {
        dispatch({
          type: authActionTypes.REGISTER_FAIL,
          payload: error,
        });
      });
  };
};

export const login = (payload: ILoginData) => {
  return (dispatch: Dispatch<authActionType>) => {
    dispatch({
      type: authActionTypes.LOGIN_PENDING,
    });
    AuthService.login(payload)
      .then((user) => {
        dispatch({
          type: authActionTypes.LOGIN_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: authActionTypes.LOGIN_FAIL,
          payload: error,
        });
      });
  };
};

export const logout = () => {
  return {
    type: authActionTypes.LOGOUT,
  };
};

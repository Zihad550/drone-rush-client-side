import { User } from "firebase/auth";
import React, { createContext, ReactChild, ReactChildren } from "react";
import { NavigateFunction } from "react-router";
import useFirebase from "../../hooks/useFirebase";
import IUser from "../../types/UserType";

interface IAuthContext {
 user: User | IUser,
 registerUser: (email: string, password: string, name: string, navigate: NavigateFunction) => void,
 logOut: () => void,
 logIn: (email: string, password: string, location: any, navigate: NavigateFunction) => void,
 isLoading: boolean,
 authError: string,
 loginWithGoogle: (location: any, navigate: NavigateFunction) => void,
 admin: boolean,
 token: string,
 adminLoading: boolean,
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface AuthProviderProps {
  children: ReactChild | ReactChildren;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  let allcontext = useFirebase();
  return (
    <AuthContext.Provider value={allcontext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

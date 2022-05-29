import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { Location } from "history";
import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import initializeAuthentication from "../components/App/Authentication/Firebase/firebase.init";
import IUser from "../types/UserType";

// initialize firebase app
initializeAuthentication();

// providers
const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const auth = getAuth();

  // states
  const [user, setUser] = useState<User | IUser>({
    email: "",
    displayName: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  const loginWithGoogle = (location: Location, navigate: NavigateFunction) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const state = location.state as { from: "string" };
        const destination = state.from || "/";
        user.email &&
          user.displayName &&
          saveUser(user.email, user.displayName, "PUT");
        navigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const registerUser = (
    email: string,
    password: string,
    name: string,
    navigate: NavigateFunction
  ) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAuthError("");
        navigate("/");
        const newUser: any = {
          email,
          displayName: name,
        };
        setUser(newUser);
        saveUser(email, name, "POST");
        // send name to firebase
        auth.currentUser &&
          updateProfile(auth.currentUser, {
            displayName: name,
          }).catch((error) => {
            setAuthError(error.message);
          });
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const logIn = (
    email: string,
    password: string,
    location: Location,
    navigate: NavigateFunction
  ) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const state = location.state as { from: string };
        const destination = state?.from || "/";
        navigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // checks if the user is admin
  useEffect(() => {
    setAdminLoading(true);
    fetch(`https://still-castle-43681.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin))
      .finally(() => setAdminLoading(false));
  }, [user?.email]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // save user to the server
  const saveUser = (email: string, displayName: string, method: string) => {
    const user = { email, displayName };
    fetch("https://still-castle-43681.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  // observe the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthError("");
        getIdToken(user).then((idToken) => setToken(idToken));
      } else {
        setUser({ displayName: "", email: "" });
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    registerUser,
    logOut,
    logIn,
    isLoading,
    authError,
    loginWithGoogle,
    admin,
    token,
    adminLoading,
  };
};

export default useFirebase;

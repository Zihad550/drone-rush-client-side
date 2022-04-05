import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Pages/Login/Firebase/firebase.init";

// initialize firebase app
initializeAuthentication();

// providers
const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const auth = getAuth();

  // states
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [adminLoading, setAdminLoading] = useState(false)

  const loginWithGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const destination = location?.state?.from || "/";
        saveUser(user.email, user.displayName, "PUT");
        history.replace(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        history.replace("/");
        const newUser = { email, displayName: name };
        setUser(newUser);
        saveUser(email, name, "POST");
        // send name to firebase
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

  const logIn = (email, password, location, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        history.replace(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // checks if the user is admin
  useEffect(() => {
    setAdminLoading(true)
    fetch(`https://still-castle-43681.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin))
      .finally(() => setAdminLoading(false))
  }, [user.email]);

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
  const saveUser = (email, displayName, method) => {
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
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
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
    adminLoading
  };
};

export default useFirebase;

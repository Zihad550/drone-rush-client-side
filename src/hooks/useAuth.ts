import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";

const useAuth = () => useContext(AuthContext);


export default useAuth;

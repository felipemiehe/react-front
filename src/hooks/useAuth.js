import {createContext, useContext,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const api = 'http://localhost:8000/api'

  const login = (data) => {
    setUser(data)
  };

  const checkUser = async () =>{
    const userRequest = await fetch('http://localhost:8000/api/user', {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    userRequest.ok
        ? setUser(await userRequest.json())
        : await logout()
  }

  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    setUser(null);
    navigate("/login", { replace: true });
  }



  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      api
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

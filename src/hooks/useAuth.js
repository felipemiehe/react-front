import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return true;
    }
  }
  return null;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email : data.email,
        password: data.password
      })
    });

    if (response.ok) {
     await checkUser().then(()=>{
       navigate("/dashboard/profile", { replace: true });
     })
    }
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
    navigate("/", { replace: true });
  }



  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

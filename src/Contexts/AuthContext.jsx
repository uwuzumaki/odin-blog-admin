import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ initialUser, children }) => {
  const [user, setUser] = useState(initialUser);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    const url = `${import.meta.env.VITE_URL}/auth/logout`;
    try {
      await axios.get(url, { withCredentials: true });
      setUser(null);
      setAuthenticated(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within AuthProvider");
  }
  return context;
};

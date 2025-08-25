import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ initialUser, children }) => {
  const [user, setUser] = useState(initialUser);
  const [authenticated, setAuthenticated] = useState(false);

  const value = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
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

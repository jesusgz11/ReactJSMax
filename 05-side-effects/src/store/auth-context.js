import { createContext, useState, useEffect } from "react";

const Auth = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLogIn = localStorage.getItem("isLoggedIn");
    if (userLogIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const context = {
    isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  };

  return <Auth.Provider value={context}>{children}</Auth.Provider>;
};

export default Auth;

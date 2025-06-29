import React, { createContext, useState, useContext, useEffect } from 'react';
import userService from '../services/api/user'; // chỉnh path đúng

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLogin) {
      (async () => {
        try {
          const { user } = await userService.getUser();
          setUser(user);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } 
      })();
    } else {
      setUser(null)
    }
  }, [isLogin]);

  const value = {
    isLogin,
    setIsLogin,
    user,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => useContext(AuthContext);

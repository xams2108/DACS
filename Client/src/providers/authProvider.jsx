// context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading,setLoading] = useState(true)
    
    const value = {
        isLogin,
        setIsLogin,
        loading,
        setLoading
    };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);

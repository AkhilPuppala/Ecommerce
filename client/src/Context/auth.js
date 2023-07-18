import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
      user: null,
      token: ''
    });
  
    useEffect(() => {
      const data = localStorage.getItem('auth');
      if (data) {
        const parseData = JSON.parse(data);
        setAuth(prevAuth => ({
          ...prevAuth,
          user: parseData.user,
          token: parseData.token
        }));
      }
      //eslint-disable-next-line
    }, []);
  
    useEffect(() => {
      axios.defaults.headers.common['Authorization'] = auth?.token;
    }, [auth?.token]);
  
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export function useAuth() {
  return useContext(AuthContext);
}

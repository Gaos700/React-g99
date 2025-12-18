import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {

  const [token, setToken] = useState(false);

  const logout = () => {
    setToken(false);
  };

  const login = () => {
    setToken(true);
  };

  const value = {
    token,
    logout,
    login
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
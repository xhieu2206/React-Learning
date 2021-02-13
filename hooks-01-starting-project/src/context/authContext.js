import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {}
});

export const AuthContextProvider = props => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider value={{
      login: loginHandler,
      isAuth: isAuth
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

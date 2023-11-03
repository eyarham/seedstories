import React, { createContext } from 'react';

export const AuthUserContext = createContext();
const AuthUserContextProvider = () => {
  return (
    <div>AuthUserContext</div>
  )
}

export default AuthUserContextProvider
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

import { onAuthStateChanged } from "firebase/auth";
import Spinner from '../_common/Spinner';

export const AuthUserContext = createContext();

const AuthUserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [userLoaded, setUserLoaded] = useState();
  const { auth } = useContext(FirebaseContext);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLoggedInUser(user);
        setUserLoaded(true);
      }
      else {
        setLoggedInUser(null);
        setUserLoaded(true);
      }
    })
  }, [auth])
  if (!auth || !userLoaded) return <Spinner />

  return (
    <AuthUserContext.Provider value={loggedInUser}>
      {children}
      <div id='recaptcha-container'></div>
    </AuthUserContext.Provider>
  )
}

export default AuthUserContextProvider
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';

export const UserContext = createContext()
const UserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const authUser = useContext(AuthUserContext);
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const usersApi = api(db, "users", authUser.uid);
    usersApi.getDocsByFieldSub("uid", authUser.uid, async docs => {
      if (docs.length === 1) {
        const doc = docs[0]
        setLoggedInUser({ ...doc.data(), id: doc.id });
      }
    })
  }, [authUser.uid, db])
  return (
    <UserContext.Provider value={loggedInUser}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
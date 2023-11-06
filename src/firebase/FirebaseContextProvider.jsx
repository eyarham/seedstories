import React, { createContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { initializeFirebase } from './firebase';

export const FirebaseContext = createContext();
const FirebaseContextProvider = ({ children }) => {
  const [firebase, setFirebase] = useState();
  useEffect(() => {
    setFirebase(initializeFirebase())
  }, [])
  if (!firebase) return <Spinner />

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}


export default FirebaseContextProvider
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SignInInline from './SignInInline';


const AuthContainer = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (auth && user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        //const uid = user.uid;
        setLoggedInUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setLoggedInUser();
      }
    });
  }, [])
  if (loggedInUser) {
    return <span>

      <span>welcome, user {loggedInUser.uid}</span>
      <span><Link to="/logout">logout</Link></span>
    </span>
  }
  return (
    <SignInInline />
  )
}

export default AuthContainer
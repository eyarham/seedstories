import { Avatar } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SignInInline from './SignInInline';


const AuthContainer = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const navigate = useNavigate();
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
  const onClickAvatar = () => {
    navigate("/account")
  }
  if (loggedInUser) {
    return <span>
      <span onClick={onClickAvatar} style={{ float: "right", cursor: "pointer" }}><Avatar></Avatar></span>
      <span style={{ float: "right", margin: 8 }}><Link to="/logout">logout</Link></span>
    </span>
  }
  return (
    <SignInInline />
  )
}

export default AuthContainer
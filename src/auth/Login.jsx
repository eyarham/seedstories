import React, { useContext, useEffect } from 'react'
import SignInInline from './SignInInline'
import { useNavigate } from 'react-router-dom'
import { AuthUserContext } from './AuthUserContextProvider';

const Login = () => {
  const navigate = useNavigate();
  const authUser = useContext(AuthUserContext);
  useEffect(()=>{
    if(authUser){
      navigate("/bank")
    }
  },[authUser, navigate])

  return (
    <SignInInline />
  )
}

export default Login
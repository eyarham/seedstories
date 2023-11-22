import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUserContext } from './AuthUserContextProvider';
import SignInInline from './SignInInline';

const Login = () => {
  const navigate = useNavigate();
  const authUser = useContext(AuthUserContext);
  useEffect(() => {
    if (authUser) {
      navigate("/bank")
    }
  }, [authUser, navigate])

  return (
    <SignInInline />
  )
}

export default Login
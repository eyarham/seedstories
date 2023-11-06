import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from "react-router-dom";
import FirebaseContextProvider from '../firebase/FirebaseContextProvider';
import Header from './Header';
import AuthUserContextProvider from '../auth/AuthUserContextProvider';

const Layout = () => {
  return (
    <FirebaseContextProvider>
      <AuthUserContextProvider>
      <div>
        <div>
          <Header />
        </div>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </div>
    </AuthUserContextProvider>
    </FirebaseContextProvider>
  )
}

export default Layout
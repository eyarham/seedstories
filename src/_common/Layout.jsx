import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from "react-router-dom";
import AuthUserContextProvider from '../auth/AuthUserContextProvider';
import FirebaseContextProvider from '../firebase/FirebaseContextProvider';
import HeaderAppBar from './HeaderAppBar';

const Layout = () => {
  return (
    <FirebaseContextProvider>
      <AuthUserContextProvider>
        <div>
          <div>
            <HeaderAppBar />
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
import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from "react-router-dom";
import AuthUserContextProvider from '../auth/AuthUserContextProvider';
import FirebaseContextProvider from '../firebase/FirebaseContextProvider';
import UserContextProvider from '../user/UserContextProvider';
import HeaderAppBar from './HeaderAppBar';
import Footer from './Footer';

const Layout = () => {
  return (
    <FirebaseContextProvider>
      <AuthUserContextProvider>
        <UserContextProvider>
          <div>
            <div>
              <HeaderAppBar />
            </div>
            <Container maxWidth="xl">
              <Outlet />
            </Container>
            <div>
              <Footer />
            </div>
          </div>
        </UserContextProvider>
      </AuthUserContextProvider>
    </FirebaseContextProvider>
  )
}

export default Layout
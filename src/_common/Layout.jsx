import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  )
}

export default Layout
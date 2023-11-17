import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../auth/Login'
import LogoutRoute from '../auth/LogoutRoute'
import Notebook from '../entries/Notebook'
import Home from '../home/Home'
import Bank from '../seeds/Bank'
import SeedFields from '../seeds/SeedFields'
import Profile from '../user/Profile'
import Layout from './Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/seedFields" element={<SeedFields />} />
          <Route path="/notebook" element={<Notebook />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutRoute />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
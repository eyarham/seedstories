import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogoutRoute from '../auth/LogoutRoute'
import Home from '../home/Home'
import SeedFields from '../seeds/SeedFields'
import Seeds from '../seeds/Seeds'
import Layout from './Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bank" element={<Seeds />} />
          <Route path="/seedFields" element={<SeedFields />} />
          <Route path="/logout" element={<LogoutRoute />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
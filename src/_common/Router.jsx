import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogoutRoute from '../auth/LogoutRoute'
import Home from '../home/Home'
import Layout from './Layout'
import Seeds from '../seeds/Seeds'
import SeedFields from '../seeds/SeedFields'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/seeds" element={<Seeds />} />
          <Route path="/seedFields" element={<SeedFields />} />
          <Route path="/logout" element={<LogoutRoute />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
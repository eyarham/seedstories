import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../auth/Login'
import LogoutRoute from '../auth/LogoutRoute'
import EcoRegionUploader from '../ecoregions/EcoRegionUploader'
import EcoregionManager from '../ecoregions/EcoregionManager'
import Ecoregions from '../ecoregions/Ecoregions'
import Bank from '../entries/Bank'
import Notebook from '../entries/Notebook'
import Home from '../home/Home'
import Species from '../species/Species'
import Profile from '../user/Profile'
import Layout from './Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/species" element={<Species />} />
          <Route path="/ecoregions" element={<Ecoregions />} />
          <Route path="/ecoregionManager" element={<EcoregionManager />} />
          <Route path="/ecoregionuploader" element={<EcoRegionUploader />} />
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
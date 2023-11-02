import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Layout from './Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
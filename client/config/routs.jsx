import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout'
import Home from '../src/pages/home/home'
import AuthProvider from './authProvider'
import PrivateRoute from './privateRouter'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="private" element={<Home />} />
        </Route>
      </Route>
    </Route>
  )
)

export default router

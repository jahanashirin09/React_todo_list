import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Login from '../component/Login'
import SignUp from '../component/SignUp'
import ListPage from '../component/ListPage'
import PrivateRoutes from './PrivateRoutes'

export default function PageNavigation() {
  return (
    <div>
        <Routes>
           <Route path="/"element={<SignUp/>}></Route>
          <Route element={<PrivateRoutes/>}>
            <Route path="/listpage" element={<ListPage/>}/>
          </Route>
          <Route path="/login"element={<Login/>}></Route>
        </Routes>
       
    </div>
  )
}

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../component/Login'
import SignUp from '../component/SignUp'
import ListPage from '../component/ListPage'

export default function PageNavigation() {
  return (
    <div>
      
        <Routes>
           <Route path="/"element={<SignUp/>}></Route>
            <Route path="/login"element={<Login/>}></Route>
            <Route path="/listapage" element={<ListPage/>}></Route>
        </Routes>
       
    </div>
  )
}

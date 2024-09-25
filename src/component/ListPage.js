import React from 'react'
import './ListPage.css'
import Addlist from './Addlist'

export default function ListPage() {
    
  return (
    <div className='listpage-main-cointainer'>
        <div className='listpage-header-container'>
            My To Do List  
        </div>
        <Addlist/>
    </div>
  )
}

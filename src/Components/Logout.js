import React from 'react'
import './Logout.css'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate=useNavigate();
    const handleLogout=()=>{
         localStorage.removeItem("LoginStatus")
         navigate('/')
        }
  return (
    <div className="logout-btn-container">
          <button className="logout-btn" onClick={handleLogout} loading>Logout
          </button>
          </div>
  )
}

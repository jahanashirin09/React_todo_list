import { Outlet,Navigate } from "react-router-dom"
 function PrivateRoutes(){  
  
    return localStorage.getItem('login_items')? <Outlet/>:<Navigate to ='/login'/>
 }
 export default PrivateRoutes
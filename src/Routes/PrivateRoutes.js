import { Outlet,Navigate } from "react-router-dom"
 function PrivateRoutes(){  
    return localStorage.getItem('items')? <Outlet/>:<Navigate to ='/login'/>
 }
 export default PrivateRoutes
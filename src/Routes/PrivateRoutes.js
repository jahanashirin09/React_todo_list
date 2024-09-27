import { Outlet,Navigate } from "react-router-dom"
const LOGIN_ITEMS='LoginStatus';
 function PrivateRoutes(){  
   const isAuthenticated=localStorage.getItem(LOGIN_ITEMS)!==null;
    return isAuthenticated? <Outlet/>:<Navigate to ='/'/>}
 export default PrivateRoutes
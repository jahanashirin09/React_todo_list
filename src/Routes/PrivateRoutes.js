import { Outlet,Navigate } from "react-router-dom"
 function PrivateRoutes(){  
   const er=localStorage.getItem('google-items' )
   console.log(er,"hii");
    return localStorage.getItem('items')? <Outlet/>:<Navigate to ='/login'/>
 }
 export default PrivateRoutes
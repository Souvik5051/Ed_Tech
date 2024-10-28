import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({allowedRoles}){
    //for checking if user is logged in
  const isLoggedIn=useSelector((state)=> state?.auth?.isLoggedIn);
  
  //for displaying the options according the role
  const role=useSelector((state)=> state?.auth?.role);
   
   console.log(isLoggedIn);
   console.log(role);

   return isLoggedIn && allowedRoles.find((myRole)=> myRole==role) ? (
     <Outlet/>
   ) : isLoggedIn ? (<Navigate to="/denied"/>) : (<Navigate to="/login"/>)

}

export default RequireAuth;
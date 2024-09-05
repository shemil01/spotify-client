import React from 'react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const AdmnProtect = ({children}) => {
    const admintoken = Cookies.get("adminToken");
  if(admintoken){
    return children
  }else{
    return (
        <>
         {toast.error("Authentication error, please Sign-in for access")}
         <Navigate to="/admin/login" replace />
        </>
    )
   
  }
}

export default AdmnProtect
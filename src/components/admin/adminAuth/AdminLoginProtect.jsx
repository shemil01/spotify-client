import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const AdminLoginProtect = ({children}) => {
    const admintoken = Cookies.get('adminToken')
  if(!admintoken){
    return children
  }else{
    return(
        <>
        <Navigate to="/admin/home" replace />
      </>
    )
  }
  
}

export default AdminLoginProtect
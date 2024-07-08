import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Ui from '../user/Ui/Ui';
import Login from '../login/Login';
import SignUp from '../signup/EmailStep';
import axios from "axios"
import myContext from '../../context/Context';
import Home from '../home/Home';
import { Toaster } from 'react-hot-toast';
import PasswordResetRequest from '../resetPassword/ResetRequest';
import PasswordReset from '../resetPassword/PasswordReset';

export const Axios = axios.create({
 baseURL:"http://localhost:4500/api"
})

const MainPage = () => {
    const [userData, setUserData] = useState([]);
    const [log,setLog] = useState(false)
    
    const details={
    userData,setUserData,log,setLog
}
  return (
    <div>
        <myContext.Provider value={details}>
        <Toaster />
        <Routes>
          <Route path='/home' element={<Home />} />
            <Route path='/' element={<Ui />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/forget-password' element={<PasswordResetRequest />} />
            <Route path='/reset-password/:token' element={<PasswordReset />} />
        </Routes>
        </myContext.Provider>
    </div>
  )
}

export default MainPage
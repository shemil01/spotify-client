import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Ui from '../user/Ui/Ui';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import axios from "axios"
import myContext from '../../context/Context';

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
        <ToastContainer />
        <Routes>
            <Route path='/' element={<Ui />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
        </Routes>
        </myContext.Provider>
    </div>
  )
}

export default MainPage
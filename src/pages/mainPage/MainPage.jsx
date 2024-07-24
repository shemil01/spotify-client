import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../login/Login";
import axios from "axios";
import myContext from "../../context/Context";

import { Toaster } from "react-hot-toast";
import PasswordResetRequest from "../resetPassword/ResetRequest";
import PasswordReset from "../resetPassword/PasswordReset";
import Signup from "../signup/Signup";
import Profail from "../../components/user/account/Profail";
import Ui from "../../components/user/Ui/Ui";
import EditProfail from "../../components/user/account/EditProfail";
import ProtectRoute from "../../components/Authentication/ProtectedRoute";
import Home from "../home/Home";
import SongById from "../Songs/SongById";
import CreatePlaylist from "../playlist/CreatePlaylist";

export const Axios = axios.create({
  baseURL: "http://localhost:4500/api",
});

const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [log, setLog] = useState(false);
  const [isOpen, onClose] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    username: "",
    dateOfBirth: { year: "", month: "", day: "" },
    gender: "",
  });
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const details = {
    userData,
    setUserData,
    log,
    setLog,
    signup,
    setSignup,
    isOpen,
    onClose,
    songs,
    setSongs,
    audioRef,
    seekBar,
    seekBg,
    playlist,
    setPlaylist,
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLog(true);
    }
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const userData = JSON.stringify(userInfo);
      setUserData(userData);
      setLog(true);
    }
  }, []);

  return (
    <div>
      <myContext.Provider value={details}>
        <Toaster />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
          <Route path="/" element={<Ui />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Signup />} />
          <Route path="/forget-password" element={<PasswordResetRequest />} />
          <Route path="/reset-password/:token" element={<PasswordReset />} />
          <Route
            path="/profail"
            element={
              <ProtectRoute>
                <Profail />
              </ProtectRoute>
            }
          />
          <Route
            path="edit-profail"
            element={
              <ProtectRoute>
                <EditProfail />
              </ProtectRoute>
            }
          />
          <Route path="/song-by-id/:songId" element={<SongById/>} />
          <Route path="/create-playlist/:songId" element={<CreatePlaylist/>} />
        </Routes>
      </myContext.Provider>
    </div>
  );
};

export default MainPage;

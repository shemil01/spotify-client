import React, { useEffect, useState } from "react";
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
import PlaylistById from "../playlist/PlaylistById";
import Music from "../Songs/Music";
import Search from "../../components/search/Search";
import AdminLogin from "../../components/admin/AdminLogin";
import AdminHome from "../../components/admin/pages/AdminHome";
import Users from "../../components/admin/pages/users/Users";
import Allsongs from "../../components/admin/pages/Songs/Allsongs";
import AddSong from "../../components/admin/pages/Songs/AddSong";
import ViewSong from "../../components/admin/pages/Songs/ViewSong";
import AdmnProtect from "../../components/admin/adminAuth/AdmnProtect";
import AdminLoginProtect from "../../components/admin/adminAuth/AdminLoginProtect";
import EditSong from "../../components/admin/pages/Songs/EditSong";

// export const Axios = axios.create({
//   baseURL: "http://localhost:4500/api",
//   withCredentials: true,
// });
 
export const Axios = axios.create({
  baseURL: "https://spotify-server-mxch.onrender.com/api",
  withCredentials: true,
});

const MainPage = () => {
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState({});
  const [log, setLog] = useState(false);
  const [isOpen, onClose] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [adminLog, setAdminLog] = useState(false);
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    username: "",
    dateOfBirth: { year: "", month: "", day: "" },
    gender: "",
  });
  const [addPlaylist, setAddPlaylist] = useState({
    coverImage: null,
    title: "",
    description: "",
  });

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
    playlist,
    setPlaylist,
    addPlaylist,
    setAddPlaylist,
    isPlaylist,
    setIsPlaylist,
    users,
    setUsers,
    adminLog,
    setAdminLog,
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLog(true);
    }
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const userData = JSON.parse(userInfo);
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
          <Route path="/song-by-id/:songId" element={<SongById />} />
          <Route path="/create-playlist/:songId" element={<CreatePlaylist />} />
          <Route
            path="/playlist-by-id/:playlistId"
            element={<PlaylistById />}
          />
          <Route path="/music" element={<Music />} />
          <Route path="/search" element={<Search />} />

          <Route
            path="/admin/login"
            element={
              <AdminLoginProtect>
                <AdminLogin />
              </AdminLoginProtect>
            }
          />
          <Route
            path="/admin/home"
            element={
              <AdmnProtect>
                <AdminHome />
              </AdmnProtect>
            }
          />
          <Route
            path="/admin/all-users"
            element={
              <AdmnProtect>
                <Users />
              </AdmnProtect>
            }
          />
          <Route
            path="/admin/all-songs"
            element={
              <AdmnProtect>
                <Allsongs />
              </AdmnProtect>
            }
          />
          <Route
            path="/admin/view-song/:songId"
            element={
              <AdmnProtect>
                <ViewSong />
              </AdmnProtect>
            }
          />
          <Route
            path="/admin/add-song"
            element={
              <AdmnProtect>
                <AddSong />
              </AdmnProtect>
            }
          />
          <Route
            path="/admin/edit-song/:songId"
            element={
              <AdmnProtect>
                <EditSong />
              </AdmnProtect>
            }
          />
        </Routes>
      </myContext.Provider>
    </div>
  );
};

export default MainPage;

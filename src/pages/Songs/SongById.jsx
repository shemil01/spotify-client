import React, { useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "../../components/nav/SideBar";
import {  useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/Context";
import Cookies from "js-cookie";
import { Axios } from "../mainPage/MainPage";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline, IoIosMore } from "react-icons/io";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import Menu from "../../components/Toggle/Menu";
import SubMenu from "../../components/Toggle/SubMenu";
import ToggleMenu from "../../components/Toggle/ToggleMenu";

const SongById = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userData, setUserData, setLog} = useContext(myContext);
  const { songId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);


  
  // Logout function
  const Logout = () => {
    Cookies.remove("token");
    setLog(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUserData("");
    navigate("/");
  };

  // Play/pause function
  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Fetch song by ID
  useEffect(() => {
    Axios.get(`/song-by-id/${songId}`, { withCredentials: true })
      .then((response) => {
        setSong(response.data.songData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [songId]);

  const onToggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
    e.name = e.name === "menu" ? "close" : "menu";
  };
  const onToggleSubMenu = (e) => {
    setIsSubMenuOpen(!isSubMenuOpen);
    e.name = e.name === "menu" ? "close" : "menu";
  };

  const mobileView = useMediaQuery({ query: "(max-width: 1000px)" });

  
  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      {!mobileView && <NavBar />}
      <div className="bg-gradient-to-b from-emerald-900 to-stone-900 flex-1 h-[85%] rounded-md">
        <ToggleMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigate={navigate}
          userData={userData}
          Logout={Logout}
        />
        <div className="w-full h-[calc(96%-6rem)] overflow-y-auto no-scrollbar">
          <div className="mt-10 flex gap-2 flex-col md:flex-row md:items-end ">
            <img
              src={song?.coverImage}
              alt=""
              className="w-48 rounded m-2 flex"
            />
            <div className="flex flex-col gap-y-5 text-white">
              <p>Song</p>
              <h1 className="font-extrabold text-6xl capitalize">
                {song?.name}
              </h1>
              <p className="hover:underline">Artist</p>
              <audio ref={audioRef} src={song?.fileUrl} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-10 m-3">
              <span className="text-green-500 text-5xl" onClick={playPause}>
                {isPlaying ? <MdOutlinePauseCircleFilled /> : <FaCirclePlay />}
              </span>
              <span className="text-white text-4xl">
                <IoIosAddCircleOutline />
              </span>
              <span className="text-white text-4xl" onClick={onToggleMenu}>
                <IoIosMore />
              </span>
              <Menu isMenuOpen={isMenuOpen} onToggleSubMenu={onToggleSubMenu} />
            <SubMenu isSubMenuOpen={isSubMenuOpen} songId={songId} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SongById;

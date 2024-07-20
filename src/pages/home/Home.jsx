import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/NavBar";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import myContext from "../../context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Axios } from "../mainPage/MainPage";
import { FaCirclePlay } from "react-icons/fa6";
import ReactAudioPlayer from 'react-audio-player';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const { userData, setUserData, setLog, songs, setSongs } =
    useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/view-songs")
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //logout
  const Logout = () => {
    Cookies.remove("token");
    setLog(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUserData("");
    navigate("/");
  };

  const onToggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
    e.name = e.name === "menu" ? "close" : "menu";
  };

  //...
 
  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      <NavBar />
      <div className="bg-[#121212] flex-1 h-[85%] rounded-md">
        <header className="flex items-center justify-between py-3 px-3">
          <div className="flex space-x-4">
            <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
              <button className="text-[#a7a7a7] text-1xl">
                <MdArrowBackIos />
              </button>
            </div>
            <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
              <button className="text-[#a7a7a7] text-1xl">
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
          <div>
            <button className="text-white text-3xl" onClick={onToggleMenu}>
              {userData.profilePicture ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={userData.profilePicture}
                  alt=""
                />
              ) : (
                <RiAccountCircleFill className="text-3xl" />
              )}
            </button>
          </div>
        </header>
        <div className="flex ">
          <div className="flex flex-wrap space-x-7 py-3 px-4">
            <div className="bg-white rounded-full w-10 h-8 flex items-center justify-center">
              <span className="text-black ">All</span>
            </div>
            <div className="bg-[#292828] h-8 w-16 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">Music</span>
            </div>
            <div className="bg-[#292828] h-8 w-20 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">Podcast</span>
            </div>
          </div>
        </div>
        {/* list songs */}
        <div className="w-full bg-[#161515]">
  <div className="m-5">
    <div>
      <p className="text-white font-bold text-2xl">Popular Songs</p>
    </div>
    {songs.map((songData) => (
   <div className="group relative flex flex-col items-center bg-[#161515] p-4 w-48 rounded-lg transition-all duration-300 hover:bg-[#2b2929]">
   <div className="relative w-full">
     <img src={songData.coverImage} alt={songData.name} className="w-full rounded-lg" />
     <button className="absolute right-2 bottom-2 text-green-600 text-5xl opacity-0 group-hover:opacity-100 transform group-hover:translate-y-[-20px] transition-transform transition-opacity duration-400 ease-in-out">
       <FaCirclePlay />
     </button>
   </div>
   <p className="mt-2 text-white text-center font-semibold">{songData.name}</p>
   <p className="text-gray-400 text-center text-sm">{songData.artist}</p>
   <ReactAudioPlayer
  src={songData.fileUrl}
  autoPlay
  controls
/>
</div>
    ))}
  </div>
</div>

      </div>

      {isMenuOpen && (
        <div className="w-48 bg-[#292828] h-64 rounded-md absolute top-14 right-4">
          <div className="h-full">
            <ul className="text-white font-semibold  px-2 flex flex-col justify-evenly h-full">
              <li
                onClick={() => navigate("/profail")}
                className="hover:bg-[#383838] p-2"
              >
                account{" "}
              </li>
              <li className="hover:bg-[#383838] p-2">Upgrade To Premium</li>
              <li className="hover:bg-[#383838] p-2">Private Session</li>
              <li className="hover:bg-[#383838] p-2">settings</li>
              <hr />
              <li className="hover:bg-[#383838] p-2" onClick={() => Logout()}>
                logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

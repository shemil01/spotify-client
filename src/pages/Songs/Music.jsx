import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../../components/nav/SideBar";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import myContext from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Axios } from "../mainPage/MainPage";
import { FaCirclePlay } from "react-icons/fa6";
import Player from "../../components/player/Desktop";
import ToggleMenu from "../../components/Toggle/ToggleMenu";
import { ClipLoader } from 'react-spinners';

const Music = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const   [loading,setLoading] = useState(true)


  const { userData, setUserData, setLog, songs, setSongs } =
    useContext(myContext);

  const navigate = useNavigate();

  const audioRefs = useRef([]);

  const playPause = (index) => {
    if (currentSong !== null && currentSong !== index) {
      audioRefs.current[currentSong].pause();
      audioRefs.current[currentSong].currentTime = 0;
    }

    if (currentSong === index && isPlaying) {
      audioRefs.current[index].pause();
      setIsPlaying(false);
    } else {
      setCurrentSong(index);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentSong !== null) {
      const audioElement = audioRefs.current[currentSong];
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    Axios.get("/view-songs")
      .then((response) => {
        setSongs(response.data.songs);
        setLoading(false)
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

  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      <NavBar />
      <div className="bg-[#121212] flex-1 h-[85%] rounded-md">
        <ToggleMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navigate={navigate}
          userData={userData}
          Logout={Logout}
        />
        <div className="flex ">
          <div className="flex flex-wrap space-x-7 py-3 px-4">
            <div className="bg-white rounded-full w-10 h-8 flex items-center justify-center">
              <span className="text-black ">All</span>
            </div>
            <div className="bg-[#292828] h-8 w-16 rounded-full flex items-center justify-center">
              <span
                className="text-white font-semibold"
                onClick={() => navigate("/music")}
              >
                Music
              </span>
            </div>
            <div className="bg-[#292828] h-8 w-20 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">Podcast</span>
            </div>
          </div>
        </div>
        {/* list songs */}
        {loading ?  <div className="flex justify-center items-center h-screen bg-black">
        <ClipLoader color={"#ffffff"} loading={loading} size={50} />
      </div> : <div className="w-full bg-[#161515] h-[calc(96%-6rem)] overflow-y-auto no-scrollbar">
          <div className="m-5">
            <div>
              <p className="text-white font-bold text-2xl">Popular Songs</p>
            </div>
            <div className=" grid grid-cols-5  gap-1">
              {songs.map((songData, index) => (
                <div
                  key={index}
                  className="group relative  items-center  bg-[#161515] p-4 w-48 rounded-lg transition-all duration-300 hover:bg-[#2b2929]"
                >
                  <div className="relative w-full">
                    <img
                      src={songData.coverImage}
                      alt={songData.name}
                      className="w-full rounded-lg"
                    />
                    <button
                      onClick={() => playPause(index)}
                      className="absolute right-2 bottom-2 text-green-600 bg-black rounded-full text-5xl opacity-0 group-hover:opacity-100 transform group-hover:translate-y-[-20px] transition-transform transition-opacity duration-400 ease-in-out"
                    >
                      {isPlaying && currentSong === index ? (
                        <MdOutlinePauseCircleFilled />
                      ) : (
                        <FaCirclePlay />
                      )}
                    </button>
                  </div>
                  <Link to={`/song-by-id/${songData._id}`}>
                    <p className="mt-2 text-white text-center font-semibold hover:underline">
                      {songData.name}
                    </p>
                  </Link>
                  <p className="text-gray-400 text-center text-sm">
                    {songData.artist}
                  </p>
                  <audio
                    src={songData.fileUrl}
                    ref={(el) => (audioRefs.current[index] = el)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>}
      </div>

      {isMenuOpen && (
        <div className="w-48 bg-[#292828] h-64 rounded-md absolute top-14 right-4">
          <div className="h-full">
            <ul className="text-white font-semibold  px-2 flex flex-col justify-evenly h-full">
              <li
                onClick={() => navigate("/profail")}
                className="hover:bg-[#383838] p-2"
              >
                account
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
      <Player
        currentSong={currentSong !== null ? songs[currentSong] : null}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={currentSong !== null ? audioRefs.current[currentSong] : null}
        playPause={playPause}
        currentSongIndex={currentSong}
        setCurrentSongIndex={setCurrentSong}
      />
    </div>
  );
};

export default Music;

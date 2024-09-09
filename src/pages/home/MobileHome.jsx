import React, { useContext, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { RiAccountCircleFill } from "react-icons/ri";
import myContext from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Axios } from "../mainPage/MainPage";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlinePauseCircleFilled, MdHomeFilled } from "react-icons/md";
import { FaSearch, FaSpotify } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import MobilePlayer from "../../components/player/Mobile";

const MobileHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
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

  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      <div className="bg-[#121212] flex-1 rounded-md">
        <div className="flex flex-wrap space-x-7 py-3 px-4 justify-between -z-20">
          <div className=" flex flex-wrap space-x-2">
            <div className="bg-white rounded-full w-10 h-8 flex items-center justify-center">
              <span className="text-black ">All</span>
            </div>
            <div className="bg-[#292828] h-8 w-16 rounded-full flex items-center justify-center">
              <span
                className="text-white font-semibold"
                // onClick={() => navigate("/music")}
              >
                Music
              </span>
            </div>
            <div className="bg-[#292828] h-8 w-20 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">Podcast</span>
            </div>
          </div>
          <div className="">
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
        </div>

        {/* list songs */}
        {loading ? (
          <div className="flex justify-center items-center h-screen bg-black">
            <ClipLoader color={"#ffffff"} loading={loading} size={50} />
          </div>
        ) : (
          <div className="w-full bg-[#161515]  h-[calc(96%-6rem)]  overflow-y-auto no-scrollbar">
            <div className="m-5">
              <div>
                <p className="text-white font-bold text-2xl">Popular Songs</p>
              </div>
              <div className=" grid grid-cols-2  md:grid-cols-3 ">
                {songs.map((songData, index) => (
                  <div
                    key={index}
                    className="group relative  items-center  bg-[#161515] p-2  rounded-lg transition-all duration-300 hover:bg-[#2b2929]"
                  >
                    <div className="relative w-full">
                      <Link to={`/song-id/${songData._id}`}>
                        {" "}
                        <img
                          src={songData.coverImage}
                          alt={songData.name}
                          className="w-full rounded-lg"
                        />
                      </Link>
                      <button
                        onClick={() => playPause(index)}
                        className="absolute right-2 bottom-2 text-green-600 bg-black rounded-full text-3xl "
                      >
                        {isPlaying && currentSong === index ? (
                          <MdOutlinePauseCircleFilled />
                        ) : (
                          <FaCirclePlay />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-white text-center font-semibold">
                      {songData.name}
                    </p>
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
          </div>
        )}
      </div>
      {isMenuOpen && (
        <div className=" w-full h-screen flex space-y-3 bg-[#292828]  z-30 absolute ">
          <div className="h-full ">
            <ul className="text-white font-semibold  px-2 flex flex-col justify-evenly h-full ">
              <li
                onClick={() => navigate("/profail")}
                className="hover:bg-[#383838] p-2"
              >
                account
              </li>
              <li className=" p-2">Upgrade To Premium</li>
              <li className=" p-2">Private Session</li>
              <li className=" p-2">settings</li>
              <hr className=" w-screen" />
              <div className="bg-white text-black flex justify-center items-center w-2/6 mx-24 rounded-full ">
                <li className="font-semibold p-2" onClick={() => Logout()}>
                  Log out
                </li>
              </div>
              <li className="p-2 text-3xl" onClick={onToggleMenu}>
                <IoMdCloseCircle />
              </li>
            </ul>
          </div>
        </div>
      )}
      <MobilePlayer
        currentSong={currentSong !== null ? songs[currentSong] : null}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={currentSong !== null ? audioRefs.current[currentSong] : null}
        playPause={playPause}
        currentSongIndex={currentSong}
        setCurrentSongIndex={setCurrentSong}
      />
      <footer className="bg-black w-full fixed bottom-0 left-0 text-white  p-3">
        <div className="text-white flex font-extralight text-2xl justify-around">
          <span>
            <MdHomeFilled />
          </span>
          <span onClick={() => navigate("/search")}>
            <FaSearch />
          </span>
          <span>
            <BiLibrary />
          </span>
          <span>
            <FaSpotify />
          </span>
        </div>
      </footer>
    </div>
  );
};

export default MobileHome;

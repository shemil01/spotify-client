import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { Axios } from "../mainPage/MainPage";
import NavBar from "../../components/nav/NavBar";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline, IoIosMore } from "react-icons/io";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
// import ToggleMenu from "../../components/ToggleMenu";

const PlaylistById = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

const playRef = useRef()

const playPause = ()=>{
  if(isPlaying){
    playRef.current.pause()
  }else{
    playRef.current.play()
  }
  setIsPlaying(!isPlaying)
}


  const mobileView = useMediaQuery({ query: "(max-width: 1000px)" });

  useEffect(() => {
    Axios.get(`playlist-by-id/${playlistId}`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        setPlaylist(response.data.playlists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playlistId]);

  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      {!mobileView && <NavBar />}
      <div className="bg-gradient-to-b from-emerald-900 to-stone-900 flex-1 h-[85%] rounded-md overflow-y-auto no-scrollbar">
        <div className="md:px-10 px-2">
          <div className="mt-10 md:flex md:flex-row">
            <div className="flex justify-center items-center">
              <img
                src={playlist?.coverImage}
                alt=""
                className="md:w-40 w-52 rounded m-2"
              />
            </div>
            <div className="gap-y-5 text-white m-4">
              {!mobileView && <p>Playlist</p>}
              <h1 className="font-extrabold md:text-6xl capitalize">
                {playlist?.title}
              </h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap md:gap-10 gap-16 md:m-3 m-5">
              <span onClick={playPause} className="text-green-500 md:text-5xl text-4xl">
                {isPlaying?<MdOutlinePauseCircleFilled/> :<FaCirclePlay />}
              </span>
              <span className="text-white text-4xl">
                <IoIosAddCircleOutline />
              </span>
              <span className="text-white text-4xl">
                <IoIosMore />
              </span>
            </div>
          </div>
          {!mobileView && (
            <div className="grid md:grid-cols-4 mt-10 mb-4 pl-2 text-white">
              <p>
                <b className="mr4">#</b>Title
              </p>
              <p>Album</p>
              {/* <p className="hidden sm:block">Date Added</p> */}
            </div>
          )}
        </div>
        <hr className="opacity-35" />
        {playlist?.songs?.map((songData, index) => (
          <div
            key={index}
            className="items-center cursor-pointer mt-5 song-row"
          >
            <div className="grid grid-cols-4">
              <div className="flex w-full justify-between">
                <p className="text-white mx-3 song-index mt-3">
                  <b>{index + 1}</b>
                </p>
                <button onClick={playPause}>{isPlaying?<MdOutlinePauseCircleFilled  className="text-green-500 mx-3 text-3xl mt-3 song-play-button hidden"/> :<FaCirclePlay className="text-green-500 mx-3 text-3xl mt-3 song-play-button hidden" />}</button>
               
                <img src={songData.coverImage} alt="" className="w-10" />
                <p className="text-white mx-3">{songData.name}</p>
              </div>
              <div className="flex w-full mx-5">
                {!mobileView && <p className="text-white">{playlist?.title}</p>}
                <audio ref={playRef} src={songData?.fileUrl}></audio>
              </div>
              <IoIosMore className="text-white song-more-icon hidden mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistById;

import React, { useEffect, useState } from "react";
import SideNav from "../../adminComponent/SideNav";
import TopNav from "../../adminComponent/TopNav";
import { Axios } from "../../../../pages/mainPage/MainPage";
import { useParams } from "react-router-dom";
import { IoIosAddCircleOutline, IoIosMore } from "react-icons/io";
import DeleteSong from "./DeleteSong";

const ViewSong = () => {
  const [song, setSong] = useState(null);
  const { songId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    setIsOpen(!isOpen);
    e.name = e.name === "menu" ? "close" : "menu";
  };

  useEffect(() => {
    Axios.get(`/admin/songby-id/${songId}`, { withCredentials: true })
      .then((response) => {
        setSong(response.data.songData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [songId]);

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <TopNav />
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
              <div>
                <p>Artist</p>
                <h1 className="hover:underline">{song?.artist}</h1>
              </div>

              {/* <audio ref={audioRef} src={song?.fileUrl} /> */}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-10 m-3">
              <span className="text-green-500 text-5xl">
                {/* {isPlaying ? <MdOutlinePauseCircleFilled /> : <FaCirclePlay />} */}
              </span>
              <span className="text-white text-4xl">
                <IoIosAddCircleOutline />
              </span>
              <span className="text-white text-4xl" onClick={toggleMenu}>
                <IoIosMore />
              </span>
              <DeleteSong isOpen={isOpen} songId={songId} song={song}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSong;

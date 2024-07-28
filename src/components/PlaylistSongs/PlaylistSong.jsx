import React, { useState, } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { Axios } from "../../pages/mainPage/MainPage";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdDelete,  } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const PlaylistSongs = ({ playlist, isPlaying, playPause, playRef }) => {
  const [activeSongMenu, setActiveSongMenu] = useState(null);

  // Toggle menu for a specific song
  const songToggle = (songId) => {
    setActiveSongMenu(activeSongMenu === songId ? null : songId);
  };

  // Delete song from playlist
  const deleteSong = (songId) => {
    Axios.delete(`remove-song/${songId}`, {
      withCredentials: true,
    })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col">
      {playlist?.songs?.map((songData, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer mt-5 song-row"
        >
          <div className="grid grid-cols-4">
            <div className="flex w-full justify-between">
              <p className="text-white mx-3 song-index mt-3">
                <b>{index + 1}</b>
              </p>
              <button onClick={playPause}>
                {isPlaying ? (
                  <MdOutlinePauseCircleFilled className="text-green-500 mx-3 text-3xl mt-3 song-play-button hidden" />
                ) : (
                  <FaCirclePlay className="text-green-500 mx-3 text-3xl mt-3 song-play-button hidden" />
                )}
              </button>
              <img src={songData.coverImage} alt="" className="w-10" />
              <p className="text-white mx-3">{songData.name}</p>
            </div>
            <div className="flex w-full mx-5">
              <audio ref={playRef} src={songData?.fileUrl}></audio>
            </div>
            <IoIosMore
              onClick={() => songToggle(songData._id)}
              className="text-white song-more-icon hidden mt-3"
            />
            {activeSongMenu === songData._id && (
              <div className="w-48 bg-[#292828] h-36 rounded-md absolute right-0">
                <div className="h-full mx-2">
                  <Link
                    className="flex  justify-between py-3 hover:bg-[#383838] rounded-md"
                    onClick={() => deleteSong(songData?._id)}
                  >
                    <div className="flex justify-between ">
                      <MdDelete className="mr-3 text-[#a7a7a7] mt-1" />
                      <span className="text-white "> delete</span>
                    </div>
                  </Link>
                  <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
                    <div className="flex justify-between ">
                      <IoAdd className="mr-3 text-[#a7a7a7] mt-1" />
                      <span className="text-white "> Create new Playlist</span>
                    </div>
                  </Link>
                  <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
                    <div className="flex justify-between ">
                      <IoAdd className="mr-3 text-[#a7a7a7] mt-1" />
                      <span className="text-white "> Add to Playlist</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistSongs;

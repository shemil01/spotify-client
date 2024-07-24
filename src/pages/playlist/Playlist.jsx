import React, { useEffect, useState } from "react";

import { Axios } from "../mainPage/MainPage";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isPlaylist,setIsPlaylist] = useState(false)


  useEffect(() => {
    Axios.get("/view-playlist", {
      withCredentials: true,
    })
      .then((response) => {
        console.log("hh", response.data.playlist);
        setPlaylist(response.data.playlist);
        setIsPlaylist(true)
      })
      .catch((error) => {
        console.log("fetching error", error);
      });
  }, []);

  return (
    <div className="m-5">
      <div>
        <p className="text-white font-bold text-2xl">Popular Playlist</p>
      </div>
      <div className=" grid grid-cols-4  gap-1">
        {isPlaylist && playlist?.map((playlistData, index) => (
          <div
            key={index}
            className="group relative  items-center  bg-[#161515] p-4 w-48 rounded-lg transition-all duration-300 hover:bg-[#2b2929]"
          >
            <div className="relative w-full">
              <img
                src={playlistData.coverImage}
                alt={playlistData.title}
                className="w-full rounded-lg"
              />
            </div>
            <p className="mt-2 text-white text-center font-semibold">
              {playlistData.title}
            </p>
            <p className="text-gray-400 text-center text-sm">
              {playlistData.artist}
            </p>
            <audio src={playlistData.songs.fileUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;

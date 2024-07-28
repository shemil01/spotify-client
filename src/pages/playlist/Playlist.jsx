import React, { useContext, useEffect } from "react";

import { Axios } from "../mainPage/MainPage";
import { Link } from "react-router-dom";
import myContext from "../../context/Context";

const Playlist = () => {
  const { playlist, setPlaylist, isPlaylist, setIsPlaylist } =
    useContext(myContext);

  useEffect(() => {
    Axios.get("/view-playlist", {
      withCredentials: true,
    })
      .then((response) => {
        setPlaylist(response.data.playlist);

        setIsPlaylist(true);
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
        {isPlaylist &&
          playlist?.map((playlistData, index) => (
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
              <Link to={`/playlist-by-id/${playlistData._id}`}>
                {" "}
                <p className="mt-2 text-white text-center font-semibold hover:underline">
                  {playlistData.title}
                </p>
              </Link>
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

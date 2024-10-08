import React, { useContext, useEffect, useState } from "react";
import TopNav from "../../adminComponent/TopNav";
import SideNav from "../../adminComponent/SideNav";
import { Axios } from "../../../../pages/mainPage/MainPage";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteSong from "./DeleteSong";
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from "react-router-dom";

const Allsongs = () => {
  const navigate = useNavigate()
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/admin/songs", {
      withCredentials: true,
    })
      .then((response) => {
        setSongs(response.data.songs);
        setLoading(false)
      })
      .catch((error) => {
        
        console.log(error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <TopNav />
      { loading ?  <div className="flex justify-center items-center h-screen bg-black">
        <ClipLoader color={"#ffffff"} loading={loading} size={50} />
      </div> : <main className="flex-grow p-6 overflow-y-auto no-scrollbar">
          <div className="m-5">
            <div>
              <p className="text-white font-bold text-2xl">All Songs</p>
            </div>
            <div className=" grid grid-cols-5  gap-1">
              {songs.map((songData, index) => (
                <div
                  key={index}
                  className="group relative  items-center mt-5 bg-[#161515] p-4 w-48 rounded-lg transition-all duration-300 hover:bg-[#2b2929]"
                >
                  <div className="relative w-full">
                    <img
                      src={songData.coverImage}
                      alt={songData.name}
                      className="w-full rounded-lg"
                    />
                    {/* <button
                      onClick={() => playPause(index)}
                      className="absolute right-2 bottom-2 text-green-600 bg-black rounded-full text-5xl opacity-0 group-hover:opacity-100 transform group-hover:translate-y-[-20px] transition-transform transition-opacity duration-400 ease-in-out"
                    >
                      {isPlaying && currentSong === index ? (
                        <MdOutlinePauseCircleFilled />
                      ) : (
                        <FaCirclePlay />
                      )}
                    </button> */}
                  </div>

                  <Link to={`/admin/view-song/${songData._id}`}>
                  <p className="mt-2 text-white text-center font-semibold hover:underline">
                    {songData.name}
                  </p>
                  <div className="flex justify-end ">
                    <BsThreeDotsVertical  />
                  </div>
                  
                  </Link>
                  <p className="text-gray-400 text-center text-sm">
                    {songData.artist}
                  </p>
                  {/* <audio
                    src={songData.fileUrl}
                    ref={(el) => (audioRefs.current[index] = el)}
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </main>}
      </div>
    </div>
  );
};

export default Allsongs;

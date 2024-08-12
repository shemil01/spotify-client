import React, { useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../mainPage/MainPage";
import NavBar from "../../components/nav/SideBar";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline, IoIosMore } from "react-icons/io";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import PlaylistSongs from "../../components/PlaylistSongs/PlaylistSong";
import myContext from "../../context/Context";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdOutlineIosShare } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";

const PlaylistById = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const { playlist, setPlaylist,userData } = useContext(myContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistMenu, setPlaylistMenu] = useState(false);
  const playRef = useRef();

console.log('use',userData)
  const playlistToggle = (e) => {
    setPlaylistMenu(!playlistMenu);
    e.currentTarget.name = playlistMenu ? "menu" : "close";
  };

  const playPause = () => {
    if (isPlaying) {
      playRef.current.pause();
    } else {
      playRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    Axios.get(`playlist-by-id/${playlistId}`, { withCredentials: true })
      .then((response) => {
        setPlaylist(response.data.playlists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playlistId]);

  const deletePlaylist = async () => {
    await Axios.delete(`/delete-playlist/${playlistId}`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error deleting playlist:", error);
        toast.error("Failed to delete playlist. Please try again.");
      });
  };
  const mobileView = useMediaQuery({ query: "(max-width: 1000px)" });

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
              <p>{playlist?.description}</p>
              {!mobileView && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {userData.profilePicture ? (
                    <img
                      className="w-5 h-5 rounded-full"
                      src={userData.profilePicture}
                      alt=""
                    />
                  ) : (
                    <RiAccountCircleFill />
                  )}
                  <span className="font-semibold">{userData?.username},</span>
                  <span className="font-semibold">{playlist?.songs?.length} songs</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-wrap md:gap-10 gap-16 md:m-3 m-5 relative ">
              <span
                onClick={playPause}
                className="text-green-500 md:text-5xl text-4xl"
              >
                {isPlaying ? <MdOutlinePauseCircleFilled /> : <FaCirclePlay />}
              </span>
              <span className="text-white text-4xl">
                <IoIosAddCircleOutline />
              </span>
              <span className="text-white text-4xl">
                <IoIosMore onClick={playlistToggle} />
              </span>
              {playlistMenu && (
                <div className="w-48 bg-[#292828] h-auto rounded-md  md:absolute top-5 right-[-190px] z-10">
                  <div className="mx-2">
                    <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
                      <div className="flex justify-between ">
                        <CiEdit className="mr-3 text-[#a7a7a7] mt-1" />
                        <span className="text-white "> Edit Details</span>
                      </div>
                    </Link>
                    <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
                      <div className="flex justify-between ">
                        <MdDelete className="mr-3 text-[#a7a7a7] mt-1" />
                        <span className="text-white " onClick={deletePlaylist}>
                          {" "}
                          Delete
                        </span>
                      </div>
                    </Link>
                    <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
                      <div className="flex justify-between ">
                        <IoIosRemoveCircle className="mr-3 text-[#a7a7a7] mt-1" />
                        <span className="text-white ">
                          {" "}
                          Remove From Profail
                        </span>
                      </div>
                    </Link>
                    <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
                      <div className="flex justify-between ">
                        <MdOutlineIosShare className="mr-3 text-[#a7a7a7] mt-1" />
                        <span className="text-white "> Share</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!mobileView && (
            <div className="grid md:grid-cols-4 mt-10 mb-4 pl-2 text-white">
              <p>
                <b className="mr4">#</b>Title
              </p>
              <p>Album</p>
            </div>
          )}
        </div>
        <hr className="opacity-35" />
        <PlaylistSongs
          playlist={playlist}
          isPlaying={isPlaying}
          playPause={playPause}
          playRef={playRef}
        />
      </div>
    </div>
  );
};

export default PlaylistById;

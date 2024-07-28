import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/Context";
import { Axios } from "../../pages/mainPage/MainPage";
import toast from "react-hot-toast";
import { IoAdd } from "react-icons/io5";

const SubMenu = ({ isSubMenuOpen, songId }) => {
  const navigate = useNavigate();
  const { playlist,  } = useContext(myContext);

  const addExistingPlaylist = (playlistId, songId) => {
    Axios.post("/addTo-playlist", { playlistId, songId })
      .then((response) => {
        toast.success(response.data.message);
        navigate(`/playlist-by-id/${playlistId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    isSubMenuOpen && (
      <div className="w-48 bg-[#292828] h-auto rounded-md ">
        <div className="h-full mx-2 font-semibold text-sm">
          <Link
            className="flex  justify-between py-3 hover:bg-[#383838] rounded-md"
            to={`/create-playlist/${songId}`}
          >
            <div className="flex justify-between ">
              <IoAdd className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white "> Create New Playlist</span>
            </div>
            <hr />
          </Link>
          {playlist.map((item) => (
            <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
              <div className="flex justify-between ">
                {/* <MdOutlineIosShare className="mr-3 text-[#a7a7a7] mt-1" /> */}
                <span
                  key={item._id}
                  className="text-white "
                  onClick={() => addExistingPlaylist(item._id, songId)}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default SubMenu;

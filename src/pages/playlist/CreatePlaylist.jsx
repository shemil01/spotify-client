import React, { useContext} from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "../../components/nav/NavBar";
import { IoIosMore } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../mainPage/MainPage";
import toast from "react-hot-toast";
import myContext from "../../context/Context";

const CreatePlaylist = () => {
  const { addPlaylist, setAddPlaylist ,setPlaylist,setIsPlaylist} = useContext(myContext);
  const { songId } = useParams();
  const mobileView = useMediaQuery({ query: "(max-width: 1000px)" });
const navigate = useNavigate()
  // Function to get default image
  const getDefaultImage = () => {
    return "https://via.placeholder.com/150";
  };

  // Create playlist
  const createPlaylist = async () => {
    const formData = new FormData();
    formData.append("title", addPlaylist.title);
    formData.append("coverImage", addPlaylist.coverImage);

    try {
      const response = await Axios.post(
        `/create-playlist/${songId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      toast.success(response.data.message);
      navigate('/home')
      setPlaylist(addPlaylist)
      setIsPlaylist(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      {!mobileView && <NavBar />}
      <div className="bg-gradient-to-b from-emerald-900 to-stone-900 flex-1 h-[85%] rounded-md">
        <div className="w-full md:h-[calc(96%-6rem)] h-[100%] overflow-y-auto no-scrollbar">
          <div className="mt-10 md:flex md:flex-row md:m-6 md:gap-5">
            <div className="flex justify-center items-center ">
              <input
                type="file"
                accept="image/*"
                hidden
                id="imageInput"
                onChange={(e) =>
                  setAddPlaylist({
                    ...addPlaylist,
                    coverImage: e.target.files[0],
                  })
                }
              />
              <label htmlFor="imageInput">
                <img
                  src={
                    addPlaylist.coverImage
                      ? URL.createObjectURL(addPlaylist.coverImage)
                      : getDefaultImage()
                  }
                  className="w-48 cursor-pointer"
                  alt="Playlist Cover"
                />
              </label>
            </div>
            <div className="flex flex-col gap-y-5   text-white md:justify-center md:m6">
              <p>Playlist</p>
              <label className="font-extrabold">Playlist Name</label>
              <input
                type="text"
                className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
                placeholder="Type here"
                required
                value={addPlaylist.title}
                onChange={(e) =>
                  setAddPlaylist({ ...addPlaylist, title: e.target.value })
                }
              />
              <p className="hover:underline">Artist</p>
              <button
                className="text-white bg-green-600 w-36 rounded"
                onClick={createPlaylist}
              >
                Save
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-10 m-3">
              <span className="text-white text-4xl">
                <IoIosMore />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;

import React, { useState, useEffect } from "react";
import SideNav from "../../adminComponent/SideNav";
import TopNav from "../../adminComponent/TopNav";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../pages/mainPage/MainPage";
import toast from "react-hot-toast";

const EditSong = () => {
  const navigate = useNavigate()
  const { songId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");
  const [editSong, setEditSong] = useState({
    name: "",
    coverImage: null,
    fileUrl: null,
    artist: "",
    duration: 0,
    description: "",
  });

  useEffect(() => {
    Axios.get(`/admin/songby-id/${songId}`, {
      withCredentials: true,
    })
      .then((response) => {
        const fetchedSong = response.data.songData;
        setEditSong({
          name: fetchedSong?.name || "",
          coverImage: fetchedSong?.coverImage || null,
          fileUrl: fetchedSong?.fileUrl || null,
          artist: fetchedSong?.artist || "",
          duration: fetchedSong?.duration || 0,
          description: fetchedSong?.description || "",
        });
        setCoverPreview(fetchedSong?.coverImage || "");
        
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to load song");
       
      });
  }, [songId]);

  // duration calculation
  const calculateDuration = (file) => {
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      setEditSong((prev) => ({
        ...prev,
        duration: Math.floor(audio.duration),
      }));
    };
  };

  const updateSong = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editSong.name);
    formData.append("coverImage", editSong.coverImage);
    formData.append("fileUrl", editSong.fileUrl);
    formData.append("artist", editSong.artist);
    formData.append("duration", editSong.duration);
    formData.append("description", editSong.description)
    console.log("for:",formData)
    try {
      const response =await Axios.put(`/admin/edit-song/${songId}`, formData, {
        withCredentials: true,
        
      });
      
      toast.success(response.data.message);
      navigate('/admin/all-songs')
    } catch (error) {
      console.error(error);
      toast.error("Error updating song");
    }finally {
      setIsLoading(false); // Hide loading animation
    }
  };



  return (
    <div className="flex h-screen bg-[#121212]">
      <SideNav />
      <div className="flex flex-grow flex-col">
        <TopNav />
        <main className="flex-grow p-6 overflow-y-auto no-scrollbar">
          {isLoading? <div className="flex justify-center items-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
          <p className="ml-2 text-sm text-gray-500">Updating...</p>
        </div>: <form className="flex flex-col text-white font-bold gap-8">
            <div className="flex  gap-8">
              <div className="flex flex-col gap-4">
                <p className="font-bold">Change Image</p>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setEditSong({ ...editSong, coverImage: e.target.files[0] })
                  }
                />
                <label htmlFor="image">
                  <img
                    src={coverPreview || "https://via.placeholder.com/150"}
                    alt="Cover"
                    className="w-32"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold">Change Song</p>
                <input
                  type="file"
                  accept="audio/*"
                  id="song"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setEditSong({ ...editSong, fileUrl: file });
                    calculateDuration(file);
                  }}
                />
                <label htmlFor="song">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg"
                    alt=""
                    className="w-32"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2.5`">
              <p>Song name</p>
              <input
                type="text"
                className="bg-transparent border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
                value={editSong.name}
                onChange={(e) =>
                  setEditSong({ ...editSong, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <p>Song Description</p>
              <input
                type="text"
                className="bg-transparent border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
                value={editSong.description}
                onChange={(e) =>
                  setEditSong({ ...editSong, description: e.target.value })
                }
              />
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap4">
                <p>Artist</p>
                <input
                  type="text"
                  className="bg-transparent border-2 border-gray-400 p-2"
                  value={editSong.artist}
                  onChange={(e) =>
                    setEditSong({ ...editSong, artist: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap4">
                <p>Duration</p>
                <input
                  type="text"
                  className="bg-transparent border-2 border-gray-400 p-2"
                  value={editSong.duration}
                  readOnly
                />
              </div>
            </div>
            <div className="flex gap-8">
              <button
                className="rounded-full bg-green-500 mt-10 w-36 h-10"
                onClick={updateSong}
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          </form>}
         
        </main>
      </div>
    </div>
  );
};

export default EditSong;

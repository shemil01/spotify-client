import React, { useState } from "react";
import SideNav from "../../adminComponent/SideNav";
import TopNav from "../../adminComponent/TopNav";
import { Axios } from "../../../../pages/mainPage/MainPage";
import toast from "react-hot-toast";
import { ClipLoader } from 'react-spinners';

const AddSong = () => {
  const [songs, setSongs] = useState([]);
  const [isUploading, setIsUploading] = useState(false); 
  const [uploadSong, setuploadSong] = useState({
    name: "",
    coverImage: null,
    fileUrl: null,
    artist: "",
    duration: 0,
    description: "",
  });

  const [songFile, setSongFile] = useState(null); // Store audio file

  const UploadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color="#36D7B7" loading={true} size={50} />
    </div>
  );
  
  const getDefaultImage = () => {
    return "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png";
  };

  // Function to automatically calculate the song duration
  const calculateDuration = (file) => {
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      setuploadSong((prev) => ({
        ...prev,
        duration: Math.floor(audio.duration), // Set duration in seconds
      }));
    };
  };

  const addSong = async () => {
    setIsUploading(true);
    const formData = new FormData();

    formData.append("name", uploadSong.name);
    formData.append("coverImage", uploadSong.coverImage || getDefaultImage());
    formData.append("fileUrl", uploadSong.fileUrl);
    formData.append("artist", uploadSong.artist);
    formData.append("duration", uploadSong.duration); // Already in seconds
    formData.append("description", uploadSong.description);

    try {
      const response = await Axios.post("/add-song", formData, {
        withCredentials: true,
      });
      console.log(response);
      toast.success(response.data.message);
      setIsUploading(false);
      setSongs([...songs, uploadSong]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding song");
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <TopNav />
        <main className="flex-grow p-6 overflow-y-auto no-scrollbar">
          <form className="flex flex-col gap-8">
            <div className="flex gap-8">
              <div className="flex flex-col gap-4">
                <p className="font-bold">Upload image</p>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setuploadSong({
                      ...uploadSong,
                      coverImage: e.target.files[0],
                    })
                  }
                />
                <label htmlFor="image">
                  <img
                    className="w-28 cursor-pointer"
                    src={
                      uploadSong.coverImage
                        ? URL.createObjectURL(uploadSong.coverImage)
                        : getDefaultImage()
                    }
                    alt="Song cover"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold">Upload song</p>
                <input
                  type="file"
                  id="song"
                  accept="audio/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setuploadSong({ ...uploadSong, fileUrl: file });
                    calculateDuration(file); // Calculate duration on song upload
                  }}
                />
                <label htmlFor="song">
                  <img
                    className="w-28 cursor-pointer"
                    src="https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg"
                    alt="Song file"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="font-bold">Song Name</p>
              <input
                type="text"
                className="bg-transparent w-[max(40vw,250px)] border-2 border-gray-400 p-2.5"
                placeholder="Type here"
                value={uploadSong.name}
                onChange={(e) =>
                  setuploadSong({ ...uploadSong, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="font-bold">Song Description</p>
              <input
                type="text"
                className="bg-transparent w-[max(40vw,250px)] border-2 border-gray-400 p-2.5"
                placeholder="Type here"
                value={uploadSong.description}
                onChange={(e) =>
                  setuploadSong({ ...uploadSong, description: e.target.value })
                }
              />
            </div>
            <div className="flex  gap-8">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  className="bg-transparent border-2 border-gray-400 p-2"
                  placeholder="Artist"
                  value={uploadSong.artist}
                  onChange={(e) =>
                    setuploadSong({ ...uploadSong, artist: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  className="bg-transparent border-2 border-gray-400 p-2"
                  placeholder="Duration"
                  value={uploadSong.duration}
                  readOnly // Duration will be set automatically from the audio file
                />
              </div>
            </div>
          </form>
          <button
            onClick={addSong}
            className="w-36 bg-green-500 mt-5 rounded-full h-10"
          >
            Save
          </button>
        </main>
      </div>
    </div>
  );
};

export default AddSong;

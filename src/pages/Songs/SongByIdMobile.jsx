import React, { useState, useRef, useEffect, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { LuShuffle } from "react-icons/lu";
import { FaCirclePlay } from "react-icons/fa6";
import { RiRepeatFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../mainPage/MainPage";
import { ClipLoader } from "react-spinners";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import myContext from "../../context/Context";

const SongByIdMobile = () => {
  const navigate = useNavigate();
  const { songId } = useParams();
  const { songs, setSongs } = useContext(myContext);

  const [loading, setLoading] = useState(true);
  const [song, setSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // Current playback time in seconds
  const [duration, setDuration] = useState(0); // Total duration in seconds
  const [progress, setProgress] = useState(0); // Progress in percentage
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // For handling seek bar dragging

  const audioRef = useRef(null);

  // Fetch song by ID
  useEffect(() => {
    Axios.get(`/song-by-id/${songId}`, { withCredentials: true })
      .then((response) => {
        setSong(response.data.songData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [songId]);

  // Update duration when metadata is loaded
  const handleLoadedMetadata = () => {
    const audioDuration = audioRef.current.duration;
    setDuration(audioDuration);
  };

  // Update the seek bar based on the current time of the audio
  const handleTimeUpdate = () => {
    if (!isDragging) { // Only update when not dragging
      const currentAudioTime = audioRef.current.currentTime;
      setCurrentTime(currentAudioTime);
      setProgress((currentAudioTime / duration) * 100);
    }
  };

  // Play/pause function
  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Start dragging the seek bar
  const startDragging = () => {
    setIsDragging(true);
  };

  // Dragging the seek bar (mouse move)
  const handleSeekbarChange = (e) => {
    if (isDragging) {
      const seekbarWidth = e.currentTarget.clientWidth;
      const clickX = e.nativeEvent.offsetX;
      const newTime = (clickX / seekbarWidth) * duration;
      setProgress((clickX / seekbarWidth) * 100);
      setCurrentTime(newTime);
    }
  };

  // Stop dragging and update playback position
  const stopDragging = (e) => {
    if (isDragging) {
      const seekbarWidth = e.currentTarget.clientWidth;
      const clickX = e.nativeEvent.offsetX;
      const newTime = (clickX / seekbarWidth) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setIsDragging(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <ClipLoader color={"#ffffff"} loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-orange-300 space-y-10">
      <header className="pt-10 text-white pl-5 flex justify-between pr-5 text-3xl">
        <div onClick={() => navigate(-1)}>
          <IoIosArrowDown />
        </div>
        <div>
          <BsThreeDots />
        </div>
      </header>

      <div className="pl-8 pr-5 space-y-5">
        <div>
          <img src={song?.coverImage} alt="" className="w-80 h-72" />
        </div>
        <div className="text-white font flex justify-between">
          <div>
            <h1 className="font-semibold text-2xl"> {song?.name}</h1>
            <p>{song?.artist}</p>
          </div>
          <audio
            ref={audioRef}
            src={song?.fileUrl}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          />
          <div className="text-3xl">
            <AiOutlineLike />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 max-w-[500px] w-full px-5 text-white">
          {/* Current Time */}
          <p className="text-xs">
            {new Date(currentTime * 1000).toISOString().substr(14, 5)}
          </p>

          {/* Seekbar */}
          <div
            className="relative w-full h-1 bg-gray-300 rounded-full cursor-pointer"
            onMouseDown={startDragging}
            onMouseMove={handleSeekbarChange}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            <div
              className="absolute top-0 left-0 h-full bg-green-800 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Duration */}
          <p className="text-xs">
            {new Date(duration * 1000).toISOString().substr(14, 5)}
          </p>
        </div>

        <div className="flex flex-row justify-between pl-5 pr-5 space-x-5 pt-5 text-white text-3xl">
          <span>
            <LuShuffle />
          </span>
          <span>
            <BiSkipPrevious />
          </span>
          <span onClick={playPause}>
            {isPlaying ? <MdOutlinePauseCircleFilled /> : <FaCirclePlay />}
          </span>
          <span>
            <BiSkipNext />
          </span>
          <span>
            <RiRepeatFill />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongByIdMobile;

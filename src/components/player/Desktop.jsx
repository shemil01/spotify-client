import { FaCirclePlay } from "react-icons/fa6";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { LuShuffle } from "react-icons/lu";
import { RiRepeatFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { LuMic2 } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { MdOpenInFull } from "react-icons/md";

const DesktopPlayer = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  currentSong,
  playPause,
  currentSongIndex,
  setCurrentSongIndex,
  songs,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDrag, setIsDrag] = useState();
  const [isDragging, setIsDragging] = useState(false); // For handling seek bar dragging

  const clickRef = useRef();

  useEffect(() => {
    if (audioRef) {
      const updateTime = () => {
        setCurrentTime(audioRef.currentTime);
        setProgress((audioRef.currentTime / audioRef.duration) * 100);
      };

      const updateDuration = () => {
        setDuration(audioRef.duration);
      };

      audioRef.addEventListener("timeupdate", updateTime);
      audioRef.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audioRef.removeEventListener("timeupdate", updateTime);
        audioRef.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audioRef]);

  const updatePlaybackPosition = (e) => {
    if (audioRef.current) {
      let width = clickRef.current.clientWidth;
      const offset = e.nativeEvent.offsetX;
      const divProgress = (offset / width) * 100;
      audioRef.current.currentTime = (divProgress / 100) * duration;
      setProgress(divProgress);
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
  

  const handlePlayPause = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (!currentSong && songs.length > 0) {
        setCurrentSongIndex(0);
        playPause(0);
      }
    }
  };

  const handleNext = () => {
    if (songs && songs.length > 0) {
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextSongIndex);
      playPause(nextSongIndex);
    }
  };

  const handlePrevious = () => {
    if (songs && songs.length > 0) {
      const prevSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
      setCurrentSongIndex(prevSongIndex);
      playPause(prevSongIndex);
    }
  };

  //convert seconds to minutes
  function SecondToMinutes(seconds) {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSecond = seconds % 60;
    return `${minutes}:${remainingSecond < 10 ? "0" : ""}${remainingSecond}`;
  }
  const songDuration = currentSong?.duration;
  const result = SecondToMinutes(songDuration);

  
  return (
    <div className="bg-black w-full fixed bottom-3 flex justify-between">
      <div className="m-2 md:w-2/12">
        {currentSong && (
          <div className="flex gap-2 text-white">
            <img src={currentSong.coverImage} alt="" className="w-10" />
            <span>{currentSong.name}</span>
          </div>
        )}
      </div>
      <div className="w-2/4">
        <div className="flex flex-col items-center justify-center h-full gap-1 m-auto">
          <div className="flex items-center gap-5">
            <span className="text-2xl text-gray-300 hover:text-white">
              <LuShuffle />
            </span>
            <span
              className="text-3xl text-gray-300 hover:text-white"
              onClick={handlePrevious}
            >
              <BiSkipPrevious />
            </span>
            <span
              className="text-3xl hover:scale-110 transition-transform duration-200 text-white"
              onClick={handlePlayPause}
            >
              {isPlaying ? <MdOutlinePauseCircleFilled /> : <FaCirclePlay />}
            </span>
            <span
              className="text-3xl text-gray-300 hover:text-white"
              onClick={handleNext}
            >
              <BiSkipNext />
            </span>
            <span className="text-2xl text-gray-300 hover:text-white">
              <RiRepeatFill />
            </span>
          </div>
          <div className="flex items-center gap-3 max-w-[500px] w-full px-5 text-white">
            <p className="text-xs">
              {new Date(currentTime * 1000).toISOString().substr(14, 5)}
            </p>
            <div
              
              className="relative w-full h-1 bg-gray-300 rounded-full cursor-pointer"
              onClick={updatePlaybackPosition}
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
            <p className="text-xs">{result}</p>
          </div>
        </div>
      </div>
      <div className="text-white  w-32">
        <div className="flex justify-around ">
          <button>
            <LuMic2 />
          </button>
          <button>
            <HiOutlineQueueList />
          </button>
          <button>
            <IoVolumeMuteSharp />
          </button>
          <button>
            <MdOpenInFull />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopPlayer;

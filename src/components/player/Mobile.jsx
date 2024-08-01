import { FaCirclePlay } from "react-icons/fa6";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { LuShuffle } from "react-icons/lu";
import { RiRepeatFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePauseCircleFilled } from "react-icons/md";

const MobilePlayer = ({
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

  const handleMouseDown = (e) => {
    setIsDrag(true);
    updatePlaybackPosition(e);
  };

  const handleMouseMove = (e) => {
    if (isDrag) {
      updatePlaybackPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDrag(false);
  };

  const handlePlayPause = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
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

  return (
    <div className="bg-black w-full fixed bottom-10 flex flex-col p-3">
      <div className="flex justify-between ">
        {currentSong && (
          <div className="flex items-center gap-2 text-white">
            <img
              src={currentSong.coverImage}
              alt=""
              className="w-10 h-10 object-cover"
            />
            <span>{currentSong.name}</span>
          </div>
        )}
        <span
          className="text-3xl hover:scale-110 transition-transform duration-200 text-white"
          onClick={handlePlayPause}
        >
          {isPlaying ? <MdOutlinePauseCircleFilled /> : <FaCirclePlay />}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center h-full gap-1 mt-2">
        <div className="flex items-center gap-3 w-full text-white">
          <div
            ref={clickRef}
            className="relative w-full h-1 bg-[#4D4D4D] rounded-full cursor-pointer"
            onClick={updatePlaybackPosition}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              className="absolute top-0 left-0 h-full bg-gray-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;

import { FaCirclePlay } from "react-icons/fa6";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { LuShuffle } from "react-icons/lu";
import { RiRepeatFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { MdOutlinePauseCircleFilled } from "react-icons/md";

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  currentSong,
  playPause,
  currentSongIndex,
  setCurrentSongIndex,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef) {
      audioRef.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.currentTime);
      });
      audioRef.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.duration);
      });
    }
  }, [audioRef]);

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
    if (currentSong && currentSong.length > 0) {
      const nextSongIndex = (currentSongIndex + 1) % currentSong.length;
      setCurrentSongIndex(nextSongIndex);
      playPause(nextSongIndex);
    }
  };

  const handlePrevious = () => {
    if (currentSong && currentSong.length > 0) {
      const prevSongIndex = (currentSongIndex - 1 + currentSong.length) % currentSong.length;
      setCurrentSongIndex(prevSongIndex);
      playPause(prevSongIndex);
    }
  };

  const handleSeek = (e) => {
    if (audioRef) {
      const seekTime = (e.target.value / 100) * duration;
      audioRef.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className="bg-black w-full fixed bottom-3 flex flex-col items-center gap-1 m-auto">
      <div className="flex items-center gap-5">
        <span className="text-2xl text-gray-300 hover:text-white">
          <LuShuffle />
        </span>
        <span className="text-3xl text-gray-300 hover:text-white " onClick={handlePrevious}>
          <BiSkipPrevious />
        </span>
        <span className="text-3xl hover:scale-110 transition-transform duration-200 text-white" onClick={handlePlayPause}>
          {isPlaying ? <MdOutlinePauseCircleFilled /> : <FaCirclePlay />}
        </span>
        <span className="text-3xl text-gray-300 hover:text-white" onClick={handleNext}>
          <BiSkipNext />
        </span>
        <span className="text-2xl text-gray-300 hover:text-white">
          <RiRepeatFill />
        </span>
      </div>
      <div className="flex items-center gap-3 max-w-[500px] w-full px-5 text-white">
        <p className="text-xs">{new Date(currentTime * 1000).toISOString().substr(14, 5)}</p>
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-300 rounded-full cursor-pointer"
        />
        <p className="text-xs">{new Date(duration * 1000).toISOString().substr(14, 5)}</p>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75"></div>
    </div>
  );
};

export default Player;

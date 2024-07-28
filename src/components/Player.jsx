import { FaCirclePlay } from "react-icons/fa6";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { LuShuffle } from "react-icons/lu";
import { RiRepeatFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
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
  const [progress, setProgress] = useState(0);

  const clickRef = useRef();
  useEffect(() => {
    console.log(currentSong);
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
  }, []);

  const checWkidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = (offset / width) * 100;
    audioRef.current.currentTime = (divProgress / 100) * currentSong.length;
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
    if (currentSong && currentSong.length > 0) {
      const nextSongIndex = (currentSongIndex + 1) % currentSong.length;
      setCurrentSongIndex(nextSongIndex);
      playPause(nextSongIndex);
    }
  };

  // const handlePrevious = () => {
  //   if (currentSong && currentSong.length > 0) {
  //     const prevSongIndex = (currentSongIndex - 1 + currentSong.length) % currentSong.length;
  //     setCurrentSongIndex(prevSongIndex);
  //     playPause(prevSongIndex);
  //   }
  // };

  const handlePrevious = () => {
    const index = currentSong.findIndex((x) => x.name === currentSong.name);
    if (index === 0) {
      setCurrentSongIndex(currentSong[currentSong.length - 1]);
    } else {
      setCurrentSongIndex(currentSong[index - 1]);
    }
  };

  return (
    <div className="bg-black md:w-full fixed bottom-3  flex justify-between ">
      <div className="m-2 w-2/12">
        {currentSong && (
          <div className="flex gap-2 text-white">
            <img src={currentSong.coverImage} alt="" className="w-10 " />
            <span>{currentSong.name}</span>
          </div>
        )}
      </div>
      <div className="w-2/4 ">
        <div className=" flex flex-col  items-center justify-center h-full gap-1 m-auto">
          <div className="flex items-center gap-5">
            <span className="text-2xl text-gray-300 hover:text-white">
              <LuShuffle />
            </span>
            <span
              className="text-3xl text-gray-300 hover:text-white "
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
              ref={clickRef}
              className="relative w-full h-1 bg-gray-300 rounded-full cursor-pointer"
              onClick={checWkidth}
            >
              <div
                className="absolute top-0 left-0 h-full bg-green-800 rounded-full "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs">
              {new Date(duration * 1000).toISOString().substr(14, 5)}
            </p>
          </div>
        </div>
      </div>
      <div className="text-white">sound</div>
    </div>
  );
};

export default Player;

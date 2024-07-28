import React, { useContext, useRef, useState } from "react";
import myContext from "../../context/Context";
import { Link } from "react-router-dom";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import NavBar from "../../components/nav/NavBar";
import ToggleMenu from "../../components/Toggle/ToggleMenu";

const Music = () => {
  const { songs } = useContext(myContext);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef()

  const playPause = ()=>{
    if(isPlaying){
        playRef.current.pause()
    }else{
        playRef.current.play()
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="bg-black w-full h-screen flex space-y-3">
        <NavBar />
        
        <div className="bg-gradient-to-b from-emerald-900 to-stone-900 flex-1 h-[85%] rounded-md overflow-y-auto no-scrollbar">
      <div className="m-5">
        <h1>Popular songs</h1>
      </div>
      </div>
    </div>
  );
};

export default Music;

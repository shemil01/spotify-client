import React from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "../../components/nav/NavBar";
import {  IoIosMore } from "react-icons/io";
import { useParams } from "react-router-dom";
import { Axios } from "../mainPage/MainPage";
const CreatePlaylist = () => {
    const { songId } = useParams();
  const mobileView = useMediaQuery({ query: "(max-width: 1000px)" });
  const createPlaylist = ()=>{
    Axios.post(`/create-playlist/${songId}`)
    .then((response)=>{
      console.log(response.data)
    })
  }
  
  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      {!mobileView && <NavBar />}
      <div className="bg-gradient-to-b from-emerald-900 to-stone-900 flex-1 h-[85%] rounded-md">
       
        <div className="w-full h-[calc(96%-6rem)] overflow-y-auto no-scrollbar">
          <div className="mt-10 flex gap-2 flex-col md:flex-row md:items-end sm:items-center">
            <img
              src=""
              alt=""
              className="w-48 rounded m-2 flex"
            />
            <div className="flex flex-col gap-y-5 text-white">
              <p>Playlist</p>
              <h1 className="font-extrabold text-6xl"></h1>
              <p className="hover:underline">artist</p>
             
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

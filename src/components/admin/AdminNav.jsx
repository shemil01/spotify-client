import React from "react";
import { AiFillSpotify } from "react-icons/ai";
import { GrSearch } from "react-icons/gr";
import { GoHomeFill } from "react-icons/go";

const AdminNav = () => {
  return (
    <div className="bg-black w-80 h-screen">
      <div className="text-white py-5 px-5 ">
        <div>
         
          <AiFillSpotify color="white" size="3em" />
        </div>
        <div className="space-y-10 py-5 font-bold">
          <div className="flex flex-wrap gap-x-5">
            <span>home</span>
          </div>
          <div>
            <span>Songs</span>
          </div>
          <div>
            <span>Playlist</span>
          </div>
          <div
            className="flex flex-wrap gap-x-5">
           
           
            <span>Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;

import React from "react";
import { Link } from "react-router-dom";
import {  MdOutlineIosShare,MdOutlineFavorite } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { RiUserSharedFill } from "react-icons/ri";


const Menu = ({ isMenuOpen, onToggleSubMenu }) => {
  return (
    isMenuOpen && (
      <div className="bg-[#292828] rounded-md absolute right">
        <div className="h-full mx-2 font-semibold text-sm">
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <IoAdd className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white "> Add to Your Library</span>
            </div>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <IoAdd className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white " onClick={onToggleSubMenu}>
                {" "}
                Add to Playlist
              </span>
            </div>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <RiUserSharedFill className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white "> Go to Artist</span>
            </div>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <MdOutlineFavorite className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white "> Add to Favourite</span>
            </div>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <MdOutlineIosShare className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white "> Share</span>
            </div>
          </Link>
        </div>
      </div>
    )
  );
};

export default Menu;

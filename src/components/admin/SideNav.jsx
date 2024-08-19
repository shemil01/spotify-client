import React from "react";
import { AiFillSpotify } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosMusicalNotes, IoMdAnalytics } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-64 h-screen  bg-black p-4">
      <h2 className="text-[#1DB954] text-2xl font-bold mb-6">
        Admin Dashboard
      </h2>
      <div className="py-2 px-4">
        <AiFillSpotify color="white" size="3em" />
      </div>
      <ul>
        <li>
          <Link
            to={"/admin/all-users"}
            className="flex items-center py-2 px-4 rounded-md hover:bg-[#b3b3b3]"
          >
            <FiUsers className="mr-2" />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to={'/admin/all-songs'} className="flex items-center py-2 px-4 rounded-md hover:bg-[#b3b3b3]">
            {" "}
            <IoIosMusicalNotes className="mr-2" />
            <span>Songs</span>
          </Link>
        </li>
        <li>
          <Link className="flex items-center py-2 px-4 rounded-md hover:bg-[#b3b3b3]">
            {" "}
            <BiSolidPlaylist className="mr-2" />
            <span>Playlists</span>
          </Link>
        </li>
        <li>
          <Link className="flex items-center py-2 px-4 rounded-md hover:bg-[#b3b3b3]">
            {" "}
            <IoMdAnalytics className="mr-2" />
            <span>Analytics</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;

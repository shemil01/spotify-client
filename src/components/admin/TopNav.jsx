
import React from 'react';
import { IoIosNotifications ,IoIosSettings } from "react-icons/io";


const TopNav = () => {
  return (
    <div className="bg-black p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center">
        <a href="#" className="mr-4"><IoIosNotifications /></a>
        <a href="#" className="mr-4"><IoIosSettings /></a>
        <a href="#" className="bg-[#1DB954] text-white py-2 px-4 rounded-md hover:bg-green-600">Logout</a>
      </div>
    </div>
  );
};

export default TopNav;

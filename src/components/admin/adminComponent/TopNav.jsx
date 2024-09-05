import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { IoIosNotifications, IoIosSettings } from "react-icons/io";
import myContext from "../../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import Toggle from "./Toggle";

const TopNav = () => {
  const { setAdminLog } = useContext(myContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    Cookies.remove("adminToken");
    localStorage.removeItem("adminToken");
    setAdminLog(false);
    navigate("admin/login");
  };
  return (
    <div className="bg-black p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center">
        <span className="mr-4 text-2xl" onClick={toggleMenu}>
          <IoIosAdd />
        </span>
        <Toggle toggleMenu={toggleMenu} isOpen={isOpen} />
        <span className="mr-4">
          <IoIosNotifications />
        </span>
        <span className="mr-4">
          <IoIosSettings />
        </span>
        <Link
          onClick={logout}
          className="bg-[#1DB954] text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default TopNav;

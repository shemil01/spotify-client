import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { FaSpotify,FaArrowRight } from "react-icons/fa";
import { MdArrowForwardIos, MdOutlineEdit, MdRefresh } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { AiTwotoneAppstore } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ImEye } from "react-icons/im";
import { TbPasswordMobilePhone } from "react-icons/tb";
import Nav from "./Nav";


const Profail = () => {
 

  return (
    <div className="pb-10 w-full bg-[#131313]">
     <Nav />

      <div className="md:w-1/2 mx-auto">
        <div className="bg-[#292828] h-72   rounded-md flex px-4 py-4 flex-col mx-auto ">
          <h1 className="text-2xl font-bold mb-4 text-white ">Account</h1>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <FaSpotify className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white ">Manage your subscription</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <MdOutlineEdit className="mr-3 text-[#a7a7a7] mt-1" />
              <Link to={'/edit-profail'}><span className="text-white">Edit Profail</span></Link>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <MdRefresh className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white">Recover Playlists</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <GoHome className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white">Address</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
        </div>

        <div className="bg-[#292828]  rounded-md flex px-4 py-4 flex-col mx-auto mt-6">
          <h1 className="text-2xl font-bold mb-4 text-white ">
            Security and privacy
          </h1>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <AiTwotoneAppstore className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white">Manage Apps</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <IoIosNotificationsOutline className="mr-3 text-[#a7a7a7] mt-2" />
              <span className="text-white">notification Settings</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <ImEye className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white">Privacy sttings</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <FaSpotify className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white">Edit login method</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <TbPasswordMobilePhone className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white">Set divice Password</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <FaArrowRight className="mr-3 text-[#a7a7a7] mt-1" />
              <span className="text-white">Sign out everywhere</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profail;

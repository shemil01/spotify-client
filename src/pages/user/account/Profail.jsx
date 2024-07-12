import React, { useState, useEffect } from "react";
import { Axios } from "../../mainPage/MainPage";
import { RiAccountCircleFill, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaSpotify,FaArrowRight } from "react-icons/fa";
import { MdArrowForwardIos, MdOutlineEdit, MdRefresh } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { AiTwotoneAppstore } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ImEye } from "react-icons/im";
import { TbPasswordMobilePhone } from "react-icons/tb";

const Profail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    Axios.get("/user/view-profail", {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="pb-10 w-full bg-[#131313]">
      <header className="h-32 w-full flex md:justify-around justify-between items-center px-8">
        <div className="flex items-center mt-4">
          <img
            className="w-24 md:w-32 lg:w-40"
            src="https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg"
            alt="Spotify Logo"
          />
        </div>
        <div className="flex items-center">
          <button
            className="text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <RiCloseLine className="text-4xl" />
            ) : (
              <RiMenu3Line className="text-4xl" />
            )}
          </button>
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center w-full md:w-auto`}
          >
            <div className="flex flex-col md:flex-row justify-around text-white font-bold w-full max-w-md">
              <button className="mx-2 hover:text-logoColor">
                <span>Premium</span>
              </button>
              <button className="mx-2 hover:text-logoColor">
                <span>Support</span>
              </button>
              <div className="flex items-center space-x-2 group hover:text-logoColor">
                <button className="mx-2">
                  <span className="text-4xl">
                    <RiAccountCircleFill />
                  </span>
                </button>
                <button className="mx-2">
                  <span>Profail</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="md:w-1/2 mx-auto">
        <div className="bg-[#292828] h-72   rounded-md flex px-4 py-4 flex-col mx-auto ">
          <h1 className="text-2xl font-bold mb-4 text-white ">Account</h1>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <FaSpotify className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">Manage your subscription</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <MdOutlineEdit className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">Edit Profail</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <MdRefresh className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">Recover Playlists</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <GoHome className="mr-3 text-[#a7a7a7]" />
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
              <AiTwotoneAppstore className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">Manage Apps</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <IoIosNotificationsOutline className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">notification Settings</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <ImEye className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">Privacy sttings</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <FaSpotify className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">Edit login method</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <TbPasswordMobilePhone className="mr-3 text-[#a7a7a7]" />
              <span className="text-white">Set divice Password</span>
            </div>
            <span className="text-[#a7a7a7]">
              {" "}
              <MdArrowForwardIos />
            </span>
          </Link>{" "}
          <Link className="flex  justify-between py-3 hover:bg-[#383838] rounded-md">
            <div className="flex justify-between ">
              <FaArrowRight className="mr-3 text-[#a7a7a7]" />
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

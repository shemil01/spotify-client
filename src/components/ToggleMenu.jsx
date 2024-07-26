import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const ToggleMenu = ({ isMenuOpen, setIsMenuOpen, navigate, userData }) => {
  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //dp setting

  // const firstLetter = userData.username
  //   ? userData.username.charAt(0).toUpperCase()
  //   : userData.email.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between py-3 px-3">
      <div className="flex space-x-4">
        <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-200">
          <button
            className="text-[#a7a7a7] text-1xl"
            onClick={() => navigate(-1)}
          >
            <MdArrowBackIos />
          </button>
        </div>
        <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-200">
          <button
            className="text-[#a7a7a7] text-1xl"
            onClick={() => navigate(1)}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
      <div>
        <button className="text-white text-3xl" onClick={onToggleMenu}>
          {userData.profilePicture ? (
            <img
              className="w-8 h-8 rounded-full"
              src={userData.profilePicture}
              alt=""
            />
          ) : (
            <RiAccountCircleFill />
          )}
        </button>
      </div>
    </header>
  );
};

export default ToggleMenu;

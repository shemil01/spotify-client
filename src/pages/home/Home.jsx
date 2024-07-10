import React, { useContext } from "react";
import NavBar from "./NavBar";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import myContext from "../../context/Context";

const Home = () => {
  const { userData } = useContext(myContext);
  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      <NavBar />
      <div className="bg-[#121212] flex-1 h-[85%] rounded-md">
        <header className="flex items-center justify-between py-3 px-3">
          <div className="flex space-x-4">
            <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
              <button className="text-[#a7a7a7] text-1xl">
                <MdArrowBackIos />
              </button>
            </div>
            <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
              <button className="text-[#a7a7a7] text-1xl">
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
          <div>
            <button className="text-white text-3xl">
              <img
                className="w-8 h-8 rounded-full"
                src={userData.profilePicture}
                alt=""
              />
            </button>
          </div>
        </header>
        <div className="flex ">
          <div className="flex flex-wrap space-x-7 py-3 px-4">
            <div className="bg-white rounded-full w-10 h-8 flex items-center justify-center">
              <span className="text-black ">All</span>
            </div>
            <div className="bg-[#292828] h-8 w-16 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">Music</span>
            </div>
            <div className="bg-[#292828] h-8 w-20 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">Podcast</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

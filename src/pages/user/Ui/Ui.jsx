import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";



const Ui = () => {

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://helios-i.mashable.com/imagery/articles/04Xg9z0OpmENu16hFQ4XGcs/hero-image.fill.size_1248x702.v1652732411.png')",
          filter: "blur(8px)",
        }}
      ></div>

      <div className="relative z-10 bg-black shadow-lg w-11/12 md:w-8/12 lg:w-[500px] h-auto md:h-[400px] rounded-lg flex flex-col justify-between items-center p-4 md:p-6">
        
        <div className="flex flex-col items-center mt-4">
          <img
            className="w-24 md:w-32 lg:w-40"
            src="https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg"
            alt="Spotify Logo"
          />
          <div className="flex flex-col items-center mt-2 md:mt-4 text-center">
            <span className="text-white text-lg md:text-2xl lg:text-3xl font-bold">
              Millions of songs.
            </span>
            <span className="text-white text-lg md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
              Free on Spotify.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <button className="flex justify-center items-center font-semibold bg-logoColor w-28 md:w-32 h-10 md:h-12 rounded-full text-black text-sm md:text-base">
            Login  <FaArrowUpRightFromSquare className="ml-2" />
          </button>

         
          <div className="mt-4 flex flex-col md:flex-row items-center">
            <span className="text-white text-sm md:text-base">New to Spotify?</span>
            <span className="font-bold text-white ml-0 md:ml-1 mt-1 md:mt-0 flex items-center text-sm md:text-base">
             Sign up free <FaArrowUpRightFromSquare className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ui;

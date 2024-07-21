import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";




const Ui = () => {

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1623018035813-9cfb5b502e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAzMzh8MHwxfHNlYXJjaHw2fHxzcG90aWZ5fGVufDB8fHx8MTY2MDg2MzkwNw&ixlib=rb-1.2.1&q=80&w=1080')",
          filter: "blur(8px)",
          // opacity:"50%"
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
          <Link to={"/login"} className="hover:underline"> Login</Link> <FaArrowUpRightFromSquare className="ml-2" />
          </button>

         
          <div className="mt-4 flex flex-col md:flex-row items-center">
            <span className="text-white text-sm md:text-base">New to Spotify?</span>
            <span className="font-bold text-white ml-0 md:ml-1 mt-1 md:mt-0 flex items-center text-sm md:text-base">
            <Link  to={'/register'} className="text-white hover:underline" >Sign up free</Link> <FaArrowUpRightFromSquare className="ml-1 " />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ui;

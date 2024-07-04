import React from "react";
import { AiFillSpotify } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

const Login = () => {
  return (
    <div className="w-full bg-[#292929]  flex justify-center overflow-y-scroll no-scrollbar">
      <div className="relative bg-[#121212] shadow-lg w-full md:w-8/12 lg:w-[730px] rounded-lg flex md:mt-8 flex-col space-y-5 p-4 h-full">
        <div className="flex flex-col items-center mt-10 md:mt-4">
          <AiFillSpotify color="white" size="3em" />
          <div className="flex flex-col items-center mt-6 md:mt-4">
            <span className="text-white font-bold text-3xl mb-4 md:mb-6">
              Log in to Spotify
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 md:mt-4 space-y-2">
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80">
            <FcGoogle />
            <button className="text-white font-semibold px-5">
              Continue With Google
            </button>
          </div>
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80">
          <FaFacebook className="text-xl text-blue-600" />
            <button className="text-white font-semibold px-5">
              Continue With Facebook
            </button>
          </div>
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80">
            <FaApple className="text-xl text-white" />
            <button className="text-white font-semibold px-5">
              Continue With Apple
            </button>
          </div>
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80">
            <button className="text-white font-semibold px-5">
              Continue With Mobile
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <hr className="w-2/3 opacity-35" />
        </div>
        
        <div>
          <span className="text-white flex justify-center font-semibold">
            Email or username
          </span>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Email or username"
            className="rounded-md px-8 py-3 w-80 font-semibold border-solid border-2 border-[#727272] bg-[#121212]"
          />
        </div>
        <div>
          <span className="text-white flex justify-center font-semibold">
            Password
          </span>
        </div>
        <div className="flex justify-center">
          <input
            type="password"
            placeholder="Password"
            className="rounded-md px-8 py-3 w-80 font-semibold border-solid border-2 border-[#727272] bg-[#121212]"
          />
        </div>
        <div className="flex justify-center">
          <button className="text-black font-semibold rounded-full bg-logoColor  space-x-3 px-8 py-3 w-80">
            Login
          </button>
        </div>
        <div className="text-white font-semibold flex justify-center">
          Forgot Your password
        </div>

        <div className="flex justify-center">
          <hr className="w-2/3 opacity-35" />
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-center">
          <span className="text-white text-sm md:text-base">
            Don't have an account?
          </span>
          <span className="font-bold text-white ml-0 md:ml-1 mt-1 md:mt-0 flex items-center text-sm md:text-base">
            Sign up Spotify.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

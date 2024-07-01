import React from "react";
import { AiFillSpotify } from "react-icons/ai";

const Login = () => {
  return (
    <div className="w-full bg-[#292929] h-screen flex justify-center">
      <div className="bg-[#121212] shadow-lg w-full md:w-8/12 lg:w-[730px] h-screen md:h-[400px] rounded-lg flex justify-center  md:mt-8">
        <div>
          <AiFillSpotify color="white" size="3em" />
          <div>
            <span className="text-white font-bold">Log in to Spotify</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

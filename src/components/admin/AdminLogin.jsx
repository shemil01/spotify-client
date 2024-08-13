import React from "react";
import { AiFillSpotify } from "react-icons/ai";

const AdminLogin = () => {
  return (
    <div className="w-full bg-[#121212] h-screen flex justify-center overflow-y-scroll no-scrollbar">
      <div className="relative bg-[#121212] shadow-lg w-full md:w-8/12 lg:w-[730px] flex md:mt-8 flex-col space-y-5 p-4 h-full">
        <div className="flex items-center flex-col">
          <AiFillSpotify color="white" size="3em" />
          <div className="">
            <span className="text-white font-bold text-3xl">
              Login to spotify Admin
            </span>

            <div className="mt-10 space-y-10">
              <div className="py-5">
                <span className="text-white flex font-semibold">Email</span>
                <input
                  type="text"
                  className="w-80 py-2 bg-[#121212] border-solid border-2 border-[#727272] rounded"
                />
              </div>
              <div>
                <span className="text-white flex  font-semibold">Password</span>
                <input
                  type="text"
                  className="w-80 py-2 bg-[#121212] border-solid border-2 border-[#727272] rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

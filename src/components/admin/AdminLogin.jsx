import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillSpotify } from "react-icons/ai";
import { Axios } from "../../pages/mainPage/MainPage";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!admin.email || !admin.password) {
      return toast.error("Enter email and password");
    }
    Axios.post("/admin-login", admin, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full bg-[#121212] h-screen flex justify-center overflow-y-scroll no-scrollbar">
      <div className="relative bg-[#121212] shadow-lg w-full md:w-8/12 lg:w-[730px] flex md:mt-8 flex-col space-y-5 p-4 h-full">
        <div className="flex items-center flex-col">
          <AiFillSpotify color="white" size="3em" />
          <div>
            <span className="text-white font-bold text-3xl">
              Login to spotify Admin
            </span>

            <div className="mt-10">
              <div>
                <span className="text-white flex font-semibold py-3">
                  Email
                </span>
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={admin.email}
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                  className="rounded-md text-white px-8 py-3 w-80  font-semibold border-solid border-2 border-[#727272] bg-[#121212] hover:border-white transition duration-300"
                />
              </div>
              <div>
                <span className="text-white flex py-3 font-semibold">
                  Password
                </span>
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Enter your Password"
                  value={admin.password}
                  onChange={(e) =>
                    setAdmin({ ...admin, password: e.target.value })
                  }
                  className="w-80 py-3 px-8 bg-[#121212] border-solid border-2 border-[#727272] rounded-md  hover:border-white"
                />
              </div>
              <div className="flex justify-center items-center bg-green-500 rounded-full py-3 hover:bg-green-700 text-white mt-10">
                <button onClick={handleSubmit}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useContext, useState } from "react";
import { AiFillSpotify } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import myContext from "../../context/Context";

const Emailstep = ({ onNext }) => {
  const { signup, setSignup } = useContext(myContext);
  const [formError, setFormError] = useState({});
  
  const handleEmailChange = (e) => {
    setSignup({ ...signup, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (signup.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!regex.test(signup.email)) {
      errors.email = "Invalid email format";
    }

    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      onNext();
      
    }
  };

  return (
    <div className="w-full bg-[#121212] flex justify-center overflow-y-scroll no-scrollbar">
      <div className="relative bg-[#121212] shadow-lg w-full md:w-8/12 lg:w-[730px] flex md:mt-8 flex-col space-y-5 p-4 h-full">
        <div className="flex flex-col items-center mt-10 md:mt-4">
          <AiFillSpotify color="white" size="3em" />
          <div className="flex flex-col items-center mt-2 md:mt-4 text-center">
            <span className="text-white text-lg md:text-2xl lg:text-5xl font-bold">
              Sign up to start
            </span>
            <span className="text-white text-lg md:text-2xl lg:text-5xl font-bold mt-1 md:mt-2">
              listening
            </span>
          </div>
          <div>
            <div>
              <span className="text-white flex font-semibold py-4">
                Email address
              </span>
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="name@domain.com"
                value={signup.email}
                onChange={handleEmailChange}
                className="rounded-md px-8 py-3 w-72 md:w-80 font-semibold text-white border-solid border-2 border-[#727272] bg-[#121212]"
              />
            </div>
            {formError.email && (
              <div className="text-red-500 text-sm mt-1">{formError.email}</div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="text-black font-semibold rounded-full bg-logoColor space-x-3 px-8 py-3 w-80"
          >
            Next
          </button>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <hr className="w-40 opacity-35" />
          <span className="text-white font-semibold">or</span>
          <hr className="w-40 opacity-35" />
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
        <div className="mt-4 flex flex-col md:flex-row items-center justify-center">
          <span className="text-white text-sm md:text-base">
            Already have an account?
          </span>
          <span className="font-bold text-white ml-0 md:ml-1 mt-1 md:mt-0 flex items-center text-sm md:text-base">
            <Link to={'/login'}>Log in here.</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Emailstep;

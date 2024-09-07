import React, { useContext, useState } from "react";
import { AiFillSpotify } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/Context";
import { Axios } from "../mainPage/MainPage";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

const Emailstep = ({ onNext }) => {
const navigate = useNavigate()

  const { signup, setSignup, setUserData, setLog } = useContext(myContext);
  const [formError, setFormError] = useState({});
  const [isExist, setIsExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailCheck = async () => {
    await Axios.post("/user/email-check", signup)
      .then((response) => {
        setIsExist(response.data.success);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
        setIsExist(error.response.data.success);
      });
  };

  const handleEmailChange = (e) => {
    setSignup({ ...signup, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailCheck();
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (signup.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!regex.test(signup.email)) {
      errors.email = "Invalid email format";
    }
    
    setFormError(errors);
    
    if (Object.keys(errors).length === 0 && isExist !== false) {
      onNext();
      setLoading(true);
    }
  };

  // Google OAuth
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await Axios.post("/google-login", {
          access_token: tokenResponse.access_token,
        });
        const { token, userData } = response.data;
        Cookies.set("token", token);
        localStorage.setItem("token", token);
        const userInfo = JSON.stringify(userData);
        localStorage.setItem("userInfo", userInfo);
        navigate("/home");
        setLog(true);
        setUserData(userInfo);
      } catch (error) {
        console.error(error);
      }
    },
  });

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
                className="rounded-md px-8 py-3 w-72 md:w-80 font-semibold text-white border-solid border-2 border-[#727272] bg-[#121212] hover:border-green-500 transition duration-300"
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
            className="text-black font-semibold rounded-full bg-logoColor space-x-3 px-8 py-3 w-80 transform transition-transform duration-200 hover:scale-105"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Next"
            )}
          </button>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <hr className="w-40 opacity-35" />
          <span className="text-white font-semibold">or</span>
          <hr className="w-40 opacity-35" />
        </div>
        <div className="flex flex-col items-center mt-6 md:mt-4 space-y-2">
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80 hover:border-white transition duration-300">
            <FcGoogle />
            <button className="text-white font-semibold px-5" onClick={()=>googleLogin()}>
              Continue With Google
            </button>
          </div>
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80 hover:border-white transition duration-300">
            <FaFacebook className="text-xl text-blue-600" />
            <button className="text-white font-semibold px-5">
              Continue With fb
            </button>
          </div>
       
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80 hover:border-white transition duration-300">
            <FaApple className="text-xl text-white" />
            <button className="text-white font-semibold px-5">
              Continue With Apple
            </button>
          </div>
          <div className="rounded-full border-solid border-2 border-[#727272] flex flex-row items-center space-x-3 px-8 py-3 w-80 hover:border-white transition duration-300">
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
            <Link to={"/login"} className="hover:underline">
              Log in here.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Emailstep;

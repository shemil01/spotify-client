import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../mainPage/MainPage";
import toast from "react-hot-toast";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

function PasswordReset() {
  const [input, setInput] = useState({
    password: "",
    confirmPass: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [loading,setLoading] = useState(false)
  

  //show and hide
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
const passwordVisible =()=>{
    setShowConPassword((prevShowPassword)=> !prevShowPassword)
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    const regex = /^(?=.*[A-Za-z])(?=.*[\d#?!&])[A-Za-z\d#?!&]{10,11}$/;

    if (input.password.trim() === "") {
      errors.password = "Password is required";
    } else if (!regex.test(input.password)) {
      errors.password = "1 number or special character (example: # ? ! &)";
    }

    if (input.confirmPass.trim() === "") {
      errors.confirmPass = "Confirm password is required";
    } else if (input.confirmPass !== input.password) {
      errors.confirmPass = "Passwords do not match";
    }

    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true)
      try {
        const response = await Axios.post(`/reset/${token}`, input);
        navigate("/home");
        toast.success("Password has been reset");
        setMessage(response.data);
        setLoading(false)
      } catch (error) {
        setMessage("Error resetting password");
      }
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen w-full">
      <div>
        <header>
          <img
            className="w-32 md:w-32 lg:w-40"
            src="https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg"
            alt="Spotify Logo"
          />
        </header>
      </div>
      <div className="flex flex-col  w-80 mx-auto">
        <div className="py-3 flex justify-start">
          <h1 className="text-white font-bold text-3xl text-left">
            Reset your password
          </h1>
        </div>
        <div>
          <p className="text-white">Please enter your new password below.</p>
        </div>
        <div className="w-80 md:w-80">
          <span className="text-white text-left font-semibold py-4 block">
            New Password
          </span>
          <p className="text-red-600">{formError.password}</p>
          <div className="flex justify-around  border-solid border-2 border-[#727272] rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              required
              className=" text-white px-3 py-3  font-semibold outline-none  bg-[#121212]"
            />
            <button
              className="text-[#a7a7a7] text-3xl"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            </button>
          </div>
        </div>
        <div>
          <div>
            <h3 className="text-white font-semibold py-3">
              Your password must contain at least
            </h3>
          </div>
          <div>
            <ul className="text-white">
              <li>10-11 characters</li>
              <li>1 letter</li>
              <li>1 number or special character (example: # ? ! &)</li>
            </ul>
          </div>
          <div className="w-80 md:w-80">
            <span className="text-white text-left font-semibold py-4 block">
              Confirm new password
            </span>
            <p className="text-red-600">{formError.confirmPass}</p>
            <div className="flex justify-around border-solid border-2 border-[#727272] rounded-md">
              <input
                type={showConPassword ? "text" : "password"}
                name="confirmPass"
                onChange={handleChange}
                required
                className=" text-white px-3 py-3  font-semibold  bg-[#121212] outline-none"
              />
              <button
                className="text-[#a7a7a7] text-3xl"
                onClick={passwordVisible}
              >
                {showConPassword ? <BiSolidHide /> : <BiSolidShow />}{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center  py-8">
          <button
            onClick={handleSubmit}
            className="text-black font-semibold rounded-full bg-logoColor space-x-3 px-8 py-3 w-80 md:w-80 flex justify-center items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              " Change password"
            )}
           
          </button>
        </div>
        {message && <p className="text-white">{message}</p>}
      </div>
    </div>
  );
}

export default PasswordReset;

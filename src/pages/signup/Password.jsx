import React, { useContext, useState } from "react";
import myContext from "../../context/Context";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { AiFillSpotify } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";

const PasswordStep = ({ onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, setSignup } = useContext(myContext);
  const [formError, setFormError] = useState({});

  const handlePasswordChange = (e) => {
    setSignup({ ...signup, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    const regex = /^(?=.*[A-Za-z])(?=.*[\d#?!&])[A-Za-z\d#?!&]{10,11}$/;

    if (signup.password.trim() === "") {
      errors.password = "Password is required";
    } else if (!regex.test(signup.password)) {
      errors.password = "Password must include 1 number or special character (example: # ? ! &)";
    }

    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      onNext();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-[#121212] min-h-screen w-full flex flex-col items-center justify-center">
      <header className="mb-6">
        <AiFillSpotify color="white" size="3em" />
      </header>
      <div className="flex flex-col w-80 md:w-80 mx-auto space-y-4">
      <div className="flex space-x-3">
          <button className="text-[#a7a7a7] text-2xl hover:text-white transition duration-300">
            <GrPrevious />
          </button>
          <div className="flex flex-col">
            <span className="text-[#a7a7a7]">Step 1 of 2</span>
            <span className="text-white font-semibold">
              Tell us about yourself
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="text-white text-left font-semibold block mb-2">
             Password
            </label>
            <p className="text-red-600">{formError.password}</p>
            <div className="flex items-center border border-[#727272] px-1 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signup.password}
                onChange={handlePasswordChange}
                required
                className="flex-grow text-white px-3 py-3 font-semibold outline-none bg-[#121212]"
              />
              <button
                type="button"
                className="text-[#a7a7a7] text-3xl px-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold py-3">
              Your password must contain at least
            </h3>
            <ul className="text-white list-disc list-inside">
              <li>10-11 characters</li>
              <li>1 letter</li>
              <li>1 number or special character (example: # ? ! &)</li>
            </ul>
          </div>
          <div className="flex justify-center py-4">
            <button
              type="submit"
              className="text-black font-semibold rounded-full bg-logoColor px-8 py-3 w-full md:w-80"
            >
              next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordStep;

import React, { useState } from "react";
import { Axios } from "../mainPage/MainPage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const LoginNumber = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  //login with number
  const handleSendOtp = async () => {
    await Axios.post("/send-otp", { mobileNumber })
      .then((response) => {
        const { otp, message } = response.data;
        localStorage.setItem("ver", otp);
        toast.success(message);
        setIsOtpSent(true);
      })
      .catch((error) => {
        console.log("otp sending error", error);
      });
  };
  const storedOtp = localStorage.getItem("ver");
  console.log(storedOtp);
  const handleVerifyOtp = async () => {
    await Axios.post("/verify-otp", { mobileNumber, otp, storedOtp })
      .then((response) => {
        toast.success(response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  return (
    <div>
      {!isOtpSent ? (
        <div className="flex justify-center bg-[#121212] h-screen ">
          <div className="w-[50%] m-12 ">
            <p className="text-white text-center">Enter phone number</p>

            <div className="flex justify-between  m-10">
              <PhoneInput
                country={"in"}
                enableSearch={true}
                buttonStyle={{ borderRadius: "8px", padding: "0 15px" }}
                inputStyle={{ display: "none" }}
              />
              <input
                type="text"
                placeholder="Phone number"
                className="rounded-md px-8 hover:border-white transition duration-300 text-white py-3 font-semibold border-solid border-2 w-3/4  border-[#727272] bg-[#121212]"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-end ">
              <button
                className="text-black font-semibold rounded-full bg-logoColor space-x-3 px-8 py-3 w-"
                onClick={handleSendOtp}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default LoginNumber;

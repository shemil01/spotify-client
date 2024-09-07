import React, { useState } from "react";
import { Axios } from "../mainPage/MainPage";


function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false)





  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await Axios.post("/password-reset", { email });
      setMessage(response.data);
      setLoading(false)
    } catch (error) {
      setMessage("Error sending reset email");
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
          <p className="text-white">
            Enter your email address or username, and <br />
            we'll send you a link to get back into your <br />
            account.
          </p>
        </div>
        <div className="w-80 md:w-80">
          <span className="text-white text-left font-semibold py-4 block">
            Email address or username
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="rounded-md text-white px-8 py-3 w-80 md:w-80 font-semibold border-solid border-2 border-[#727272] bg-[#121212]  hover:border-white transition duration-300"
          />
        </div>
        <div className="flex justify-center  py-8">
          <button
            onClick={handleSubmit}
            className="text-black font-semibold rounded-full bg-logoColor space-x-3 px-8 py-3 w-80 md:w-80 transform transition-transform duration-200 hover:scale-105 flex justify-center items-center"
          >

{loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Send link"
            )}
            
          </button>
        </div>
        {message && <p className="text-white">{message}</p>}
      </div>
    </div>
  );
}

export default PasswordResetRequest;

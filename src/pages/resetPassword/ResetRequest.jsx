    // import React, { useState } from "react";
    // import { Axios } from "../mainPage/MainPage";

    // function PasswordResetRequest() {
    // const [email, setEmail] = useState("");
    // const [message, setMessage] = useState("");

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //     const response = await Axios.post("/password-reset", { email });
    //     setMessage(response.data);
    //     } catch (error) {
    //     setMessage("Error sending reset email");
    //     }
    // };

    // return (
    //     <div
    //     className="bg-[#121212] min-h-screen w-full"
    //     >
    //     <div>
    //         <header>
    //         <img
    //             className="w-24 md:w-32 lg:w-40"
    //             src="https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg"
    //             alt="Spotify Logo"
    //         />
    //         </header>
    //     </div>
    //     <div className=" flex flex-col items-center ">
    //         <div className="px-8 py-3 md:w-auto "><span className="text-white font-bold text-3xl">Reset your password</span></div>
    //         <div><p className="text-white">Enter your email address or username, and <br/>we'll send you a link to get back into your <br/>account.</p></div>
    //         <div>
    //             <span className="text-white flex  font-semibold py-4">
    //                 Email address or username
    //             </span>
    //             </div>
    //             <div className="flex justify-center">
    //             <input
                
    //                 type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     placeholder="Enter your email"
    //                     required
    //                 className="rounded-md text-white px-8 py-3 w-72 md:w-80 font-semibold border-solid border-2 border-[#727272] bg-[#121212]"
    //             />
    //             </div>
    //             <div className="flex justify-center px-8 py-8">
    //         <button onClick={handleSubmit} className="text-black font-semibold rounded-full bg-logoColor  space-x-3 px-8 py-3 w-64 md:w-80">
    //             Send link
    //         </button>
    //         </div>
    //         {message && <p>{message}</p>}
    //     </div>
    //     </div>
    // )
    // }

    // export default PasswordResetRequest;



    import React, { useState } from "react";
import { Axios } from "../mainPage/MainPage";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      const response = await Axios.post("/password-reset", { email });
      setMessage(response.data);
    } catch (error) {
      setMessage("Error sending reset email");
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen w-full">
      <div>
        <header>
          <img
            className="w-24 md:w-32 lg:w-40"
            src="https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg"
            alt="Spotify Logo"
          />
        </header>
      </div>
      <div className="flex flex-col items-center">
        <div className="px-8 py-3 md:w-auto">
          <span className="text-white font-bold text-3xl">Reset your password</span>
        </div>
        <div>
          <p className="text-white">
            Enter your email address or username, and <br />
            we'll send you a link to get back into your <br />
            account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div>
            <span className="text-white flex font-semibold py-4">
              Email address or username
            </span>
          </div>
          <div className="flex justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="rounded-md text-white px-8 py-3 w-72 md:w-80 font-semibold border-solid border-2 border-[#727272] bg-[#121212]"
            />
          </div>
          <div className="flex justify-center px-8 py-8">
            <button
              type="submit" // Changed to type="submit" to handle form submission
              className="text-black font-semibold rounded-full bg-logoColor space-x-3 px-8 py-3 w-64 md:w-80"
            >
              Send link
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default PasswordResetRequest;


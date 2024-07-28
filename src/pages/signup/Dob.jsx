import React, { useContext } from "react";
import myContext from "../../context/Context";
import { GrPrevious } from "react-icons/gr";
import { AiFillSpotify } from "react-icons/ai";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const DateOfBirthStep = ({ onFinish }) => {
  const { signup, setSignup } = useContext(myContext);
const navigate = useNavigate()
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({
      ...prev,
      dateOfBirth: {
        ...prev.dateOfBirth,
        [name]: value,
      },
    }));
  };
  

  return (
    <div className="bg-[#121212] min-h-screen w-full flex flex-col items-center justify-center">
      <header className="mb-6">
        <AiFillSpotify color="white" size="3em" />
      </header>
      <div className="flex flex-col w-80 md:w-80 mx-auto space-y-4">
        <div className="flex space-x-3">
          <button className="text-[#a7a7a7] text-2xl hover:text-white transition duration-300">
            <GrPrevious onClick={()=>navigate(-1)} />
          </button>
          <div className="flex flex-col">
            <span className="text-[#a7a7a7]">Step 2 of 2</span>
            <span className="text-white font-semibold">
              Tell us about yourself
            </span>
          </div>
        </div>
        <form className="w-full space-y-4">
          <div>
            <label className="text-white text-left font-semibold block mb-2">
              Name
            </label>
            <p className="text-[#a7a7a7]">This name will appear on your profile</p>
            <div className="flex items-center border border-[#727272] rounded-md px-1 hover:border-green-500 transition duration-300">
              <input
                type="text"
                name="username"
                value={signup.username}
                onChange={(e)=>setSignup({...signup,username:e.target.value})}
                required
                className="flex-grow text-white px-3 py-3 font-semibold outline-none bg-[#121212] hover:bg-[#1a1a1a] transition duration-300"
              />
            </div>
          </div> 
          <div>
            <label className="text-white text-left font-semibold">
              Date of Birth
            </label>
            <p className="text-[#a7a7a7]">Why do we need your date of birth?</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              name="year"
              placeholder="YYYY"
              maxLength="4"
              className="w-1/3 p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-green-500 transition duration-300"
              value={signup.dateOfBirth.year || ""}
              onChange={handleDateChange}
            />
            <select
              name="month"
              className="w-1/3 p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-green-500 transition duration-300"
              value={signup.dateOfBirth.month || ""}
              onChange={handleDateChange}
            >
              <option value="">Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="day"
              placeholder="DD"
              maxLength="2"
              className="w-1/3 p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-green-500 transition duration-300"
              value={signup.dateOfBirth.day || ""}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <label className="text-white text-left font-semibold block mb-2">
              Gender
            </label>
            <p className="text-[#a7a7a7]">
              We use your gender to help personalize our content recommendations and ads for you.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap justify-around">
              {[
                "Male",
                "Woman",
                "Non-binary",
                "Something else",
                "Prefer not to say",
              ].map((gender) => (
                <label key={gender} className="space-x-2 text-white py-1">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    className="custom-radio"
                    checked={signup.gender === gender}
                    onChange={(e) =>
                      setSignup({ ...signup, gender: e.target.value })
                    }
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-center py-4">
            <button
              type="submit"
              onClick={onFinish}
              className="text-black font-semibold rounded-full bg-logoColor px-8 py-3 w-full md:w-80 hover:bg-green-500 transition duration-300"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateOfBirthStep;

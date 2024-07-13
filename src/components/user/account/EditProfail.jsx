import React from 'react'
import Nav from './Nav'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GrPrevious } from "react-icons/gr";

const EditProfail = () => {
  return (
    <div className='className="pb-10 w-full bg-[#131313]'>
        <Nav />
        
        
        <div className="flex flex-col w-80 md:w-[60%] mx-auto space-y-4">
<div className='text-[#a7a7a7] text-1xl w-10 h-10 flex items-center justify-center rounded-full text-2xl bg-[#454343]'>      <MdArrowBackIos /></div>
      <h1 className='text-white text-4xl font-bold space-x-5'>Edit profail</h1>
        <form className="w-full space-y-4">
          <div>
            <label className="text-white text-left font-semibold block mb-2">
              username
            </label>
           
            <div className="flex items-center border border-[#727272] rounded-md px-1 hover:border-green-500 transition duration-300">
              <input
                type="text"
                name="username"
              
                required
                className="flex-grow text-white px-3 py-3 font-semibold outline-none bg-[#121212] hover:bg-[#1a1a1a] transition duration-300"
              />
            </div>
          </div> 
          <div>
            <label className="text-white text-left font-semibold block mb-2">
              Email
            </label>
           
            <div className="flex items-center border border-[#727272] rounded-md px-1 hover:border-green-500 transition duration-300">
              <input
                type="text"
                name="username"
              
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
              
            />
            <select
              name="month"
              className="w-1/3 p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-green-500 transition duration-300"
             
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
                   
                   
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-center py-4">
            <button
              type="submit"
              
              className="text-black font-semibold rounded-full bg-logoColor px-8 py-3 w-full md:w-80 hover:bg-green-500 transition duration-300"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfail
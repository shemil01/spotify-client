import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeNav = () => {
    const navigate = useNavigate()
  return (
    <nav className="flex ">
    <div className="flex flex-wrap space-x-7 py-3 px-4">
      <div className="bg-white rounded-full w-10 h-8 flex items-center justify-center ">
        <button
         
          className="text-black cursor-pointer"
        >
          All
        </button>
      </div>
      <div className="bg-[#292828] h-8 w-16 rounded-full flex items-center justify-center">
        <button
          className="text-white font-semibold"
          onClick={() => navigate("/music")}
        >
          Music
        </button>
      </div>
      <div className="bg-[#292828] h-8 w-20 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold">Podcast</span>
      </div>
    </div>
  </nav>
  )
}

export default HomeNav
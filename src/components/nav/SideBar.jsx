import React from "react";
import { GoHomeFill } from "react-icons/go";
import { GrSearch } from "react-icons/gr";
import { BiLibrary } from "react-icons/bi";
import { FaPlus, FaArrowRight } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

// import { Axios } from "../../pages/mainPage/MainPage";

const SideBar = () => {
  const {playlistId} = useParams()
  console.log(playlistId)
const navigate = useNavigate()
// const {playlist} = useContext(myContext)


  return (
    <div className="bg-black min-h-screen w-full md:w-[30%] flex px-2 py-2 flex-col space-y-2">
      <div className="bg-[#121212] w-full h-28 px-7 rounded-md py-5">
        <div className="flex items-center space-x-4">
          <div className="text-white text-3xl">
            <GoHomeFill />
          </div>
          <span className="text-white font-bold" onClick={()=>navigate('/home')}>Home</span>
        </div>

        <div className="py-4 flex items-center space-x-5 hover:text-white group">
          <div className="text-[#a7a7a7] text-2xl group-hover:text-white">
            <GrSearch />
          </div>
          <span className="text-[#a7a7a7] font-bold group-hover:text-white">
            Search
          </span>
        </div>
      </div>
      <div className="bg-[#121212] w-full h-[30rem] rounded-md py-5 px-7">
        <div className="flex items-center justify-between group">
          <div className="flex justify-start items-center space-x-2 group-hover:text-white">
            <BiLibrary className="text-[#a7a7a7] text-3xl group-hover:text-white" />
            <span className="text-[#a7a7a7] font-bold text-sm group-hover:text-white">
              Your Library
            </span>
          </div>
          <div className="ml-auto flex justify-end">
            <button className="text-[#a7a7a7] hover:text-white hover:bg-[#2e2e2e] rounded-full p-2">
              <FaPlus />
            </button>
            <button className="text-[#a7a7a7] hover:text-white hover:bg-[#2e2e2e] rounded-full p-2">
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="flex items-center py-6">
          <div className="bg-[#282727] hover:bg-[#383838] rounded-full px-4 py-2">
            <span className="text-white font-semibold" onClick={()=>navigate(`/playlist-by-id/${playlistId}`)}>Playlists</span>
          </div>
        </div>
        <div className="flex justify-between text-[#a7a7a7]">
          <button className="flex items-center space-x-2 text-xl hover:text-white hover:bg-[#2e2e2e] rounded-full p-2">
            <GrSearch />
          </button>
          <button className="flex items-center space-x-2 hover:text-white hover:text-base">
            <span className="font-semibold">Recents</span>
            <FaListUl />
          </button>
        </div>
        {/* <div className="flex w-full flex-col mt-2">
             {playlist?.map((item)=>(
               
             <div className="">
              
               <img src={item.coverImage} alt="" className="w-10" />
               <p className="text-white mx-3">{item.title}</p>
             </div>

             ))}
             
            </div> */}
      </div>
    </div>
  );
};

export default SideBar;

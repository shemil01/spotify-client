import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SideBar from "../nav/SideBar";
import { GrSearch } from "react-icons/gr";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Axios } from "../../pages/mainPage/MainPage";

const Search = () => {
  const mobileView = useMediaQuery({ query: "(max-width: 1000px)" });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await Axios.get(`/search-song/${searchQuery}`);
        console.log(response);
        setSearchResults(response.data.song);
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div className="bg-black w-full h-screen flex space-y-3">
      {!mobileView && <SideBar />}
      <div className="flex-1 h-[85%] rounded-md bg-[#121212]">
        <header className="flex items-center gap-10 py-3 px-3">
          <div className="bg-black rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-110 transition-transform duration-200">
            <MdArrowBackIos />
          </div>
          <div className="bg-black rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-110 transition-transform duration-200">
            <MdArrowForwardIos />
          </div>

          <div className="w-80 bg-[#2A2A2A] rounded-full h-12 flex items-center px-4">
            <GrSearch className="text-[#E3E3E3] mr-2" />
            <form className="w-full" onSubmit={handleSearch}>
              <input
                type="text"
                className="bg-[#2A2A2A] w-full text-[#E3E3E3]   focus:outline-none border-none"
                placeholder="What do you want to play?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </header>
        <div >
{searchResults.map((result)=>(
<img src={result.coverImage} alt="" />
))}
        </div>
      </div>
    </div>
  );
};

export default Search;

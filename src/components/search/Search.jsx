import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SideBar from "../nav/SideBar";
import { GrSearch } from "react-icons/gr";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Axios } from "../../pages/mainPage/MainPage";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

const Search = () => {
  const navigate = useNavigate();
  const mobileView = useMediaQuery({ query: "(max-width: 1000px)" });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 2) {
      const response = await Axios.get(`/search-song?q=${value}`,{
        withCredentials:true
      });
      setSuggestions(response.data.suggestions);
      setNoResults(false);
    } else {
      setSuggestions([]);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await Axios.get(`/search-song?q=${searchQuery}`,{
      withCredentials:true
    });
    const songs = response.data.song;

    setSearchResults(songs);
    setSuggestions([]);

    if (songs.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  return (
    <div className="bg-black md:w-full h-screen flex space-y-3 w-80">
      {!mobileView && <SideBar />}
      <div className="flex-1 md:h-[85%] h-screen  rounded-md bg-[#121212] relative">
        <header className="flex items-center gap-10 py-3 px-3">
          <div className="bg-black rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-110 transition-transform duration-200">
            <MdArrowBackIos onClick={() => navigate(-1)} />
          </div>
          <div className="bg-black rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-110 transition-transform duration-200">
            <MdArrowForwardIos onClick={() => navigate(1)} />
          </div>

          <div className="w-80 bg-[#2A2A2A] rounded-full h-12 flex items-center px-4">
            <GrSearch className="text-[#E3E3E3] mr-2" />
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                className="bg-[#2A2A2A] w-full text-[#E3E3E3] focus:outline-none border-none"
                placeholder="What do you want to play?"
                value={searchQuery}
                onChange={handleSearch}
              />
            </form>
          </div>
        </header>

        <div className="flex p-4 space-x-4">
          {searchResults.length > 0 && (
            <div className="flex-1">
              <h1 className="text-white font-bold text-lg mb-3">Top Result</h1>
              <div
                onClick={() => navigate(`/song-by-id/${searchResults[0]._id}`)}
                className="flex items-center hover:bg-[#2A2A2A] p-3 rounded-md cursor-pointer"
              >
                <img
                  src={searchResults[0].coverImage}
                  alt=""
                  className="w-16 h-16 mr-4"
                />
                <p className="text-white text-lg">{searchResults[0].name}</p>
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="flex-1">
              <h1 className="text-white font-bold text-lg mb-3">Suggestions</h1>
              <div className="grid grid-cols-2 gap-4">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center hover:bg-[#2A2A2A] p-2 rounded-md cursor-pointer"
                  >
                    <img src={item.coverImage} alt="" className="w-10 h-10" />
                    <p className="text-white mx-3">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {noResults && (
            <div className="flex-1">
              <h1 className="text-white font-bold text-lg mb-3">
                No Results Found
              </h1>
              <p className="text-gray-500">
                Sorry, we couldn't find any songs matching your search.
              </p>
            </div>
          )}
        </div>
       {!mobileView && <Footer />}
      </div>
    </div>
  );
};

export default Search;

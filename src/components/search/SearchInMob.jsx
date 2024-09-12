import { MdArrowBackIos } from "react-icons/md";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Axios } from "../../pages/mainPage/MainPage";

const SearchInMob = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 2) {
      const response = await Axios.get(`/search-song?q=${value}`, {
        withCredentials: true,
      });
      setSuggestions(response.data.suggestions);
      setNoResult(false);
    } else {
      setSuggestions([]);
      setSearchResults([]);
      setNoResult(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(`/search-song?q=${searchQuery}`, {
      withCredentials: true,
    });
    const songs = response.data.song;

    setSearchResults(songs);
    setSuggestions([]);
    if (songs.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  };

  return (
    <div className="bg-[#121212] h-screen w-full">
      <div className="flex1">
        <header className="text-white flex items-center justify-around space-y-5 ">
          <div className="bg-black rounded-full w-8 h-8 flex items-center text-white justify-center mt-5">
            <MdArrowBackIos />
          </div>
          <div className="w-80 h-12 bg-[#2A2A2A] flex items-center  rounded-full ">
            <GrSearch className="mr-5 ml-5" />
            <form onSubmit={handleSubmit}>
              <input
                placeholder="What do you want to play?"
                type="text"
                className="bg-[#2A2A2A] border-none w-full focus:outline-none text-white"
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
                onClick={() => navigate(`/song-id/${searchResults[0]._id}`)}
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

          {noResult && (
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
      </div>
    </div>
  );
};

export default SearchInMob;

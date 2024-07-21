import React, { useState } from "react";

import { RiAccountCircleFill, RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="pb-10 w-full bg-[#131313]">
      <header className="h-32 w-full flex md:justify-around justify-between items-center px-8">
        <div className="flex items-center mt-4">
          <img
            className="w-24 md:w-32 lg:w-40"
            src="https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg"
            alt="Spotify Logo"
          />
        </div>
        <div className="flex items-center">
          <button
            className="text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <RiCloseLine className="text-4xl " />
            ) : (
              <RiMenu3Line className="text-4xl" />
            )}
          </button>
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center w-full md:w-auto`}
          >
            <div className="flex flex-col md:flex-row justify-around text-white font-bold w-full max-w-md">
              <button className="mx-2 hover:text-logoColor">
                <span>Premium</span>
              </button>
              <button className="mx-2 hover:text-logoColor">
                <span>Support</span>
              </button>
              <div className="flex items-center space-x-2 group hover:text-logoColor">
                <button className="mx-2">
                  <span className="text-4xl">
                    <RiAccountCircleFill />
                  </span>
                </button>
                <button className="mx-2">
                  <span>Profail</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Nav;

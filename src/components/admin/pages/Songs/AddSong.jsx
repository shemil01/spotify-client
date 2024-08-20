import React from "react";
import SideNav from "../../adminComponent/SideNav";
import TopNav from "../../adminComponent/TopNav";

const AddSong = () => {
  return (
   
    <div className="flex h-screen bg-[#121212] text-white">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <TopNav />
        <main className="flex-grow p-6 overflow-y-auto no-scrollbar">
          <div className="p-4">
       <div>
        <input type="text"  accept="image/*" hidden />
       </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSong;

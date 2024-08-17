import React from "react";

import SideNav from "../SideNav";
import TopNav from "../TopNav";
import Dashboard from "./Dashboard";

const AdminHome = () => {
  return (
    <div className="flex h-screen bg-[#282828] text-white">
    <SideNav />
    <div className="flex flex-col flex-grow">
      <TopNav />
      <main className="flex-grow p-6">
        <Dashboard />
      </main>
    </div>
  </div>
  );
};

export default AdminHome;

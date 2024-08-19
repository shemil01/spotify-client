import React, { useEffect, useState } from "react";
import TopNav from "../../TopNav";
import SideNav from "../../SideNav";
import Statistics from "./statics";
import UserTable from "./UserTable";
import { Axios } from "../../../../pages/mainPage/MainPage";

import GenderPieChart from "./Piechart";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    Axios.get("/get-all-users", {
      withCredentials: true,
    })
      .then((response) => {
        setUsers(response.data.user || []); // Update the state with the user data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <TopNav />
        <main className="flex-grow p-6 overflow-y-auto no-scrollbar">
          <div className="p-4">
            <h1 className="mb-4 text-2xl font-semibold text-gray-700">
              User Dashboard
            </h1>
            <Statistics users={users} />
            <UserTable users={users} />
            <GenderPieChart users={users} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;

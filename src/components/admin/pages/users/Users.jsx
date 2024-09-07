import React, { useEffect, useState } from "react";
import TopNav from "../../adminComponent/TopNav";
import SideNav from "../../adminComponent/SideNav";
import Statistics from "./statics";
import UserTable from "./UserTable";
import { Axios } from "../../../../pages/mainPage/MainPage";
import GenderPieChart from "./Piechart";
import { ClipLoader } from 'react-spinners';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    Axios.get("/get-all-users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        setUsers(response.data.user || []); 
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <ClipLoader color={"#ffffff"} loading={loading} size={50} />
      </div>
    );
  }

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

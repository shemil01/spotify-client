import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AiFillSpotify } from "react-icons/ai";
import { Axios } from "../../pages/mainPage/MainPage";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BiSolidShow,BiSolidHide  } from "react-icons/bi";
import myContext from "../../context/Context";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {setAdminLog} = useContext(myContext)
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  // const [adminData, setAdminData] = useState({});
  const [showPassword,setShowPassword] = useState(false)


  const passwordVisible  = ()=>{
    setShowPassword((prevShowPass)=>!prevShowPass)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!admin.email || !admin.password) {
      return toast.error("Enter email and password");
      setLoading(true)
    }
    Axios.post("/admin-login", admin, {
      withCredentials: true,
    })
      .then((response) => {
        const { adminToken } = response.data;
        Cookies.set("adminToken", adminToken);
        localStorage.setItem("adminToken", adminToken);
        navigate("/admin/home");
        setAdminLog(true)
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-[#121212] h-screen flex justify-center overflow-y-scroll no-scrollbar">
      <div className="relative bg-[#121212] shadow-lg w-full md:w-8/12 lg:w-[730px] flex md:mt-8 flex-col space-y-5 p-4 h-full">
        <div className="flex items-center flex-col">
          <AiFillSpotify color="white" size="3em" />
          <div>
            <span className="text-white font-bold text-3xl">
              Login to spotify Admin
            </span>

            <div className="mt-10">
              <div>
                <span className="text-white flex font-semibold py-3">
                  Email
                </span>
              </div>
              <div className="flex justify-center">
                <input
                 type="email"
                  placeholder="Enter Email"
                  value={admin.email}
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                  className="rounded-md text-white px-8 py-3 w-80  font-semibold border-solid border-2 border-[#727272] bg-[#121212] hover:border-white transition duration-300"
                />
              </div>
              <div>
                <span className="text-white flex py-3 font-semibold">
                  Password
                </span>
              </div>
              <div className="flex justify-center relative">
                <input
                  type={showPassword ?"text":"password"}
                  placeholder="Enter your Password"
                  value={admin.password}
                  onChange={(e) =>
                    setAdmin({ ...admin, password: e.target.value })
                  }
                  className="w-80 py-3 px-8 text-white bg-[#121212] border-solid border-2 border-[#727272] rounded-md  hover:border-white"
                />
                  <button onClick={passwordVisible} className="text-white absolute text-2xl right-10 top-1/2 transform -translate-y-1/2 ">{showPassword ?<BiSolidHide />:<BiSolidShow />}</button>
              </div>
              <div className="flex justify-center items-center bg-green-500 rounded-full py-3 hover:bg-green-700 text-white mt-10">
                <button className="flex justify-center items-center" onClick={handleSubmit}>{loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Login"
            )}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

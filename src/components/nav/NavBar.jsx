// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import ToggleMenu from '../Toggle/ToggleMenu'
// import Cookies from "js-cookie";

// const NavBar = () => {
//     const {setUserData, setLog,} = useContext(myContext)
//     const navigate = useNavigate()


//     const Logout = () => {
//         Cookies.remove("token");
//         setLog(false);
//         localStorage.removeItem("token");
//         localStorage.removeItem("userInfo");
//         setUserData("");
//         navigate("/");
//       };
//   return (
  
//         <div className='className="bg-[#121212] flex-1 h-[85%] rounded-md"'>
//               <ToggleMenu
//           isMenuOpen={isMenuOpen}
//           setIsMenuOpen={setIsMenuOpen}
//           navigate={navigate}
//           userData={userData}
//           Logout={Logout}
//         />
//     <div className="flex ">
//     <div className="flex flex-wrap space-x-7 py-3 px-4">
//       <div className="bg-white rounded-full w-10 h-8 flex items-center justify-center">
//         <button className="text-black " onClick={()=>navigate('/home')}>All</button>
//       </div>
//       <div className="bg-[#292828] h-8 w-16 rounded-full flex items-center justify-center">
//         <button className="text-white font-semibold" onClick={()=>navigate('/music')}>Music</button>
//       </div>
//       <div className="bg-[#292828] h-8 w-20 rounded-full flex items-center justify-center">
//         <span className="text-white font-semibold">Podcast</span>
//       </div>
//     </div>
//   </div></div>
//   )
// }

// export default NavBar
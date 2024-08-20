import React from 'react';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Toggle = ({ isOpen, toggleMenu }) => {
    const navigate = useNavigate()
  return (
    <>
      {isOpen && (
        <div className="absolute right-10 top-10 mt-2 w-48 bg-[#382E2E]   rounded shadow-lg">
          <button
            onClick={toggleMenu}
            className="text-2xl "
          >
           <IoIosClose />
          </button>
          <ul>
            <li onClick={()=>navigate('/admin/add-song')} className="px-4 py-2 hover:bg-gray-100 hover:text-black">Add Song</li>
            <li className="px-4 py-2 hover:bg-gray-100  hover:text-black">Create playlist </li>
            <li className="px-4 py-2 hover:bg-gray-100  hover:text-black">Create Library</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Toggle;

import React from "react";
import { MdDelete, MdEditNote } from "react-icons/md";
import { Axios } from "../../../../pages/mainPage/MainPage";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DeleteSong = ({ isOpen, songId, song }) => {
  const navigate = useNavigate();

  const deleteSong = () => {
    Axios.delete(`/admin/delete-song/${songId}`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        navigate("/admin/all-songs");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      {isOpen && (
        <div className="w-40 bg-[#382E2E]  absolute rounded mt-10 py-3">
          <ul className="px-5 py-">
            <li
              className="flex items-center cursor-pointer"
              onClick={deleteSong}
            >
              <MdDelete className="mr-2" />
              <span>Delete</span>{" "}
            </li>
            <Link to={`/admin/edit-song/${songId}`}
            state={{ song}}
            >
              <li className="flex items-center cursor-pointer">
                <MdEditNote className="mr-2" />
                <span>Edit</span>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default DeleteSong;

import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { MdArrowBackIos } from "react-icons/md";
import { Axios } from "../../../pages/mainPage/MainPage";
import { Link } from "react-router-dom";
import myContext from "../../../context/Context";
import toast from "react-hot-toast";

const EditProfail = () => {
  const { userData, setUserData } = useContext(myContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
    gender: "",
    dateOfBirth: { year: "", month: "", day: "" },
    image: null,
    profilePicture: "",
    country: "",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", editUser.username);
    formData.append("email", editUser.email);
    formData.append("gender", editUser.gender);
    formData.append(
      "dateOfBirth",
      `${editUser.dateOfBirth.year}-${editUser.dateOfBirth.month}-${editUser.dateOfBirth.day}`
    );
    formData.append("country", editUser.country);
    if (editUser.image) {
      formData.append("image", editUser.image);
    }
    try {
      const response = await Axios.put("/user/edit-profail", formData, {
        withCredentials: true,
      });
      setUserData(response.data.user);
      setShowEdit(false);
      toast.success("profail updated")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "year" || name === "month" || name === "day") {
      setEditUser((prevData) => ({
        ...prevData,
        dateOfBirth: {
          ...prevData.dateOfBirth,
          [name]: value,
        },
      }));
    } else {
      setEditUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    Axios.get("/user/view-profail", { withCredentials: true })
      .then((response) => {
        setUserData(response.data.user);

        setEditUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          gender: userData.gender,
          dateOfBirth: {
            year: userData.dateOfBirth.split("-")[0],
            month: userData.dateOfBirth.split("-")[1],
            day: new Date(userData.dateOfBirth).getDate(),
          },
          image: null,
          profilePicture: userData.profilePicture,
          country: userData.country,
        });
        setLoading(false);
      })
      .catch((error) => {
        // setError(error);
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
 

  return (
    <div className="pb-10 w-full bg-[#131313]">
      <Nav />
      <div className="flex flex-col w-72 md:w-[50%] mx-auto space-y-4">
        <div className="text-[#a7a7a7] text-1xl w-10 h-10 flex items-center justify-center rounded-full text-2xl bg-[#454343]">
          <Link to={"/profail"}>
            {" "}
            <MdArrowBackIos />
          </Link>
        </div>
        <h1 className="text-white text-4xl font-bold space-x-5">
          Edit profail
        </h1>
        <form className="w-full space-y-4">
          <div>
            <label className="text-white text-left font-semibold block mb-2">
              Username
            </label>
            <div className="flex items-center border border-[#727272] rounded-md px-1 hover:border-white transition duration-300">
              <input
                type="text"
                name="username"
                value={editUser.username}
                onChange={handleChange}
                className="flex-grow text-white px-3 py-3 font-semibold outline-none bg-[#121212] hover:bg-[#1a1a1a] transition duration-300"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-left font-semibold block mb-2">
              Email
            </label>
            <div className="flex items-center border border-[#727272] rounded-md px-1 hover:border-white transition duration-300">
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleChange}
                className="flex-grow text-white px-3 py-3 font-semibold outline-none bg-[#121212] hover:bg-[#1a1a1a] transition duration-300"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-left font-semibold block mb-2">
              Gender
            </label>
            <div>
              <select
                name="gender"
                value={editUser.gender}
                onChange={handleChange}
                className="w-full p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-white transition duration-300"
              >
                {["Male", "Female", "Prefer not say", "Other"].map(
                  (gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div>
            <label className="text-white text-left font-semibold">
              Date of Birth
            </label>
            <p className="text-[#a7a7a7]">Why do we need your date of birth?</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              name="year"
              placeholder="YYYY"
              maxLength="4"
              value={editUser.dateOfBirth.year}
              onChange={handleChange}
              className="w-1/3 p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-white transition duration-300"
            />
            <select
              name="month"
              value={editUser.dateOfBirth.month}
              onChange={handleChange}
              className="w-1/3 p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-white transition duration-300"
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="day"
              placeholder="DD"
              maxLength="2"
              value={editUser.dateOfBirth.day}
              onChange={handleChange}
              className="w-1/3 p-2 bg-[#121212] text-white border border-[#727272] rounded-md hover:border-white transition duration-300"
            />
          </div>
          <div>
            <label className="text-white text-left font-semibold block mb-2">
              Country or region
            </label>
            <div>
              <select
                name="country"
                value={editUser.country}
                onChange={handleChange}
                className=" p-2 w-full bg-[#121212] text-white border border-[#727272] rounded-md hover:border-white transition duration-300"
              >
                <option value="">Select Country</option>
                {["India", "USA"].map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex md:justify-end justify-center spa py-4">
            <button
              type="button"
              className="text-[#a7a7a7] font-bold rounded-full m-4"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              type="submit"
              className="text-black font-bold rounded-full w-36 bg-logoColor md:w-40 hover:bg-green-500 transition duration-300"
            >
              Save profail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfail;

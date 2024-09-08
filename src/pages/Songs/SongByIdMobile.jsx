import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const SongByIdMobile = () => {
  return (
    <div className="h-screen bg-orange-300">
      <header className="pt-10 text-white pl-5 flex justify-between pr-5 text-3xl" >
        <div>
          <IoIosArrowDown />
        </div>
        <div>
          <BsThreeDots />
        </div>
      </header>

      <div>
        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fsoundcloud.com%2Fuser-596479501%2Fpakalin-vaathil-parava-movie&psig=AOvVaw3QRL86F3AiP_XZnljWjGWr&ust=1725877265183000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIC21_-Ps4gDFQAAAAAdAAAAABAE" alt="" className="w-40 h-40"/>
      </div>
    </div>
  );
};

export default SongByIdMobile;

import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-20">
      <div className="grid grid-cols-12 gap-2 mb-10 bg-tertiary ml-2 px-6 py-4">
        <div className="col-span-2 text-white">
          <ul>
            <li className="font-bold">Company</li>
            <li className="text-gray-400 hover:text-white hover:underline">About</li>
            <li className="text-gray-400 hover:text-white hover:underline">Jobs</li>
            <li className="text-gray-400 hover:text-white hover:underline">For the Record</li>
          </ul>
        </div>
        <div className="col-span-2 text-white">
          <ul>
            <li className="font-bold">Communities</li>
            <li className="text-gray-400 hover:text-white hover:underline">For Artists</li>
            <li className="text-gray-400 hover:text-white hover:underline">Developers</li>
            <li className="text-gray-400 hover:text-white hover:underline">Advertising</li>
            <li className="text-gray-400 hover:text-white hover:underline">Investors</li>
            <li className="text-gray-400 hover:text-white hover:underline">Vendors</li>
          </ul>
        </div>
        <div className="col-span-2 text-white">
          <ul>
            <li className="font-bold">Useful links</li>
            <li className="text-gray-400 hover:text-white hover:underline">Support</li>
            <li className="text-gray-400 hover:text-white hover:underline">Free Mobile App</li>
          </ul>
        </div>
        <div className="col-span-2 text-white">
          <ul className="">
            <li className="font-bold ">Spotify Plans</li>
            <li className="text-gray-400 hover:text-white hover:underline">Premium Individual</li>
            <li className="text-gray-400 hover:text-white hover:underline">Premium Duo</li>
            <li className="text-gray-400 hover:text-white hover:underline">Premium Family</li>
            <li className="text-gray-400 hover:text-white hover:underline">Premium Student</li>
            <li className="text-gray-400 hover:text-white hover:underline">Spotify Free</li>
          </ul>
        </div>
        <div className="col-span-3">
          <div className="flex justify-end space-x-7 text-white ">
            <FaInstagram />
            <FaTwitter />
            <FaFacebook />
          </div>
        </div>
      </div>
      <hr className="opacity-35"/>
      <div className="  w-full my-8">
        <div className="flex justify-between">
          <ul className="text-sm flex gap-4">
            <li className="text-gray-400 hover:text-white">Legal</li>
            <li className="text-gray-400 hover:text-white">Safety & Privacy Center</li>
            <li className="text-gray-400 hover:text-white">Privacy Policy</li>
            <li className="text-gray-400 hover:text-white">Cookies</li>
            <li className="text-gray-400 hover:text-white">About Ads</li>
            <li className="text-gray-400 hover:text-white">Accessibility</li>
          </ul>
          <h4 className="text-gray-400">© 2024 Spotify AB</h4>
        </div>
      </div>
    </div>
  );
};

export default Footer;

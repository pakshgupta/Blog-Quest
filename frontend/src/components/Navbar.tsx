import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown/UserProfileDropdown";
const Navbar = () => {
  const [user, setUser] = useState(false);
  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-md shadow-gray-200 h-20 border-solid">
      {/* Logo and Search Section */}
      {user ? (
        <>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold cursor-pointer">Medium</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-100 text-black rounded-full outline-none placeholder-gray-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <CiSearch />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="px-4 py-2  text-md font-medium flex items-center gap-1">
              {" "}
              <span>
                <FiEdit />
              </span>
              <Link to="/post/create-post/">Write</Link>
            </button>
            <UserProfileDropdown />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between px-6 py-4 h-20 border-b border-gray-200">
          {/* Left Section: Medium Logo */}
          <div>
            <span className="text-2xl font-semibold cursor-pointer">
              Medium
            </span>
          </div>

          {/* Right Section: Sign In and Get Started Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/user/signin"
              className="text-md font-medium text-gray-700 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/user/signup"
              className="text-md font-medium text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

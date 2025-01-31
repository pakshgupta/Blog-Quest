import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import UserProfileDropdown from "./UserProfileDropdown/UserProfileDropdown";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  return (
    <div
      className={
        user
          ? `flex items-center justify-between h-20 px-6 py-4 border-solid shadow-md shadow-gray-200`
          : `flex items-center justify-between h-20 px-6 py-4 border-solid shadow-md shadow-gray-200 bg-yellow-500 bg-gradient-to-b from-white/30 via-white/50 to-white/80 `
      }
    >
      {/* Logo and Search Section */}
      {user ? (
        <>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold cursor-pointer">Medium</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="py-2 pl-10 pr-4 text-black placeholder-gray-500 bg-gray-100 rounded-full outline-none"
              />
              <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
                <CiSearch />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 px-4 py-2 font-medium text-md">
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
        <div className="flex items-center justify-between w-full h-20 px-6 py-4 border-b border-gray-200 ">
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
              className="font-medium text-gray-700 text-md hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/user/signup"
              className="px-4 py-2 font-medium text-white bg-black rounded-md text-md hover:bg-gray-800"
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

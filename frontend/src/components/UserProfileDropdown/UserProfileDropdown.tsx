import { Link } from "react-router-dom";
import useDropdownToggle from "../../hooks/useDropdownToggle";
import Logout from "../../pages/Logout";
import Profile from "../../pages/Profile";
import Setting from "../../pages/Setting";
import Status from "../../pages/Status";
import ProfileIcon from "./ProfileIcon";

const UserProfileDropdown = () => {
  const { isOpen, toggleDropdown, closedDropdown } = useDropdownToggle();
  return (
    <div className="relative">
      <ProfileIcon onClick={toggleDropdown} />
      {isOpen && (
        <div
          className={` absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-10`}
          onMouseLeave={closedDropdown} // Close on mouse leave
        >
          <ul className="py-2">
            <Link to="/profile" className="px-4 py-2 text-sm text-gray-700 ">
              <Profile />
            </Link>
            <Link to="/status" className="px-4 py-2 text-sm text-gray-700 ">
              <Status />
            </Link>
            {/* <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer">
              Library
            </li> */}
            <Link to="/setting" className="px-4 py-2 text-sm text-gray-700 ">
              <Setting />
            </Link>
            <Link
              to="/user/signout"
              className="px-4 py-2 text-sm text-gray-700 "
            >
              <Logout />
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;

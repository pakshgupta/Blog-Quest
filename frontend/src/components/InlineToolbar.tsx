import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const InlineToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Plus Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 text-xl text-gray-600 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none"
      >
        <CiCirclePlus />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              Add Image
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              Add Video
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              Add Embed
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              Add Divider
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InlineToolbar;

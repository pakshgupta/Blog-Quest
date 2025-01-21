import { useState } from "react";

const useDropdownToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closedDropdown = () => {
    setIsOpen(false);
  };
  return {
    toggleDropdown,
    closedDropdown,
    isOpen,
  };
};

export default useDropdownToggle;

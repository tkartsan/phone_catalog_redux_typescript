import './CustomDropdown.css';

import React, { useRef, useState } from 'react';

import { ArrowLeftIcon } from '../../assets';
import { useClickOutside } from '../../hooks/useClickOutside';

export const CustomDropdown = ({
  options,
  selectedOption,
  setSelectedOption,
  label,
  isNarrowWidth,
  heightClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeDropdown = () => setIsOpen(false);

  useClickOutside(dropdownRef, closeDropdown);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    closeDropdown();
  };

  const truncateLabel = (label) => {
    return label.length > 13 ? `${label.slice(0, 13)}...` : label;
  };

  return (
    <div
      className={`custom-dropdown relative ${isNarrowWidth ? 'narrow-width' : 'standart-width'}`}
      ref={dropdownRef}
    >
      <div className="font-semibold mb-1 text-colorGrey">{label}</div>
      <div
        className={`dropdown-toggle border-solid border-colorGrey p-2 cursor-pointer flex justify-between items-center ${heightClass}`}
        onClick={toggleDropdown}
      >
        <span className="truncate w-full">
          {truncateLabel(
            selectedOption ? selectedOption.label : 'Default sorting',
          )}
        </span>
        <span
          className={`arrow-icon ${isOpen ? 'rotate-open' : 'rotate-close'}`}
        >
          <ArrowLeftIcon />
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-menu absolute mt-2 border border-colorGrey bg-white shadow-lg z-10 w-full">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-option p-2 hover:bg-colorLightGrey cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

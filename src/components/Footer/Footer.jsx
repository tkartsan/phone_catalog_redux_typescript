import React from 'react';

import { WebsiteLogo } from '../../assets';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="flex flex-col gap-5 w-full bg-colorBgBase text-gray-600 py-6 mt-auto">
      <div className="w-full h-[1px] bg-colorBorderGrey"></div>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <WebsiteLogo />
        </div>
        <nav className="flex w-[400px] justify-between space-x-8 text-xs font-extrabold">
          <a
            href="https://github.com/tkartsan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black no-underline"
          >
            GITHUB
          </a>
          <a
            href="https://github.com/tkartsan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black no-underline"
          >
            CONTACTS
          </a>
          <a
            href="https://www.example.com/rights"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black no-underline"
          >
            RIGHTS
          </a>
        </nav>
        <button
          className="flex items-center space-x-2 text-gray-600"
          onClick={scrollToTop}
        >
          <span className="text-gray-500 font-medium">Back to top</span>
          <div className="w-8 h-8 flex items-center justify-center border-solid border-bgTextBase p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 text-bgTextBase"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </button>
      </div>
    </footer>
  );
};

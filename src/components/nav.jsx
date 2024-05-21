import React, { useState } from 'react';
import Logo from "../media/logo.png"

/**
 * Nav component renders a responsive navigation bar with a logo and a mobile menu.
 * 
 * @component
 * @example
 * return (
 *   <Nav />
 * )
 */
function Nav() {
  // State to manage the visibility of the mobile menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-md fixed z-50 w-screen border-b-2 border-white">
      <div className="limited sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center">
            {/* Button to toggle the mobile menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {/* Icon for the mobile menu button */}
              <svg
                className="block h-10 w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center">
            <div className="flex flex-shrink-0 items-start">
              {/* Company logo */}
              <img
                className="h-10"
                src={Logo}
                alt="Your Company"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, visible when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="" id="mobile-menu">
          <div className="flex flex-col items-end justify-end mr-24">
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;




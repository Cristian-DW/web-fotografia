import React, { useState } from 'react';
import Logo from "../media/logo.png"

function Nav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-md  fixed z-50 w-screen  border-b-2 border-white">
      <div className="mx-24 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center">
        
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white hfjhgfhover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
             
              <svg
                className="block h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center">
            <div className="flex flex-shrink-0 items-start">
              <img
                className="h-8"
                src={Logo}
                alt="Your Company"
              />
            </div>
          </div>
        </div>
      </div>

      
      {isMobileMenuOpen && (
        <div className="" id="mobile-menu">
          <div className="flex flex-col items-end justify-end  mr-24  ">
            
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



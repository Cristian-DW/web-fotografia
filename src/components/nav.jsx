import React, { useState } from 'react';
import Logo from '../media/logo.svg'
import Red1 from '../media/bxl-linkedin.svg'
import Red2 from '../media/bxl-github.svg'
import Red3 from '../media/bxl-gmail.svg'


const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuClasses = isMobileMenuOpen ? "block" : "hidden";

  const menuButtonClasses = "relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white";


  return (
    <>
      <nav className=" fixed top-0 left-0 z-20 w-full border-b-2 backdrop-blur-lg   ">
        <div className="mx-auto max-w-8xl px-2 md:px-10 lg:px-36 ">
          <div className=" flex h-16 items-center justify-between">
            <div className=" inset-y-0 left-0 flex items-center md:hidden">
              {/* Mobile menu button */}
              <button type="button" className={menuButtonClasses} onClick={toggleMobileMenu} aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-around md:items-stretch md:justify-between">
              <div className="flex flex-shrink-0 items-center  space-x-4 text-white md: mr-20">
                <a className='button-hover' href='/'> <img className="h-12 w-auto" src={Logo} alt="logo" /> </a>
                <a href="#" className=" py-2 font-nav font-medium hidden  button-hover md:block">Cristian Castro</a>
              </div>
              <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-8 text-white " >
                  <a href="#" className="py-2 font-nav font-medium  hover:border-b-2 button-hover ">Conoceme</a>
                  <a href="#" className=" py-2 font-nav font-medium hover:border-b-2 button-hover">Habilidades</a>
                  <a href="#" className=" px-3 py-2 font-nav font-medium hover:border-b-2 button-hover">Educación</a>
                  <a href="#" className=" py-2 font-nav font-medium hover:border-b-2 button-hover">Proyectos</a>
                  <a href="#" className="py-2 font-nav font-medium hover:border-b-2 button-hover">Contáctame</a>

                </div>
              </div>
              <div className="  md:ml-6 md:block ">
                <div className="flex  space x-2 md:space-x-4 text-white" >
                
                  <a href="#" className="px-1 py-2 button-hover"> <img className=" md:h-7 w-auto" src={Red1} alt="logo" /></a>
                  <a href="#" className=" px-1 py-2 button-hover"><img className="md:h-7 w-auto" src={Red2} alt="logo" /></a>
                  <a href="#" className=" px-1 py-2 button-hover"><img className="md:h-7 w-auto" src={Red3} alt="logo" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <div className={`md:hidden ${mobileMenuClasses}`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2  text-white">
            <a href="#" className=" block   py-2 text-base font-medium" aria-current="page">Dashboard</a>
            <a href="#" className="  block rounded-md  py-2 text-base font-medium">Team</a>
            <a href="#" className="  block rounded-md  py-2 text-base font-medium">Projects</a>
            <a href="#" className="  block rounded-md  py-2 text-base font-medium">Calendar</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;


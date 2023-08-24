import React, { useState, useEffect } from 'react';
import Logo from '../media/logo.svg';

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuClasses = isMobileMenuOpen ? 'block' : 'hidden';

  useEffect(() => {
    // Deshabilitar scroll cuando se abre el menú
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b-2 backdrop-blur-lg animate-fade-down animate-once animate-ease-linear">
        <div className="mx-auto max-w-8xl px-2  lg:px-36">
          <div className="flex h-16 items-center justify-between">
            <div className="absolute t-0 right-2 flex items-center lg:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMobileMenu}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center lg:items-stretch lg:justify-between">
              <div className="flex flex-shrink-0 items-end space-x-4 lg:mr-20">
                <a className="button-hover" href="/">
                  <img className="h-12 w-auto" src={Logo} alt="logo" />
                </a>
                <a href="/" className="py-2 font-nav font-medium button-hover lg:block">
                  Cristian Castro
                </a>
              </div>
              <div className="hidden lg:ml-6 lg:block">
                <div className="flex space-x-8 text-white">
                  <a href="#about" className="py-2 font-nav font-medium hover:border-b-2 button-hover">
                    Conoceme
                  </a>
                  <a href="#education" className="px-3 py-2 font-nav font-medium hover:border-b-2 button-hover">
                    Educación
                  </a>
                  <a href="#porfolio" className="py-2 font-nav font-medium hover:border-b-2 button-hover">
                    Proyectos
                  </a>
                  <a href="#contact" className="py-2 font-nav font-medium hover:border-b-2 button-hover">
                    Contáctame
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Capa de fondo desenfocado */}
      {isMobileMenuOpen && <div className="fixed inset-0 z-10 backdrop-blur-lg backdrop-filter " onClick={toggleMobileMenu} />}

      {/* Componente del menú desplegable */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden ${mobileMenuClasses} fixed top-16 right-0 w-full h-full bg-fondo z-20`}
        >
          <div className="flex flex-col items-center justify-between w-full">
            <a href="#" className="block py-16 text-2xl w-full text-center" aria-current="page">
              Dashboard
            </a>
            <a href="#" className="block  py-16 text-2xl w-full text-center">
              Team
            </a>
            <a href="#" className="block  py-16 text-2xl w-full text-center ">
              Projects
            </a>
            <a href="#" className="block py-16 text-2xl w-full text-center ">
              Calendar
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;



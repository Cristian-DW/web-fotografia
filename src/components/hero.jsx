import React from "react";
import Down from '../media/down.svg'







function Hero() {
  return (
    <div className=" fixed left-0 top-0  z-10 w-full flex  justify-center h-screen">
      <div className="container mx-auto flex flex-col items-center justify-center  ">
        <h1 className=" title mb-3  animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear  ">Desarrollador Frontend</h1>
        
        <button className="button w-48 hover:text-fondo2  animate-fade-down animate-once animate-delay-[1500ms] animate-ease-linear  ">
          <span class="relative z-10"><a href="#porfolio">Explora mis creaciones </a></span>
        </button>
        <a href="#about" className="absolute bottom-14  animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-[5000ms]  ">
          <p>Scroll</p>
          <img src={Down} alt="scroll"  className="w-10" />
          </a>
      </div>
    </div>
  );
}

export default Hero;



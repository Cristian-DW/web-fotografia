import React from "react";
import Title from "./extras/word";
import Down from '../media/down.svg'







function Hero() {
  return (
    <div className=" fixed left-0 top-0  z-10 w-full flex  justify-center h-screen">
      <div className="container mx-auto flex flex-col items-center justify-center  ">
        <h1 className=" title mb-3 ">Desarrollador Frontend</h1>
        <Title />
        <button className="button  hover:text-fondo2">
          <span class="relative z-10"><a href="#porfolio">Explora mis creaciones </a></span>
        </button>
        <a href="#about" className="absolute bottom-14  animate-bounce">
          <p>Scroll</p>
          <img src={Down} alt="scroll"  className="w-10" />
          </a>
      </div>
    </div>
  );
}

export default Hero;



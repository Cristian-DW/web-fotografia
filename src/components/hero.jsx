import React from "react";
import Title from "./extras/word";







function Hero() {
  return (
    <div className=" fixed left-0 top-0  z-10 w-full flex  justify-center h-screen animate-jump-in animate-once animate-duration-1000 animate-delay-500 animate-ease-in animate-normal animate-fill-forwards">
      <div className="container mx-auto flex flex-col items-center justify-center  ">
        <h1 className=" title mb-3 ">Desarrollador Frontend</h1>
        <Title />
        <button className="button">
          <span class="relative z-10">Explora mis creaciones</span>
        </button>
      </div>
    </div>
  );
}

export default Hero;



import React from "react";
import Title from "./extras/word";
import Animation from "./extras/animation";






function Hero() {
  return (
    <div className=" fixed left-0 top-0 z-10 w-full flex p-16  justify-center h-screen bg-fondo2 flex-row gap-y-2">
      <div className="container mx-auto flex flex-wrap items-center justify-center">
        <div className="w-full md:w-1/2 p-4 flex flex-col gap-y-7 ">
          <h1 className="title">Desarrollador Frontend</h1>
          <Title/>
          <p className="parrafo">
            Me apasiona crear experiencias que sean atractivas, accesibles y
            centradas en el usuario.
          </p>
          <a href="#about" className="button">
            Explora mis creaciones
          </a>
        </div>
        <div className="w-full md:w-1/2 p-4 hidden md:block">
         <Animation/>
        </div>
      </div>
    </div>
  );
}

export default Hero;



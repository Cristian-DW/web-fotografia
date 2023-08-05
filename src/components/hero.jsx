import React from "react";
import Title from "./extras/word";
import Animation from "./extras/animation";






function Hero() {
  return (
    <div className=" fixed left-0 top-0  z-10 w-full flex  justify-center h-screen bg-fondo2">
      <div className="container mx-auto flex flex-col items-center justify-center ">
          <h1 className="title mb-3 ">Desarrollador Frontend</h1>
          <Title/>
          <p className="parrafo mt-16">
            Me apasiona crear experiencias que sean atractivas, accesibles y
            centradas en el usuario.
          </p>
          <a href="#about" className="button">
            Explora mis creaciones
          </a>

      </div>
    </div>
  );
}

export default Hero;



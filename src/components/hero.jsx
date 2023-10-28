import React from "react";
import Photografer from "../media/hero-photografer.png"

function Hero() {
  return (
    <div className=" fixed left-0 top-0 bg-fondo   w-full  h-screen">
      <div className="container relative mx-auto z-10 flex flex-col items-center justify-start mt-20 ">
      <div className="absolute top-auto left-auto z-40">
      <img className="h-[80vh]" src={Photografer} alt="Photografer" />
      </div>
        <h1 className=" title mb-3  animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear  ">FRAME FUSION</h1>
      </div>
      <div className="text-2xl limited absolute z-50 max-w-7xl mt-10">
        <p>Descubre un mundo de creatividad visual con Frame Fusion. Captura momentos inolvidables, fusiona tu imaginación y da vida a tus fotos como nunca antes. Explora una experiencia única en la edición de imágenes y comparte tu visión con el mundo. Encuentra la belleza en cada fotograma y déjala fusionar en tus propias creaciones.</p>
      </div>
      
    </div>
  );
}

export default Hero;



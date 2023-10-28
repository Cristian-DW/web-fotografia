import React from "react";
import Photografer from "../media/hero-photografer.png"
import Facebook from "../media/icons/🦆 icon _facebook_.svg"
import Whatsapp from "../media/icons/🦆 icon _whatsapp_.svg"
import Youtube from "../media/icons/🦆 icon _youtube_.svg"
import Instagram from "../media/icons/icon_instagram.svg"



function Hero() {
  return (
    <div className=" fixed left-0 top-0 bg-fondo   w-full  h-screen">
      <div className="container relative mx-auto z-10 flex flex-col items-center justify-start mt-20 ">
        <div className="absolute top-auto left-auto z-40">
          <img className="h-[80vh]" src={Photografer} alt="Photografer" />
        </div>
        <h1 className=" title mb-3  animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear  ">
          FRAME FUSION
        </h1>
      </div>
      <div className="text-xl limited absolute z-50  mt-16 ">
        <div className="grid grid-cols-2 justify-between items-center ">
          <div className="max-w-7xl col-span-1">
            <p className="font-roboto">
              Descubre un mundo de creatividad visual con Frame Fusion. Captura
              momentos inolvidables, fusiona tu imaginación y da vida a tus
              fotos como nunca antes. Explora una experiencia única en la
              edición de imágenes y comparte tu visión con el mundo.{" "}
            </p>
          </div>
          <div className="col-span-1 ">
            <ul className="flex justify-end items-center gap-9">
              <li>
                <a href="#">
                  <img src={Instagram} alt="Intagram" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Facebook} alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Whatsapp} alt="whatsapp" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Youtube} alt="youtube" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;



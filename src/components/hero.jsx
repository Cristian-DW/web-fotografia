import React from "react";
import Photografer from "../media/hero-photographer.png";
import Facebook from "../media/icons/icon_facebook.svg";
import Whatsapp from "../media/icons/icon_whatsapp.svg";
import Youtube from "../media/icons/icon_youtube.svg";
import Instagram from "../media/icons/icon_instagram.svg";

/**
 * Hero Component
 * 
 * This component renders the hero section of the website, including a background image,
 * a title, a description, and social media icons. It is the first section visible on 
 * the homepage and provides an introduction to Frame Fusion.
 * 
 * @component
 * @example
 * return (
 *   <Hero />
 * )
 */
function Hero() {
  return (
    <div className="fixed left-0 top-0 bg-fondo w-screen h-screen">
      <div className="container relative mx-auto z-10 flex flex-col items-center justify-start mt-20">
        <div className="absolute top-auto left-auto z-40">
          {/* Photographer image */}
          <img className="h-[80vh]" src={Photografer} alt="Photographer" />
        </div>
        {/* Title */}
        <h1 className="title mb-3 text-9xl text-white animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear font-Audiowide">
          FRAME FUSION
        </h1>
      </div>
      <div className="text-xl limited absolute z-50 mt-16">
        <div className="grid grid-cols-2 justify-between items-center">
          <div className="max-w-7xl col-span-1">
            {/* Description */}
            <p className="font-roboto">
              Descubre un mundo de creatividad visual con Frame Fusion. Captura
              momentos inolvidables, fusiona tu imaginación y da vida a tus
              fotos como nunca antes. Explora una experiencia única en la
              edición de imágenes y comparte tu visión con el mundo.
            </p>
          </div>
          <div className="col-span-1">
            {/* Social media icons */}
            <ul className="flex justify-end items-center gap-9">
              <li>
                <a href="#">
                  <img src={Instagram} alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Facebook} alt="Facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Whatsapp} alt="Whatsapp" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Youtube} alt="Youtube" />
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